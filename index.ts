const worker = new Worker("./worker.ts");

var audioCtx = new AudioContext();

worker.onmessage = e => {
  const audioBuffer = audioCtx.createBuffer(
    1,
    e.data.length,
    audioCtx.sampleRate
  );

  audioBuffer.copyToChannel(e.data, 0, 0);

  const bufferSource = audioCtx.createBufferSource();
  bufferSource.buffer = audioBuffer;
  bufferSource.connect(audioCtx.destination);
  bufferSource.start();
};

navigator.mediaDevices
  .getUserMedia({
    // TODO: specify number of channels

    audio: true,
    video: false
  })
  .then((stream: MediaStream) => {
    const source = audioCtx.createMediaStreamSource(stream);

    const scriptProcessor = audioCtx.createScriptProcessor(16384, 1, 1);

    scriptProcessor.onaudioprocess = (e: AudioProcessingEvent) => {
      const { inputBuffer } = e;
      const data = inputBuffer.getChannelData(0);

      worker.postMessage(data);
    };

    source.connect(scriptProcessor);

    const mute = audioCtx.createGain();
    mute.gain.value = 0;

    scriptProcessor.connect(mute);

    mute.connect(audioCtx.destination);
  });
