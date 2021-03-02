import { Action, HtmlElementEvent } from "r5t-Avignon/Index";

import { ValueChangedNotifier } from "../Classes/ValueChangedNotifier";
import { ElementAndValueAction } from "../Types/ElementAndValueAction";

export class TwoWayElementAndValueBinding<TElement extends HTMLElement, TValue>
{
    private IsChanging = false;
    // Store closures to prove we have captured context.
    private OnValueChanged_Internal = () => this.OnValueChanged();
    private OnElementChanged_Internal = () => this.OnElementChanged();


    constructor(
        public readonly Element: TElement,
        public readonly ValueChangedNotifier: ValueChangedNotifier<TValue>,
        private readonly ElementToValue: ElementAndValueAction<TElement, TValue>,
        private readonly ValueToElement: ElementAndValueAction<TElement, TValue>,
        public readonly ElementEvent: HtmlElementEvent = "change")
    {
        this.Element.addEventListener(this.ElementEvent, this.OnElementChanged_Internal);
        this.ValueChangedNotifier.OnValueChanged.subscribe(this.OnValueChanged_Internal);
    }

    private OnElementChanged()
    {
        this.ExecuteInChangingContext(() =>
        {
            this.ElementToValue(this.Element, this.ValueChangedNotifier);
        });
    }

    private OnValueChanged()
    {
        this.ExecuteInChangingContext(() =>
        {
            this.ValueToElement(this.Element, this.ValueChangedNotifier);
        });
    }

    private ExecuteInChangingContext(action: Action)
    {
        // Prevent value => element => value => element... cycle.
        if(this.IsChanging)
        {
            return;
        }

        this.IsChanging = true;

        action();

        this.IsChanging = false;
    }
}