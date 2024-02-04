import { IAverageAmplitude } from "./AverageAmplitude";

export interface IVoiceDetector {
  isHearingVoice(): boolean;
}

export class VoiceDetector implements IVoiceDetector {
  private readonly averageAmplitude: IAverageAmplitude;
  private threshold: number;

  constructor(averageAmplitude: IAverageAmplitude, threshold: number) {
    this.averageAmplitude = averageAmplitude;
    this.threshold = threshold;
  }

  isHearingVoice() {
    return this.averageAmplitude.getAverageAmplitude() > this.threshold;
  }

  setThreshold(value: number) {
    this.threshold = value;
  }
}

export default VoiceDetector;
