import { Observable, combineLatest, merge } from "rxjs";
import { map, startWith, take } from "rxjs/operators";
import { div, label, span, input, VNode } from "@cycle/dom";
import { DOMSource } from "@cycle/dom/src/rxjs";

export type Value = boolean;

export interface Props {
  initial: Value;
  label: any;
}

export interface Sources {
  DOM: DOMSource;
  props$: Observable<Props>;
}

export interface Sinks {
  DOM: Observable<VNode>;
  checked: Observable<Value>;
  changes: Observable<Value>;
}

function intent(domSource: DOMSource): Observable<Value> {
  return domSource
    .select(".checkbox")
    .events("input")
    .pipe(map((ev: any) => ev.target.checked));
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
      label(".toggle-button", [
        input(".checkbox", {
          attrs: {
            type: "checkbox",
            checked: value,
          },
        }),
        div(
          {
            attrs: {
              class: ["caption"],
            },
          },
          props.label
        ),
      ])
    )
  );
}

export const ToggleButton = (sources: Sources): Sinks => {
  const change$ = intent(sources.DOM);
  const value$ = model(change$, sources.props$);
  const vdom$ = view(sources.props$, value$);
  return {
    DOM: vdom$,
    checked: value$,
    changes: change$,
  };
};
