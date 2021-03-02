import { ValueChangedNotifier } from "../Classes/ValueChangedNotifier";
import { ElementAndValueAction } from "../Types/ElementAndValueAction";
import { ValuePropagatorBase } from "./Base Classes/ValuePropagatorBase";
import { IHasValueChangedNotifierValuePropagator } from "./Interfaces/IHasValueChangedNotifierValuePropagator";

/**
 * Useful for displaying values.
 */
export class OneWayValueToElementBinding<TElement extends HTMLElement, TValue> extends ValuePropagatorBase
    implements IHasValueChangedNotifierValuePropagator<TValue>
{
    // Store closure to prove we have captured context.
    private OnValueChanged_Internal = () => this.OnValueChanged();


    constructor(
        public readonly Element: TElement,
        public readonly ValueChangedNotifier: ValueChangedNotifier<TValue>,
        private readonly ValueToElement: ElementAndValueAction<TElement, TValue>)
    {
        super();

        this.ValueChangedNotifier.OnValueChanged.subscribe(this.OnValueChanged_Internal);
    }

    private OnValueChanged()
    {
        if(this.OnPropagationBlocked)
        {
            // Inform that propagation was blocked.
            this.FireOnPropagationBlocked();
        }
        else
        {
            // Actually propagate.
            this.ValueToElement(this.Element, this.ValueChangedNotifier);

            // Inform that propagation occurred.
            this.FireOnPropagated();
        }

        // Inform that propagation has finished.
        this.FireOnPropagationFinished();
    }
}