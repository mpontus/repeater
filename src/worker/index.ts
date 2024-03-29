import xs, { Stream } from "xstream";
import dropRepeats from "xstream/extra/dropRepeats";
import CircularBuffer from "./CircularBuffer";
import VoiceDetector from "./VoiceDetector";
import { ofType, is, isDefined } from "../utils";
import { AverageAmplitude } from "./AverageAmplitude";

/**
 * Size of the buffer allocated for storage of the recorded speech
 *
 * 2646000 is enough to fit 1 minute of audio at 44100 sample rate.
 */
export const BUFFER_SIZE = 2646000;

/**
 * Values necessary for the worker to function
 */
export interface Settings {
  /**
   * Sample rate of the recorded stream as the number of samples per second
   */
  sampleRate: number;

  /**
   * Duration in seconds for which the average amplitude is being collected
   */
  silenceDuration: number;

  /**
   * Amplitude threshold which separates speech from silence specified
   * as a floating point number number between 0 and 1
   */
  amplitudeThreshold: number;

  /**
   * Duration of the audio caputred before the beginning of speech
   */
  contextDuration: number;
}

/**
 * Input messages sent to the worker
 */
type Action =
  | {
      key: "start";
      data: Settings;
    }
  | {
      key: "process";
      data: Float32Array;
    }
  | {
      key: "update_settings";
      data: Partial<Settings>;
    }
  | {
      key: "stop";
    };

/**
 * Outgoing messages dispatched by the worker
 */
type Event =
  | {
      key: "average_amplitude";
      data: number;
    }
  | {
      key: "voice_start";
    }
  | {
      key: "voice_end";
      data: Float32Array;
    };

/**
 * Create a stream which emits average sound amplitude
 */
const createAverageAmplitudeStream = (
  action$: Stream<Action>,
  sampleRate: number,
  silenceDuration: number
): Stream<number> => {
  const averageAmplitude = new AverageAmplitude(silenceDuration * sampleRate);

  action$.filter(ofType("process")).subscribe({
    next: (action) => averageAmplitude.write(action.data),
  });

  return action$
    .filter(ofType("process"))
    .map(() => averageAmplitude.getAverageAmplitude());
};

/**
 * Create a stream which emits a boolean indicating whether the amplitude exceeds threshold
 */
const createVoiceDetectorStream = (
  action$: Stream<Action>,
  averageAmplitude$: Stream<number>,
  amplitudeThreshold: number
): Stream<boolean> => {
  return action$
    .filter(ofType("update_settings"))
    .map((action) => action.data.amplitudeThreshold)
    .filter(isDefined)
    .debug()
    .startWith(amplitudeThreshold)
    .map((amplitudeThreshold) => {
      return averageAmplitude$
        .map((amplitude) => amplitude > amplitudeThreshold)
        .compose(dropRepeats());
    })
    .flatten();
};

/**
 * Create a stream which
 */
const createSpeechCaptureStream = (
  action$: Stream<Action>,
  sampleRate: number,
  contextDuration: number,
  isHearingVoice$: Stream<boolean>
): Stream<Float32Array> => {
  const buffer = new CircularBuffer(BUFFER_SIZE);

  action$.filter(ofType("process")).subscribe({
    next: (action) => buffer.write(action.data),
  });

  return isHearingVoice$
    .filter(is(true))
    .map(() => {
      let recordingLength = contextDuration * sampleRate;

      action$.filter(ofType("process")).subscribe({
        next: (action) => {
          recordingLength += action.data.length;
        },
      });

      return isHearingVoice$
        .filter(is(false))
        .map(() => buffer.readLast(recordingLength))
        .take(1);
    })
    .flatten();
};

/**
 * This function handles outside commands, analyzing the audio and
 * producing a stream of events to drive the UI..
 */
const createStreamProcessor = (action$: Stream<Action>): Stream<Event> => {
  return action$
    .filter(ofType("start"))
    .map((action) => {
      const {
        sampleRate,
        silenceDuration,
        amplitudeThreshold,
        contextDuration,
      } = action.data;
      const averageAmplitude$ = createAverageAmplitudeStream(
        action$,
        sampleRate,
        silenceDuration
      );
      const isHearingVoice$ = createVoiceDetectorStream(
        action$,
        averageAmplitude$,
        amplitudeThreshold
      );
      const capturedSentence$ = createSpeechCaptureStream(
        action$,
        sampleRate,
        contextDuration,
        isHearingVoice$
      );

      return xs
        .merge(
          averageAmplitude$.map<Event>((data) => ({
            key: "average_amplitude",
            data,
          })),
          isHearingVoice$.filter(is(true)).mapTo<Event>({ key: "voice_start" }),
          capturedSentence$.map<Event>((data) => ({ key: "voice_end", data }))
        )
        .endWhen(action$.filter(ofType("stop")));
    })
    .flatten();
};

const ctx: Worker = self as any;

const action$ = xs.create<Action>({
  start: (listener) => {
    ctx.onmessage = (e) => listener.next(e.data);
  },
  stop: () => {
    ctx.onmessage = null;
  },
});

createStreamProcessor(action$).subscribe({
  next: ctx.postMessage.bind(ctx),
  error: console.error,
});

export type InputWorkerEvent = Action;
export type OutputWorkerEvent = Event;
