import { HtmlElementEvent } from "r5t-Avignon";

import { ElementAndModelAction } from "../Types/ElementAndModelAction";
import { IHasElementValuePropagator } from "./Interfaces/IHasElementValuePropagator";
import { ValuePropagatorBase } from "./Base Classes/ValuePropagatorBase";

/**
 * Useful for input to model binding.
 */
export class OneWayElementToModelBinding<TElement extends HTMLElement, TModel> extends ValuePropagatorBase
    implements IHasElementValuePropagator<TElement>
{
    // Store closures to prove we have captured context.
    private OnElementChanged_Internal = () => this.OnElementChanged();


    constructor(
        public readonly Element: TElement,
        public readonly Model: TModel,
        private readonly ElementToValue: ElementAndModelAction<TElement, TModel>,
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
            this.ElementToValue(this.Element, this.Model);

            // Inform that propagation occurred.
            this.FireOnPropagated();
        }

        // Inform that propagation has finished.
        this.FireOnPropagationFinished();
    }
}