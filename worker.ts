const ctx: Worker = self as any;

const THRESHOLD = 0.1;

ctx.onmessage = e => {
  const pcm: Float32Array = e.data;

  const sum = pcm.map(Math.abs).reduce((acc, val) => acc + val, 0);

  ctx.postMessage(sum / pcm.length);
};
