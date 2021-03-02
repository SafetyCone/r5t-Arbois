import { ValueChangedNotifier } from "../Classes/ValueChangedNotifier";

export type ElementAndValueAction<TElement extends HTMLElement, TValue> = (element: TElement, valueChangedNotifer: ValueChangedNotifier<TValue>) => void;