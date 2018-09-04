import RoundRobin from "./RoundRobin";
import VoiceDetector from "./VoiceDetector";

const AMPLITUDE_THRESHOLD = 0.02;
const SAMPLE_RATE = 44100;
const MAX_DURATION = 60;
const SILENCE_DURATION = 0.5;

const ctx: Worker = self as any;
const buffer = new RoundRobin(MAX_DURATION * SAMPLE_RATE);
const voiceDetector = new VoiceDetector(
  AMPLITUDE_THRESHOLD,
  SILENCE_DURATION * SAMPLE_RATE
);

let recording = false;
let recordingSize = 0;

ctx.onmessage = e => {
  const pcm: Float32Array = e.data;

  voiceDetector.write(pcm);
  buffer.write(pcm);

  const isHearingVoice = voiceDetector.isHearingVoice();

  if (!recording && isHearingVoice) {
    recording = true;
    recordingSize = 0;

    ctx.postMessage({ type: "voice_start" });
  } else if (recording) {
    recordingSize += pcm.length;
  }

  if (recording && !isHearingVoice) {
    const audio = buffer.readLast(
      recordingSize + SILENCE_DURATION * SAMPLE_RATE
    );

    ctx.postMessage({
      type: "voice_end",
      payload: audio
    });

    recording = false;
  }
};
