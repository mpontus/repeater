import { Observable, merge, combineLatest } from "rxjs";
import { map, take } from "rxjs/operators";
import { DOMSource } from "@cycle/dom/src/rxjs";
import { div, span, input, VNode } from "@cycle/dom";

export type Value = number;

export interface Props {
  initial: Value;
  label: string;
  min: number;
  max: number;
}

export interface Sources {
  DOM: DOMSource;
  props$: Observable<Props>;
}

export interface Sinks {
  DOM: Observable<VNode>;
  value: Observable<Value>;
  changes: Observable<Value>;
}

function intent(domSource: DOMSource): Observable<Value> {
  return domSource
    .select(".slider")
    .events("input")
    .pipe(map((ev: any) => ev.target.value));
}

function model(
  newValue$: Observable<Value>,
  props$: Observable<Props>
): Observable<Value> {
  const initialValue$ = props$.pipe(
    map((props) => props.initial),
    take(1)
  );
  return merge(initialValue$, newValue$);
}

function view(props$: Observable<Props>, value$: Observable<Value>) {
  return combineLatest(props$, value$).pipe(
    map(([props, value]) =>
      div(".labeled-slider", [
        span(".label", props.label),
        input(".slider", {
          attrs: { type: "range", min: props.min, max: props.max, value },
        }),
      ])
    )
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
