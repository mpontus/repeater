import { run } from "@cycle/run";
import { div, input, label, makeDOMDriver, VNode, DOMSource } from "@cycle/dom";
import xs, { Stream } from "xstream";
import { makeWorkerDriver } from "./drivers/worker";
import { makeAudioDriver, AudioSource, AudioSink } from "./drivers/audio";
import { InputWorkerEvent, OutputWorkerEvent } from "./worker";
import { is, ofType } from "./utils";
import { LabeledSlider } from "./components/LabeledSlider";
import { ToggleButton } from "./components/ToggleButton";

export type Sources = {
  DOM: DOMSource;
  audio: AudioSource;
  worker: Stream<OutputWorkerEvent>;
};

export type Sinks = {
  DOM: Stream<VNode>;
  audio: AudioSink;
  worker: Stream<InputWorkerEvent>;
};

/**
 * Adjust threshold value to fit real scale.
 *
 * Exponentiation makes the slider feel more natural.
 */
const exponentiateThreshold = (v: number) => v ** 2 * 0.2;

const main = (sources: Sources): Sinks => {
  const volumeSliderProps$ = xs.of({
    label: "Feedback Volume",
    min: 0,
    max: 100,
    initial: 50
  });
  const thresholdSliderProps$ = xs.of({
    label: "Amplitude Threshold",
    min: 0,
    max: 100,
    initial: 15
  });
  const toggleButtonProps = xs.of({
    label: "Recording",
    initial: true
  });

  const volumeSlider = LabeledSlider({
    DOM: sources.DOM,
    props$: volumeSliderProps$
  });
  const thresholdSlider = LabeledSlider({
    DOM: sources.DOM,
    props$: thresholdSliderProps$
  });
  const toggleButton = ToggleButton({
    DOM: sources.DOM,
    props$: toggleButtonProps
  });

  const volume$ = volumeSlider.value;
  const threshold$ = thresholdSlider.value;
  const started$ = toggleButton.checked;

  // We also need explicit changes (i.e. exlude default values) to
  // invoke driver actions explicitly.
  const thresholdChange$ = thresholdSlider.changes;
  const startedChange$ = toggleButton.changes;

  const vdom$ = xs
    .combine(volumeSlider.DOM, thresholdSlider.DOM, toggleButton.DOM)
    .map(([volumeSliderDOM, thresholdSliderDOM, toggleButtonDOM]) =>
      div([volumeSliderDOM, thresholdSliderDOM, toggleButtonDOM])
    );

  const audioSink$ = xs.merge(
    started$.filter(is(true)).mapTo({ key: "start_recording" }),
    startedChange$.filter(is(false)).mapTo({ key: "stop_recording" }),
    volume$.map(value => ({ key: "set_volume", data: value / 100 })),
    sources.worker.filter(ofType("voice_start")).mapTo({ key: "stop_playing" }),
    sources.worker.filter(ofType("voice_end")).map(e => ({
      key: "start_playing",
      data: e.data
    }))
  ) as AudioSink;

  const workerSink$: Stream<InputWorkerEvent> = xs.merge(
    started$
      .filter(is(true))
      // Nested stream is necessary in order to pass threshold with
      // "start", and not emit "start" on every threshold change
      .map(() =>
        threshold$.take(1).map<InputWorkerEvent>(threshold => ({
          key: "start",
          data: {
            sampleRate: sources.audio.sampleRate,
            amplitudeThreshold: exponentiateThreshold(threshold / 100),
            silenceDuration: 0.5,
            contextDuration: 0.5
          }
        }))
      )
      .flatten(),

    startedChange$.filter(is(false)).mapTo<InputWorkerEvent>({ key: "stop" }),
    thresholdChange$.map<InputWorkerEvent>(threshold => ({
      key: "update_settings",
      data: {
        amplitudeThreshold: exponentiateThreshold(threshold / 100)
      }
    })),
    sources.audio.samples.map<InputWorkerEvent>(data => ({
      key: "process",
      data
    }))
  );

  return {
    DOM: vdom$,
    audio: audioSink$,
    worker: workerSink$
  };
};

run(main, {
  DOM: makeDOMDriver("#main"),
  audio: makeAudioDriver(new AudioContext()),
  worker: makeWorkerDriver<InputWorkerEvent, OutputWorkerEvent>(
    new Worker("./worker.ts")
  )
});
