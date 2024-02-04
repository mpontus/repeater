import { DOMSource } from "@cycle/dom/src/rxjs";
import { VNode, makeDOMDriver } from "@cycle/dom";
import { run } from "@cycle/rxjs-run";
import storageDriver, {
  ResponseCollection,
  StorageRequest,
} from "@cycle/storage";
import { Observable, combineLatest, pipe, merge, from } from "rxjs";
import {
  map,
  skip,
  filter,
  take,
  mergeMap,
  startWith,
  mapTo,
} from "rxjs/operators";
import { Main } from "./components/Main";
import { AudioSink, AudioSource, makeAudioDriver } from "./drivers/audioDriver";
import { makeWorkerDriver } from "./drivers/workerDriver";
import { is, ofType, toObservable } from "./utils";
import { InputWorkerEvent, OutputWorkerEvent } from "./worker";

export type Sources = {
  DOM: DOMSource;
  storage: ResponseCollection;
  audio: AudioSource;
  worker: Observable<OutputWorkerEvent>;
};

export type Sinks = {
  DOM: Observable<VNode>;
  storage: Observable<StorageRequest>;
  audio: AudioSink;
  worker: Observable<InputWorkerEvent>;
};

const exponentiateThreshold = (v: number) => v ** 2 * 0.2;

const main = (sources: Sources): Sinks => {
  const initialVolume$ = toObservable(
    sources.storage.local.getItem<string>("volume")
  ).pipe(
    take(1),
    map((value) => (value ? parseInt(value, 10) : 50))
  );
  const initialThreshold$ = toObservable(
    sources.storage.local.getItem<string>("threshold")
  ).pipe(
    take(1),
    map((value) => (value ? parseInt(value, 10) : 15))
  );
  const main = Main({
    DOM: sources.DOM,
    props: combineLatest([initialVolume$, initialThreshold$]).pipe(
      map(([initialVolume, initialThreshold]) => ({
        initialThreshold,
        initialVolume,
      }))
    ),
  });

  const volume$ = main.volume;
  const threshold$ = main.threshold;
  const started$ = main.started;

  const thresholdChange$ = threshold$.pipe(skip(1));
  const startedChange$ = started$.pipe(skip(1));
  const vdom$ = main.DOM;
  const audioSink: AudioSink = merge(
    started$.pipe(filter(is(true)), mapTo({ type: "start_recording" })),
    startedChange$.pipe(filter(is(false)), mapTo({ type: "stop_recording" })),
    volume$.pipe(map((value) => ({ type: "set_volume", data: value / 100 }))),
    sources.worker.pipe(
      filter(ofType("voice_end")),
      map((e) => ({ type: "start_playing", data: e.data }))
    ),
    sources.worker.pipe(
      filter(ofType("voice_start")),
      mapTo({ type: "stop_playing" })
    )
  );

  const workerSink: Observable<InputWorkerEvent> = merge(
    started$.pipe(
      filter(is(true)),
      mergeMap(() =>
        combineLatest([sources.audio.sampleRate, threshold$]).pipe(
          take(1),
          map<InputWorkerEvent>(([sampleRate, threshold]) => ({
            key: "start",
            data: {
              sampleRate,
              amplitudeThreshold: exponentiateThreshold(threshold / 100),
              silenceDuration: 0.5,
              contextDuration: 0.5,
            },
          }))
        )
      )
    ),
    startedChange$.pipe(
      filter(is(false)),
      mapTo<InputWorkerEvent>({ key: "stop" })
    ),
    thresholdChange$.pipe(
      map<InputWorkerEvent>((threshold) => ({
        key: "update_settings",
        data: {
          amplitudeThreshold: exponentiateThreshold(threshold / 100),
        },
      }))
    ),
    sources.audio.samples.pipe(
      map<InputWorkerEvent>((data) => ({
        key: "process",
        data,
      }))
    )
  );

  const storageSink = merge(
    volume$.pipe(
      map((value) => ({
        key: "volume",
        value,
      }))
    ),
    threshold$.pipe(
      map((value) => ({
        key: "threshold",
        value,
      }))
    )
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
