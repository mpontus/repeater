export interface IVoiceDetector {
  write(data: Float32Array): void;

  isHearingVoice(): boolean;
}

export class AverageAmplitudeVoiceDetector implements IVoiceDetector {
  private readonly sampleCount: number;
  private threshold: number;

  private avg: number = 0;

  constructor(threshold: number, sampleCount: number) {
    this.sampleCount = sampleCount;
    this.threshold = threshold;
  }

  write(data: Float32Array) {
    const sum = data.map(Math.abs).reduce((a, b) => a + b);

    this.avg *= 1 - data.length / this.sampleCount;
    this.avg += sum / this.sampleCount;

    const maxAbs = data.map(Math.abs).reduce(Math.abs);

    console.log(
      [this.avg, this.threshold]
        .map<any>(v => v.toFixed(5))
        .concat(this.avg > this.threshold)
        .concat(maxAbs.toFixed(5))
    );
  }

  isHearingVoice() {
    return this.avg > this.threshold;
  }

  setThreshold(value: number) {
    this.threshold = value;
  }
}

export default AverageAmplitudeVoiceDetector;
