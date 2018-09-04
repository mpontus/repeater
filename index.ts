const worker = new Worker("./worker.ts");

var audioCtx = new AudioContext();

let bufferSource: AudioBufferSourceNode | null = null;

worker.onmessage = e => {
  switch (e.data.type) {
    case "voice_start": {
      if (bufferSource !== null) {
        bufferSource.disconnect(audioCtx.destination);
        bufferSource.stop();
      }

      break;
    }

    case "voice_end": {
      bufferSource = audioCtx.createBufferSource();

      const buffer = e.data.payload;
      const audioBuffer = audioCtx.createBuffer(
        1,
        buffer.length,
        audioCtx.sampleRate
      );

      audioBuffer.copyToChannel(buffer, 0, 0);

      bufferSource.buffer = audioBuffer;
      bufferSource.connect(audioCtx.destination);
      bufferSource.start();

      break;
    }
  }
};

navigator.mediaDevices
  .getUserMedia({
    // TODO: specify number of channels

    audio: true,
    video: false
  })
  .then((stream: MediaStream) => {
    const source = audioCtx.createMediaStreamSource(stream);

    const scriptProcessor = audioCtx.createScriptProcessor(4096, 1, 1);

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
