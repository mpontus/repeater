import * as Snabbdom from "snabbdom-pragma";

import { DOMSource } from "@cycle/dom/src/rxjs";
import { Observable, combineLatest, of } from "rxjs";
import { map, startWith, scan, pluck, filter, take } from "rxjs/operators";
import { LabeledSlider } from "./LabeledSlider";
import { ToggleButton } from "./ToggleButton";
import { VNode } from "@cycle/dom";

export interface Props {
  initialVolume: number;
  initialThreshold: number;
}

export interface Sources {
  DOM: DOMSource;
  props: Observable<Props>;
}

export interface Sinks {
  DOM: Observable<VNode>;
  volume: Observable<number>;
  threshold: Observable<number>;
  started: Observable<boolean>;
}

export function Main(sources: Sources): Sinks {
  const helpVisible$ = sources.DOM.select(".help-button")
    .events("click")
    .pipe(
      scan((isShown) => !isShown, false),
      startWith(false)
    );
  const helpShown$ = helpVisible$.pipe(
    filter((value) => value === true),
    take(1),
    startWith(false)
  );

  const initialVolume$ = sources.props.pipe(pluck("initialVolume"));
  const initialThreshold$ = sources.props.pipe(pluck("initialThreshold"));

  const volumeSliderProps$ = initialVolume$.pipe(
    map((value) => ({
      label: "Feedback Volume",
      min: 0,
      max: 100,
      initial: value,
    }))
  );

  const thresholdSliderProps$ = initialThreshold$.pipe(
    map((value) => ({
      label: "Amplitude Threshold",
      min: 0,
      max: 100,
      initial: value,
    }))
  );

  const toggleButtonProps$ = of(false).pipe(
    map((value) => ({
      label: "Start",
      initial: value,
    }))
  );

  const volumeSlider = LabeledSlider({
    DOM: sources.DOM,
    props$: volumeSliderProps$,
  });
  const thresholdSlider = LabeledSlider({
    DOM: sources.DOM,
    props$: thresholdSliderProps$,
  });
  const toggleButton = ToggleButton({
    DOM: sources.DOM,
    props$: toggleButtonProps$,
  });

  const vdom$ = combineLatest([
    helpShown$,
    helpVisible$,
    volumeSlider.DOM,
    thresholdSlider.DOM,
    toggleButton.DOM,
  ]).pipe(
    map(
      ([
        helpShown,
        helpVisible,
        volumeSliderDOM,
        thresholdSliderDOM,
        toggleButtonDOM,
      ]) => (
        <main>
          <header>
            <h1 className="title">Repeater</h1>
            <a className="help-button" aria-label="About">
              <svg viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
              </svg>
            </a>
          </header>
          {helpShown && (
            <section className={`help ${helpVisible ? "" : "help-hidden"}`}>
              <p>
                Repeater listens to your speech and plays it back automatically.
                It helps practice shadowing technique for language learning and
                improving pronunciation.
              </p>
              <p>
                Open a video, like TED talk, and repeat after the speaker as
                closely in time, rhythm, and intonation as possible. Pause the
                video, and compare it to your own speech.
              </p>
              <div className="embedded-video">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/u5JseMqoQCg?rel=0"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                  allowfullscreen
                />
              </div>
              <p>
                Using headphones is recommended to avoid interference from the
                speakers. Recorded audio never leaves your browser. For more
                information about the shadowing technique, see the above video.
              </p>
            </section>
          )}
          <section className="volume-slider">{volumeSliderDOM}</section>
          <section className="threshold-slider">{thresholdSliderDOM}</section>
          <section className="toggle-button">{toggleButtonDOM}</section>
          <footer>
            <a
              className="social-link"
              href="https://github.com/mpontus/repeater"
            >
              <svg
                viewBox="0 0 16 16"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
              <span>Fork me on GitHub</span>
            </a>
          </footer>
        </main>
      )
    )
  );

  return {
    DOM: vdom$,
    volume: volumeSlider.value,
    threshold: thresholdSlider.value,
    started: toggleButton.checked,
  };
}
