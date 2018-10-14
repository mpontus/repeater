import xs, { Stream } from "xstream";
import { div, span, input, DOMSource, VNode } from "@cycle/dom";
import isolate, { Component } from "@cycle/isolate";

export type Value = number;

export interface Props {
  initial: Value;
  label: string;
  min: number;
  max: number;
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
  const initialValue$ = props$.map(props => props.initial).take(1);
  return xs.merge(initialValue$, newValue$).remember();
}

function view(props$: Stream<Props>, value$: Stream<Value>) {
  return xs.combine(props$, value$).map(([props, value]) =>
    div(".labeled-slider", [
      span(".label", props.label),
      input(".slider", {
        attrs: { type: "range", min: props.min, max: props.max, value }
      })
    ])
  );
}

export const LabeledSlider: Component<Sources, Sinks> = isolate(
  (sources: Sources): Sinks => {
    const change$ = intent(sources.DOM);
    const value$ = model(change$, sources.props$);
    const vdom$ = view(sources.props$, value$);
    return {
      DOM: vdom$,
      value: value$,
      changes: change$
    };
  }
);