import { HtmlElementEvent } from "r5t-Avignon";

import { ValueChangedNotifier } from "../Classes/ValueChangedNotifier";
import { ElementAndValueAction } from "../Types/ElementAndValueAction";
import { IHasElementValuePropagator } from "./Interfaces/IHasElementValuePropagator";
import { ValuePropagatorBase } from "./Base Classes/ValuePropagatorBase";

/**
 * Useful for input to value binding.
 */
export class OneWayElementToValueBinding<TElement extends HTMLElement, TModel> extends ValuePropagatorBase
    implements IHasElementValuePropagator<TElement>
{
    // Store closures to prove we have captured context.
    private OnElementChanged_Internal = () => this.OnElementChanged();


    constructor(
        public readonly Element: TElement,
        public readonly ValueChangedNotifier: ValueChangedNotifier<TModel>,
        private readonly ElementToValue: ElementAndValueAction<TElement, TModel>,
        public readonly ElementEvent: HtmlElementEvent = "change")
    {
        super();

        this.Element.addEventListener(this.ElementEvent, this.OnElementChanged_Internal);
    }

    private OnElementChanged()
    {
        if(this.OnPropagationBlocked)
        {
            // Inform that propagation was blocked.
            this.FireOnPropagationBlocked();
        }
        else
        {
            // Actually propagate.
            this.ElementToValue(this.Element, this.ValueChangedNotifier);

            // Inform that propagation occurred.
            this.FireOnPropagated();
        }

        // Inform that propagation has finished.
        this.FireOnPropagationFinished();
    }
}