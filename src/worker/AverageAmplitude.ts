export interface IAverageAmplitude {
  getAverageAmplitude(): number;

  write(data: Float32Array): void;
}

export class AverageAmplitude implements IAverageAmplitude {
  private readonly sampleCount: number;

  private avg: number = 0;

  constructor(sampleCount: number) {
    this.sampleCount = sampleCount;
  }

  write(data: Float32Array) {
    const sum = data.map(Math.abs).reduce((a, b) => a + b);

    this.avg *= 1 - data.length / this.sampleCount;
    this.avg += sum / this.sampleCount;
  }

  getAverageAmplitude() {
    return this.avg;
  }
}
