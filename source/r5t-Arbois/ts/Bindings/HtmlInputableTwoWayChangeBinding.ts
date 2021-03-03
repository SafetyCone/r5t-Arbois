import { Parsifier, Stringifier } from "r5t-Avignon";

import { ValueChangedNotifier } from "../Classes/ValueChangedNotifier";
import { ElementAndValueAction } from "../Types/ElementAndValueAction";
import { HtmlInputableElement } from "../Types/HtmlInputableElement";
import { TwoWayElementAndValueBinding } from "./TwoWayElementAndValueBinding";

export class HtmlInputableTwoWayChangeBinding<TElement extends HtmlInputableElement, TModel>
    extends TwoWayElementAndValueBinding<TElement, TModel>
{
    constructor(
        element: TElement,
        valueChangedNotifier: ValueChangedNotifier<TModel>,
        parsifier: Parsifier<TModel>,
        stringifier: Stringifier<TModel>)
    {
        let elementToValue: ElementAndValueAction<TElement, TModel> = (element, valueChangedNotifier) =>
        {
            let valueString = element.value;

            let parsedValue = parsifier(valueString);

            valueChangedNotifier.SetValue(parsedValue);
        };

        let valueToElement: ElementAndValueAction<TElement, TModel> = (element, valueChangedNotifier) =>
        {
            let value = valueChangedNotifier.Value;

            let valueString = stringifier(value);

            element.value = valueString;
        };

        super(element, valueChangedNotifier, elementToValue, valueToElement);
    }
}