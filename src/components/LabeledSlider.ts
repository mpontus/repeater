import xs, { Stream } from "xstream";
import { div, span, input, DOMSource, VNode } from "@cycle/dom";

export type Value = number;

export interface Props {
  initial: Value;
  label: string;
  min: number;
  max: number;
  progress?: number;
}

export interface Sources {
  DOM: DOMSource;
  props$: Stream<Props>;
}

export interface Sinks {
  DOM: Stream<VNode>;
  value: Stream<Value>;
  changes: Stream<Value>;
}

function intent(domSource: DOMSource): Stream<Value> {
  return domSource
    .select(".slider")
    .events("input")
    .map((ev: any) => ev.target.value);
}

function model(newValue$: Stream<Value>, props$: Stream<Props>): Stream<Value> {
  const initialValue$ = props$.map((props) => props.initial).take(1);
  return xs.merge(initialValue$, newValue$).remember();
}

function view(props$: Stream<Props>, valueChange$: Stream<Value>) {
  const value$ = xs.merge(
    props$.map((props) => props.initial),
    valueChange$
  );
  const progress$ = props$.map((props) =>
    Math.floor(((props.progress || 0) / props.max) * 100)
  );

  return xs.combine(props$, value$, progress$).map(([props, value, p]) =>
    div(".labeled-slider", [
      span(".label", props.label),
      input(".slider", {
        attrs: {
          type: "range",
          min: props.min,
          max: props.max,
          value,
          style: `--p: ${p}%`,
        },
      }),
    ])
  );
}

export const LabeledSlider = (sources: Sources): Sinks => {
  const change$ = intent(sources.DOM);
  const value$ = model(change$, sources.props$);
  const vdom$ = view(sources.props$, value$);
  return {
    DOM: vdom$,
    value: value$,
    changes: change$,
  };
};
