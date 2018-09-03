const worker = new Worker("./worker.ts");

worker.onmessage = e => {
  console.log(e.data);
};

var audioCtx = new AudioContext();

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
