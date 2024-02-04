import { DOMSource, VNode, makeDOMDriver } from "@cycle/dom";
import { run } from "@cycle/run";
import storageDriver, {
  ResponseCollection,
  StorageRequest,
} from "@cycle/storage";
import xs, { Stream } from "xstream";
import { Main } from "./components/Main";
import { AudioSink, AudioSource, makeAudioDriver } from "./drivers/audioDriver";
import { makeWorkerDriver } from "./drivers/workerDriver";
import { is, isDefined, ofType } from "./utils";
import { InputWorkerEvent, OutputWorkerEvent } from "./worker";

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
const unexponentiateThreshold = (v: number) => Math.sqrt(v / 0.2);

const main = (sources: Sources): Sinks => {
  const initialVolume$ = sources.storage.local
    .getItem<string>("volume")
    .take(1)
    .map((value) => (value ? parseInt(value, 10) : 50));
  const initialThreshold = sources.storage.local
    .getItem<string>("threshold")
    .take(1)
    .map((value) => (value ? parseInt(value, 10) : 15));
  const loudness$ = sources.worker
    .filter(ofType("average_amplitude"))
    .map((e) => Math.floor(unexponentiateThreshold(e.data) * 100));
  const main = Main({
    DOM: sources.DOM,
    props: xs
      .combine(
        initialVolume$,
        initialThreshold,
        xs.merge(
          loudness$,
          // Dunno why, but this is necessary to start the stream
          xs.create({
            start(listener) {
              setTimeout(() => listener.next(0));
            },
            stop() {},
          })
        ) as Stream<number>
      )
      .map(([initialVolume, initialThreshold, loudness]) => ({
        initialThreshold,
        initialVolume,
        loudness,
      })),
  });

  const vdom$ = main.DOM;
  const volume$ = main.volume;
  const threshold$ = main.threshold;
  const started$ = main.started;

  // We also need explicit changes (i.e. exlude default values) to
  // invoke driver actions explicitly.
  const audioSink: AudioSink = xs.merge(
    started$.filter(is(true)).mapTo({ type: "start_recording" }),
    started$.drop(1).filter(is(false)).mapTo({ type: "stop_recording" }),
    volume$.map((value) => ({ type: "set_volume", data: value / 100 })),
    sources.worker
      .filter(ofType("voice_end"))
      .map((e) => ({ type: "start_playing", data: e.data })),
    sources.worker.filter(ofType("voice_start")).mapTo({ type: "stop_playing" })
  );

  const workerSink: Stream<InputWorkerEvent> = xs.merge(
    started$
      .filter(is(true))
      // Nested stream is necessary in order to pass threshold with
      // "start", and not emit "start" on every threshold change
      .map(() =>
        xs
          .combine(sources.audio.sampleRate, threshold$)
          .take(1)
          .map<InputWorkerEvent>(([sampleRate, threshold]) => ({
            key: "start",
            data: {
              sampleRate,
              amplitudeThreshold: exponentiateThreshold(threshold / 100),
              silenceDuration: 0.5,
              contextDuration: 0.5,
            },
          }))
      )
      .flatten(),

    started$.drop(1).filter(is(false)).mapTo<InputWorkerEvent>({ key: "stop" }),
    threshold$.drop(1).map<InputWorkerEvent>((threshold) => ({
      key: "update_settings",
      data: {
        amplitudeThreshold: exponentiateThreshold(threshold / 100),
      },
    })),
    sources.audio.samples.map<InputWorkerEvent>((data) => ({
      key: "process",
      data,
    }))
  );

  const storageSink = xs.merge(
    volume$.map((value) => ({
      key: "volume",
      value,
    })),
    threshold$.map((value) => ({
      key: "threshold",
      value,
    }))
  );

  return {
    DOM: vdom$,
    audio: audioSink,
    worker: workerSink,
    storage: storageSink,
  };
};

run(main, {
  DOM: makeDOMDriver("#root"),
  storage: storageDriver,
  audio: makeAudioDriver(() => new AudioContext()),
  worker: makeWorkerDriver<InputWorkerEvent, OutputWorkerEvent>(
    new Worker("./worker/index.ts")
  ),
});
