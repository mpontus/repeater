const ctx: Worker = self as any;

// Include 1 second of audio around the point of the beginning of the speech
const EASING_DURATION = 1;

interface IVoiceDetector {
  write(data: Float32Array): void;

  isHearingVoice(): boolean;
}

class AverageAmplitudeVoiceDetector implements IVoiceDetector {
  private readonly sampleCount: number;
  private readonly threshold: number;

  private avg: number = 0;

  constructor(threshold: number, sampleCount: number) {
    this.sampleCount = sampleCount;
    this.threshold = threshold;
  }

  write(data: Float32Array) {
    const sum = data.map(Math.abs).reduce((a, b) => a + b);

    this.avg *= 1 - data.length / this.sampleCount;
    this.avg += sum / this.sampleCount;
  }

  isHearingVoice() {
    console.log(this.avg);

    return this.avg > this.threshold;
  }
}

const buffer = new Float32Array(60 * 44100);
const voiceDetector = new AverageAmplitudeVoiceDetector(0.02, 0.5 * 44100);
let offset = 0;
let recording = false;

ctx.onmessage = e => {
  const pcm: Float32Array = e.data; // 4096

  voiceDetector.write(pcm);

  const isHearingVoice = voiceDetector.isHearingVoice();

  if (!recording && isHearingVoice) {
    recording = true;
    buffer.fill(0);

    ctx.postMessage({ type: "voice_start" });
  }

  if (recording) {
    if (offset + pcm.length > buffer.length) {
      return;
    }

    buffer.set(pcm, offset);
    offset += pcm.length;
  }

  if (recording && !isHearingVoice) {
    recording = false;
    ctx.postMessage({ type: "voice_end", payload: buffer });
    offset = 0;
  }
};
