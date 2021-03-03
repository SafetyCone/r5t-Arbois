import { Parsification, Stringification } from "r5t-Avignon";

import { ValueChangedNotifier } from "../Classes/ValueChangedNotifier";
import { HtmlInputableElement } from "../Types/HtmlInputableElement";
import { HtmlInputableTwoWayChangeBinding } from "./HtmlInputableTwoWayChangeBinding";

export class HtmlInputableStringTwoWayChangeBinding<TElement extends HtmlInputableElement>
    extends HtmlInputableTwoWayChangeBinding<TElement, string>
{
    constructor(
        element: TElement,
        stringValueChangedNotifier: ValueChangedNotifier<string>)
    {
        super(element, stringValueChangedNotifier, Parsification.ToString, Stringification.FromString);
    }
}