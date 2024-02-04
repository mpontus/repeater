import { Driver } from "@cycle/run";
import xs, { Stream } from "xstream";

export type AudioSink = Stream<
  | { type: "set_volume"; data: number }
  | { type: "start_recording" }
  | { type: "stop_recording" }
  | { type: "start_playing"; data: Float32Array }
  | { type: "stop_playing" }
>;

export interface AudioSource {
  sampleRate: Stream<number>;
  samples: Stream<Float32Array>;
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

  set_volume(value: number): void {
    this.volumeControlNode.gain.value = value;
  }
}

export const makeAudioDriver =
  (createAudioContext: () => AudioContext): Driver<AudioSink, AudioSource> =>
  (source$) => {
    const audioCtx$ = source$
      .filter((action) => action.type === "start_recording")
      .map(createAudioContext);
    const mediaSource$ = audioCtx$.map(
      (audioCtx) => new CancelableMediaSource(audioCtx)
    );
    const playbackSource$ = audioCtx$.map(
      (audioCtx) => new PlaybackSource(audioCtx)
    );

    xs.combine(source$, mediaSource$, playbackSource$).subscribe({
      next([action, mediaSource, playbackSource]) {
        switch (action.type) {
          case "set_volume":
            playbackSource.set_volume(action.data);
            break;
          case "start_recording":
            mediaSource.start();
            break;
          case "stop_recording":
            mediaSource.stop();
            break;
          case "start_playing":
            playbackSource.start(action.data);
            break;
          case "stop_playing":
            playbackSource.stop();
            break;
        }
      },
    });

    return {
      sampleRate: audioCtx$.map((audioCtx) => audioCtx.sampleRate),
      samples: mediaSource$.map((mediaSource) => mediaSource.samples).flatten(),
    };
  };
