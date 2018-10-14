import { run } from "@cycle/run";
import { div, input, label, makeDOMDriver, VNode, DOMSource } from "@cycle/dom";
import xs, { Stream } from "xstream";
import { makeWorkerDriver } from "./drivers/worker";
import { makeAudioDriver, AudioSource, AudioSink } from "./drivers/audio";
import { InputWorkerEvent, OutputWorkerEvent } from "./worker";
import { is, ofType } from "./utils";

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

const main = (sources: Sources): Sinks => {
  const volumeChange$ = sources.DOM.select(".volume")
    .events("input")
    .map((e: any) => e.target.value)
    .map(v => v / 100);
  const thresholdChange$ = sources.DOM.select(".threshold")
    .events("input")
    .map((e: any) => e.target.value)
    .map(v => v / 100);
  const startedChange$ = sources.DOM.select(".started")
    .events("input")
    .map((e: any) => e.target.checked);

  const silenceDuration$ = xs.of(0.5);
  const contextDuration$ = xs.of(0.5);
  const volume$ = volumeChange$.startWith(0.4);
  const threshold$ = thresholdChange$.startWith(0.02);
  const started$ = startedChange$.startWith(true);
  const state$ = xs
    .combine(volume$, threshold$, started$)
    .map(([volume, threshold, started]) => ({
      volume,
      threshold,
      started
    }));

  return {
    DOM: state$.map(state =>
      div([
        div([
          `Volume: ${state.volume}, Threshold: ${state.threshold.toFixed(
            5
          )}, Started: ${state.started ? "true" : "false"}`
        ]),

        div([
          label(["Feedback Volume"]),
          input(".volume", {
            attrs: {
              type: "range",
              min: 0,
              max: 100,
              value: Math.floor(state.volume * 100)
            }
          })
        ]),
        div([
          label(["Amplitude Threshold"]),
          input(".threshold", {
            attrs: {
              type: "range",
              min: 0,
              max: 100,
              value: Math.floor(state.threshold * 100)
            }
          })
        ]),
        div([
          input(".started", {
            attrs: {
              type: "checkbox",
              id: "started",
              checked: state.started
            }
          }),
          label(
            {
              attrs: { for: "started" }
            },
            ["Recording"]
          )
        ])
      ])
    ),
    audio: xs.merge(
      started$.filter(is(true)).mapTo({ key: "start_recording" }),
      startedChange$.filter(is(false)).mapTo({ key: "stop_recording" }),
      volume$.map(value => ({ key: "set_volume", data: value })),
      sources.worker
        .filter(ofType("voice_start"))
        .mapTo({ key: "stop_playing" }),
      sources.worker.filter(ofType("voice_end")).map(e => ({
        key: "start_playing",
        data: e.data
      }))
    ) as AudioSink,
    worker: xs.merge(
      started$
        .filter(is(true))
        .map(() =>
          xs
            .combine(threshold$, silenceDuration$, contextDuration$)
            .take(1)
            .map(([amplitudeThreshold, silenceDuration, contextDuration]) => ({
              key: "start",
              data: {
                sampleRate: sources.audio.sampleRate,
                amplitudeThreshold,
                silenceDuration,
                contextDuration
              }
            }))
        )
        .flatten(),
      startedChange$.filter(is(false)).mapTo({ key: "stop" }),
      thresholdChange$.map(amplitudeThreshold => ({
        key: "update_settings",
        data: {
          amplitudeThreshold
        }
      })),
      sources.audio.samples.map(data => ({ key: "process", data }))
    ) as Stream<InputWorkerEvent>
  };
};

run(main, {
  DOM: makeDOMDriver("#main"),
  audio: makeAudioDriver(new AudioContext()),
  worker: makeWorkerDriver<InputWorkerEvent, OutputWorkerEvent>(
    new Worker("./worker.ts")
  )
});
