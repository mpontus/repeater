import { Driver } from "@cycle/run";
import xs, { Stream } from "xstream";

export const makeWorkerDriver = <I, O>(
  worker: Worker
): Driver<Stream<I>, Stream<O>> => input$ => {
  input$.addListener({
    next: e => worker.postMessage(e)
  });

  return xs.create({
    start: listener => {
      worker.onmessage = e => {
        listener.next(e.data);
      };
    },
    stop: () => {
      worker.onmessage = null;
    }
  });
};
