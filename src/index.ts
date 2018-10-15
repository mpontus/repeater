import { run } from "@cycle/run";
import { div, input, label, makeDOMDriver, VNode, DOMSource } from "@cycle/dom";
import storageDriver, {
  StorageRequest,
  ResponseCollection
} from "@cycle/storage";
import isolate, { Component } from "@cycle/isolate";
import xs, { Stream } from "xstream";
import { makeWorkerDriver } from "./drivers/worker";
import { makeAudioDriver, AudioSource, AudioSink } from "./drivers/audio";
import { InputWorkerEvent, OutputWorkerEvent } from "./worker";
import { is, ofType } from "./utils";
import { LabeledSlider } from "./components/LabeledSlider";
import { ToggleButton } from "./components/ToggleButton";

export type Sources = {
  DOM: DOMSource;
  storage: ResponseCollection;
  audio: AudioSource;
  worker: Stream<OutputWorkerEvent>;
};

export type Sinks = {
  DOM: Stream<VNode>;
  storage: Stream<StorageRequest>;
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
  const VolumeSlider = isolate(LabeledSlider) as typeof LabeledSlider;
  const ThresholdSlider = isolate(LabeledSlider) as typeof LabeledSlider;

  const volumeSliderProps$ = sources.storage.local
    .getItem<string>("volume")
    .take(1)
    .map(value => (value ? parseInt(value, 10) : 50))
    .map(value => ({
      label: "Feedback Volume",
      min: 0,
      max: 100,
      initial: value
    }));

  const thresholdSliderProps$ = sources.storage.local
    .getItem<string>("threshold")
    .take(1)
    .map(value => (value ? parseInt(value, 10) : 15))
    .map(value => ({
      label: "Amplitude Threshold",
      min: 0,
      max: 100,
      initial: value
    }));

  const toggleButtonProps$ = sources.storage.local
    .getItem<string>("started")
    .take(1)
    .map(value => value === "true")
    .map(value => ({
      label: "Recording",
      initial: value
    }));

  const volumeSlider = VolumeSlider({
    DOM: sources.DOM,
    props$: volumeSliderProps$
  });
  const thresholdSlider = ThresholdSlider({
    DOM: sources.DOM,
    props$: thresholdSliderProps$
  });
  const toggleButton = ToggleButton({
    DOM: sources.DOM,
    props$: toggleButtonProps$
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

  const audioSink = xs.merge(
    started$.filter(is(true)).mapTo({ key: "start_recording" }),
    startedChange$.filter(is(false)).mapTo({ key: "stop_recording" }),
    volume$.map(value => ({ key: "set_volume", data: value / 100 })),
    sources.worker.filter(ofType("voice_start")).mapTo({ key: "stop_playing" }),
    sources.worker.filter(ofType("voice_end")).map(e => ({
      key: "start_playing",
      data: e.data
    }))
  ) as AudioSink;

  const workerSink: Stream<InputWorkerEvent> = xs.merge(
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

  const storageSink = xs.merge(
    volume$.map(value => ({
      key: "volume",
      value
    })),
    threshold$.map(value => ({
      key: "threshold",
      value
    })),
    started$.map(value => ({
      key: "started",
      value
    }))
  );

  return {
    DOM: vdom$,
    audio: audioSink,
    worker: workerSink,
    storage: storageSink
  };
};

run(main, {
  DOM: makeDOMDriver("#main"),
  storage: storageDriver,
  audio: makeAudioDriver(new AudioContext()),
  worker: makeWorkerDriver<InputWorkerEvent, OutputWorkerEvent>(
    new Worker("./worker.ts")
  )
});
