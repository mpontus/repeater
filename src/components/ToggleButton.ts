import xs, { Stream } from "xstream";
import { div, label, span, input, DOMSource, VNode } from "@cycle/dom";

export type Value = boolean;

export interface Props {
  initial: Value;
  label: string;
}

export interface Sources {
  DOM: DOMSource;
  props$: Stream<Props>;
}

export interface Sinks {
  DOM: Stream<VNode>;
  checked: Stream<Value>;
  changes: Stream<Value>;
}

function intent(domSource: DOMSource): Stream<Value> {
  return domSource
    .select(".checkbox")
    .events("input")
    .map((ev: any) => ev.target.checked);
}

function model(newValue$: Stream<Value>, props$: Stream<Props>): Stream<Value> {
  const initialValue$ = props$.map(props => props.initial).take(1);
  return xs.merge(initialValue$, newValue$).remember();
}

function view(props$: Stream<Props>, value$: Stream<Value>) {
  return xs.combine(props$, value$).map(([props, value]) =>
    label(".toggle-button", [
      input(".checkbox", {
        attrs: {
          type: "checkbox",
          checked: value
        }
      }),
      div(
        {
          attrs: {
            class: ["caption"]
          }
        },
        props.label
      )
    ])
  );
}

export const ToggleButton = (sources: Sources): Sinks => {
  const change$ = intent(sources.DOM);
  const value$ = model(change$, sources.props$);
  const vdom$ = view(sources.props$, value$);
  return {
    DOM: vdom$,
    checked: value$,
    changes: change$
  };
};
