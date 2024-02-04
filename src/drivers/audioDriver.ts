import { Driver } from "@cycle/run";
import xs, { Stream } from "xstream";

export interface AudioSink {
  setVolume: Stream<number>;
  startRecording: Stream<void>;
  stopRecording: Stream<void>;
  startPlaying: Stream<Float32Array>;
  stopPlaying: Stream<void>;
}

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

  setVolume(value: number): void {
    this.volumeControlNode.gain.value = value;
  }
}

export const makeAudioDriver =
  (createAudioContext: () => AudioContext): Driver<AudioSink, AudioSource> =>
  (sources) => {
    const audioCtx$ = sources.startPlaying.map(createAudioContext);
    const mediaSource$ = audioCtx$.map(
      (audioCtx) => new CancelableMediaSource(audioCtx)
    );
    const playbackSource$ = audioCtx$.map(
      (audioCtx) => new PlaybackSource(audioCtx)
    );

    xs.combine(sources.setVolume, playbackSource$).subscribe({
      next([volume, playbackSource]) {
        playbackSource.setVolume(volume);
      },
    });

    xs.combine(sources.startRecording, mediaSource$).subscribe({
      next([_, mediaSource]) {
        mediaSource.start();
      },
    });

    xs.combine(sources.stopRecording, mediaSource$, playbackSource$).subscribe({
      next([_, mediaSource, playbackSource]) {
        mediaSource.stop();
        playbackSource.stop();
      },
    });

    xs.combine(sources.startPlaying, playbackSource$).subscribe({
      next([buffer, playbackSource]) {
        playbackSource.start(buffer);
      },
    });

    xs.combine(sources.stopPlaying, playbackSource$).subscribe({
      next([_, playbackSource]) {
        playbackSource.stop();
      },
    });

    return {
      sampleRate: audioCtx$.map((audioCtx) => audioCtx.sampleRate),
      samples: mediaSource$.map((mediaSource) => mediaSource.samples).flatten(),
    };
  };
