import { HtmlElementEvent, Parsification, Stringification, Validation } from "r5t-Avignon/Index";
import { ValueChangedNotifier } from "../Classes/ValueChangedNotifier";

import { TwoWayValidatedInputValueBinding } from "./TwoWayValidatedInputValueBinding";

export class TwoWayValidatedInputNumberBinding extends TwoWayValidatedInputValueBinding<HTMLInputElement, number>
{
    constructor(
        htmlElement: HTMLInputElement,
        valueChangedNotifier: ValueChangedNotifier<number>,
        elementEvent: HtmlElementEvent = "change")
    {
        super(
            htmlElement,
            valueChangedNotifier,
            Validation.IsNumber,
            Parsification.ToNumber,
            Stringification.Default,
            elementEvent
        );
    }
}