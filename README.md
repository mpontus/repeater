# Repeater

> Automatic voice recorder built using web technologies

This app records your speech and plays it back to you during a pause.

## Background

One of the techniques used to improve pronunciation with a foreign language is called [Shadowing](https://en.wikipedia.org/wiki/Speech_shadowing). It's an experimental technique of repeating speech as you listen to it.

A great way to see mistakes that you are making is to record yourself. Repeater can do this automatically while you are watching a movie, listening to a podcast or an audio-book.

## Usage

1. Open the page: http://mpontus.github.io/repeater/ and press the record button.

2. Adjust threshold and volume until you can speak comfortably and hear your speech back.

3. Threshold too low will trigger voice detector with background noise, and make repeater record indefinitely.

4. Now you can open your favorite movie and start practicing.

## Development

The app is using [Cycle.js](https://cycle.js.org/) to provide UI controls and orchestrate data flow between web worker and Web Audio API.

### Start the dev server

```
npm run start
```

### Build and deploy

```
npm run build
npm run deploy
```

### Directory Structure

```
/src
| /drivers				# Cycle.js driver
| | audioDriver.ts		# Web Audio adapter
| | workerDriver.ts		# Web Worker bridge
| /components			# Cycle.js UI components
| | LabeledSlider.ts	# slider component
| | ToggleButton.ts		# record button component
| /worker
| | CircularBuffer.ts	# Circular buffer implementation
| | VoiceDetector.ts	# Voice detector implementation
| | index.ts			# Entry file for the Web Worker
| index.ts				# Entry file for Cycle.js app
```
## Contribute

Some of the features which I'd like to implement after refactoring include:

- [ ] Mobile browser support
- [ ] Active recording indicator
- [ ] Voice amplitude indicator
- [ ] Hotkeys

Feel free to open an issue with your own suggestions or send a PR if you are feeling generous.

## License

[GPL](./LICENSE) © Mikhail Pontus
