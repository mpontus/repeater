const ctx: Worker = self as any;

const THRESHOLD = 200;

const lengthInSeconds = 60;
const sampleRate = 44100;

const buffer = new Float32Array(lengthInSeconds * sampleRate); // 44100 * seconds
let offset = 0;
let recordingStarted = false;

const isHearingVoice = (samples: Float32Array) =>
  samples.reduce((a, b) => a + Math.abs(b), 0) > THRESHOLD;

ctx.onmessage = e => {
  const pcm: Float32Array = e.data; // 4096

  // const averageIntensity =
  //   pcm.map(Math.abs).reduce((acc, val) => acc + val, 0) / pcm.length;

  const loudEnough = isHearingVoice(pcm);

  if (!recordingStarted) {
    if (loudEnough) {
      recordingStarted = true;
    }
  }

  if (recordingStarted) {
    if (offset + pcm.length > buffer.length) {
      return;
    }

    buffer.set(pcm, offset);
    offset += pcm.length;
  }

  if (recordingStarted) {
    if (!loudEnough) {
      recordingStarted = false;
      ctx.postMessage(buffer);
      offset = 0;
    }
  }
};
