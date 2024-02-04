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

export class CancelableMediaSource {
  private readonly analyserNode: AnalyserNode;
  private readonly scriptProcessorNode: ScriptProcessorNode;
  private readonly muteNode: GainNode;
  private mediaStreamPromise: Promise<MediaStream>;
  private canceled: boolean = false;

  public readonly samples: Stream<Float32Array>;

  get analyser(): AnalyserNode {
    return this.analyserNode;
  }

  constructor(private readonly audioCtx: AudioContext) {
    this.analyserNode = audioCtx.createAnalyser();
    this.scriptProcessorNode = audioCtx.createScriptProcessor(4096, 1, 1);
    this.muteNode = audioCtx.createGain();

    this.analyserNode.connect(this.scriptProcessorNode);
    this.scriptProcessorNode.connect(this.muteNode);
    this.muteNode.connect(audioCtx.destination);
    this.muteNode.gain.value = 0;

    this.samples = xs.create({
      start: (listener) => {
        this.scriptProcessorNode.onaudioprocess = (e: AudioProcessingEvent) => {
          const { inputBuffer } = e;
          const data = inputBuffer.getChannelData(0);

          listener.next(data);
        };
      },
      stop: () => {
        this.scriptProcessorNode.onaudioprocess = () => {};
      },
    });
  }

  start(): void {
    this.mediaStreamPromise = navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    this.mediaStreamPromise.then((stream) => {
      if (!this.canceled) {
        const source = this.audioCtx.createMediaStreamSource(stream);

        source.connect(this.analyserNode);
      }
    });
  }

  stop(): void {
    if (this.canceled) {
      return;
    }

    this.canceled = true;
    this.mediaStreamPromise.then((stream) =>
      stream.getTracks().forEach((track) => track.stop())
    );
  }
}

export class PlaybackSource {
  private readonly analyserNode: AnalyserNode;
  private readonly volumeControlNode: GainNode;
  private bufferSource: AudioBufferSourceNode | null = null;

  get analyser(): AnalyserNode {
    return this.analyserNode;
  }

  constructor(private readonly audioCtx: AudioContext) {
    this.analyserNode = audioCtx.createAnalyser();
    this.volumeControlNode = audioCtx.createGain();

    this.analyserNode.connect(this.volumeControlNode);
    this.volumeControlNode.connect(audioCtx.destination);
  }

  start(buffer: Float32Array): void {
    const audioBuffer = this.audioCtx.createBuffer(
      1,
      buffer.length,
      this.audioCtx.sampleRate
    );
    audioBuffer.copyToChannel(buffer, 0, 0);

    this.bufferSource = this.audioCtx.createBufferSource();
    this.bufferSource.buffer = audioBuffer;
    this.bufferSource.connect(this.analyserNode);
    this.bufferSource.start();
  }

  stop(): void {
    if (this.bufferSource != null) {
      this.bufferSource.stop();
    }
  }

  setVolume(value: number): void {
    this.volumeControlNode.gain.value = value;
  }
}

export const makeAudioDriver =
  (createAudioContext: () => AudioContext): Driver<AudioSink, AudioSource> =>
  (action$) => {
    const audioCtx$ = action$
      .filter(ofType("start_recording"))
      .map(createAudioContext);
    const mediaSource$ = audioCtx$.map(
      (audioCtx) => new CancelableMediaSource(audioCtx)
    );
    const playbackSource$ = audioCtx$.map(
      (audioCtx) => new PlaybackSource(audioCtx)
    );
    const source$ = xs.combine(mediaSource$, playbackSource$);

    const volume$ = action$
      .filter(ofType("set_volume"))
      .map((action) => action.data);

    xs.combine(playbackSource$, volume$).subscribe({
      next: ([playbackSource, volume]) => {
        playbackSource.setVolume(volume);
      },
    });

    xs.combine(action$, source$)
      .debug()
      .subscribe({
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
        error: console.error,
      });

    return {
      sampleRate: audioCtx$.map((audioCtx) => audioCtx.sampleRate),
      samples: mediaSource$.map((mediaSource) => mediaSource.samples).flatten(),
      sourceAnalyser: mediaSource$.map((mediaSource) => mediaSource.analyser),
      outputAnalyser: playbackSource$.map(
        (playbackSource) => playbackSource.analyser
      ),
    };
  };
