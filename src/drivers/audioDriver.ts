import { Driver } from "@cycle/run";
import xs, { Stream } from "xstream";
import { ofType } from "../utils";

export type AudioSink = Stream<
  | {
      key: "start_recording";
    }
  | {
      key: "stop_recording";
    }
  | {
      key: "set_volume";
      data: number;
    }
  | {
      key: "start_playing";
      data: Float32Array;
    }
  | {
      key: "stop_playing";
    }
>;

export interface AudioSource {
  sampleRate: Stream<number>;
  samples: Stream<Float32Array>;
  sourceAnalyser: Stream<AnalyserNode>;
  outputAnalyser: Stream<AnalyserNode>;
}

interface UserMediaSource {
  start(): void;
  stop(): void;
  samples: Stream<Float32Array>;
  analyser: AnalyserNode;
}

interface PlaybackSource {
  start(samples: Float32Array): void;
  stop(): void;
  setVolume(value: number): void;
  analyser: AnalyserNode;
}

const createCancellableMediaStream = (
  cb: (stream: MediaStream) => void
): Function => {
  const mediaStreamPromise = navigator.mediaDevices.getUserMedia({
    audio: true
  });
  let cancelled = false;

  mediaStreamPromise.then(stream => {
    if (!cancelled) {
      cb(stream);
    }
  });

  return () => {
    cancelled = true;

    mediaStreamPromise.then(stream =>
      stream.getTracks().forEach(track => track.stop())
    );
  };
};

function createUserMediaSource(audioCtx: AudioContext): UserMediaSource {
  const analyserNode = audioCtx.createAnalyser();
  const scriptProcessorNode = audioCtx.createScriptProcessor(4096, 1, 1);
  const muteNode = audioCtx.createGain();
  let cancel: Function | null = null;

  analyserNode.connect(scriptProcessorNode);
  scriptProcessorNode.connect(muteNode);
  muteNode.connect(audioCtx.destination);
  muteNode.gain.value = 0;

  return {
    start: () => {
      cancel = createCancellableMediaStream(stream => {
        const source = audioCtx.createMediaStreamSource(stream);

        source.connect(analyserNode);
      });
    },
    stop: () => {
      if (cancel !== null) {
        cancel();
      }

      cancel = null;
    },
    samples: xs.create({
      start: listener => {
        scriptProcessorNode.onaudioprocess = (e: AudioProcessingEvent) => {
          const { inputBuffer } = e;
          const data = inputBuffer.getChannelData(0);

          listener.next(data);
        };
      },
      stop: () => {
        scriptProcessorNode.onaudioprocess = () => {};
      }
    }),
    analyser: analyserNode
  };
}

function createPlaybackSource(audioCtx: AudioContext): PlaybackSource {
  const analyserNode = audioCtx.createAnalyser();
  const volumeControlNode = audioCtx.createGain();
  let bufferSource: AudioBufferSourceNode | null = null;

  analyserNode.connect(volumeControlNode);
  volumeControlNode.connect(audioCtx.destination);

  return {
    start: (buffer: Float32Array) => {
      const audioBuffer = audioCtx.createBuffer(
        1,
        buffer.length,
        audioCtx.sampleRate
      );
      audioBuffer.copyToChannel(buffer, 0, 0);

      bufferSource = audioCtx.createBufferSource();
      bufferSource.buffer = audioBuffer;
      bufferSource.connect(analyserNode);
      bufferSource.start();
    },
    stop: () => {
      if (bufferSource != null) {
        bufferSource.stop();
      }
    },
    setVolume: (value: number) => {
      volumeControlNode.gain.value = value;
    },
    analyser: analyserNode
  };
}

export const makeAudioDriver = (
  createAudioContext: () => AudioContext
): Driver<AudioSink, AudioSource> => action$ => {
  const audioCtx$ = action$
    .filter(ofType("start_recording"))
    .map(createAudioContext);
  const mediaSource$ = audioCtx$.map(createUserMediaSource);
  const playbackSource$ = audioCtx$.map(createPlaybackSource);
  const source$ = xs.combine(mediaSource$, playbackSource$);

  const volume$ = action$
    .filter(ofType("set_volume"))
    .map(action => action.data);

  xs.combine(playbackSource$, volume$).subscribe({
    next: ([playbackSource, volume]) => {
      playbackSource.setVolume(volume);
    }
  });

  xs.combine(action$, source$).subscribe({
    next: ([action, [mediaSource, playbackSource]]) => {
      switch (action.key) {
        case "start_recording":
          mediaSource.start();
          break;

        case "stop_recording":
          mediaSource.stop();
          playbackSource.stop();
          break;

        case "start_playing":
          playbackSource.start(action.data);
          break;

        case "stop_playing":
          playbackSource.stop();
          break;
      }
    },
    error: console.error
  });

  return {
    sampleRate: audioCtx$.map(audioCtx => audioCtx.sampleRate),
    samples: mediaSource$.map(mediaSource => mediaSource.samples).flatten(),
    sourceAnalyser: mediaSource$.map(mediaSource => mediaSource.analyser),
    outputAnalyser: playbackSource$.map(
      playbackSource => playbackSource.analyser
    )
  };
};
