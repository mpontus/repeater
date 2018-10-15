import { run } from "@cycle/run";
import {
  div,
  svg,
  input,
  label,
  makeDOMDriver,
  VNode,
  DOMSource
} from "@cycle/dom";
import * as Snabbdom from "snabbdom-pragma";
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
      label: (
        <svg viewBox="0 0 24 24">
          <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      ),
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
    .map(([volumeSliderDOM, thresholdSliderDOM, toggleButtonDOM]) => (
      <main>
        <header>
          <h1>Repeater</h1>
        </header>
        <section className="volume-slider">{volumeSliderDOM}</section>
        <section className="threshold-slider">{thresholdSliderDOM}</section>
        <section className="toggle-button">{toggleButtonDOM}</section>
        <footer>
          <a href="https://github.com/mpontus/repeater">
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
            <span>Fork me on GitHub</span>
          </a>
        </footer>
      </main>
    ));

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
