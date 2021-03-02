import { HtmlElementEvent, Parsifier, Stringifier, StringValidator, ValidationResult } from "r5t-Avignon/Index";

import { IsChangingContext } from "../Classes/IsChangingContext";
import { ValueChangedNotifier } from "../Classes/ValueChangedNotifier";
import { ValidatedInput } from "../Components/ValidatedInput";
import { ElementAndValueAction } from "../Types/ElementAndValueAction";
import { HtmlInputableElement } from "../Types/HtmlInputableElement";
import { IHasValueChangedNotifierValuePropagator } from "./Interfaces/IHasValueChangedNotifierValuePropagator";
import { IHasValidatedInputValuePropagator } from "./Interfaces/IHasValidatedInputValuePropagator";
import { ValidatedValuePropagation } from "../Classes/ValidatedValuePropagation";
import { ValidatedValuePropagatorBase } from "./Base Classes/ValidatedValuePropagatorBase";

/**
 * Two-way binding between a validated input element and an observable value.
 */
export class TwoWayValidatedInputValueBinding<TElement extends HtmlInputableElement, TValue> extends ValidatedValuePropagatorBase
    implements IHasValueChangedNotifierValuePropagator<TValue>, IHasValidatedInputValuePropagator<TElement>
{
    public readonly IsChangingContext = new IsChangingContext();
    public readonly ValidatedInput: ValidatedInput<TElement>;
    // Store closures to prove we have captured context.
    private OnModelChanged_Internal = () => this.OnModelChanged();
    private OnValidatedInputValidationFinished_Internal = (validationResult: ValidationResult) => this.OnValidatedInputValidationFinished(validationResult);
    private OnValidatedInputValidationSkipped_Internal = () => this.OnValidatedInputValidationSkipped();

    private readonly ElementToValue: ElementAndValueAction<TElement, TValue>;
    private readonly ValueToElement: ElementAndValueAction<TElement, TValue>;


    constructor(
        public readonly HtmlElement: TElement,
        public readonly ValueChangedNotifier: ValueChangedNotifier<TValue>,
        validator: StringValidator,
        parsifier: Parsifier<TValue>,
        stringifier: Stringifier<TValue>,
        public readonly ElementEvent: HtmlElementEvent = "change")
    {
        super();

        this.ValidatedInput = new ValidatedInput(this.HtmlElement, validator, this.ElementEvent);

        this.ElementToValue = (element, valueChangedNotifier) =>
        {
            let valueString = element.value;

            let parsedValue = parsifier(valueString);

            valueChangedNotifier.SetValue(parsedValue);
        };

        this.ValueToElement = (element, valueChangedNotifier) =>
        {
            let value = valueChangedNotifier.Value;

            let valueString = stringifier(value);

            element.value = valueString;
        };

        this.ValidatedInput.OnValidationFinished.subscribe(this.OnValidatedInputValidationFinished_Internal);
        this.ValidatedInput.OnValiationSkipped.subscribe(this.OnValidatedInputValidationSkipped_Internal);
        this.ValueChangedNotifier.OnValueChanged.subscribe(this.OnModelChanged_Internal);
    }

    private OnValidatedInputValidationFinished(validationResult: ValidationResult)
    {
        this.IsChangingContext.ExecuteInContext(() =>
        {
            if(this.OnPropagationBlocked)
            {
                // Inform that propagation was blocked.
                this.FireOnPropagationBlocked();
            }
            else
            {
                if(validationResult.IsValid)
                {
                    // Actually propagate.
                    this.ElementToValue(this.HtmlElement, this.ValueChangedNotifier);

                    // Inform that propagation occurred.
                    this.FireOnPropagated();
                }
                else
                {
                    if(this.BlockInvalidOrSkippedPropagation)
                    {
                        // Inform that propagation was blocked.
                        this.FireOnInvalidOrSkippedPropagationBlocked();
                        this.FireOnPropagationBlocked();
                    }
                    else
                    {
                        // Actually propagate.
                        this.ElementToValue(this.HtmlElement, this.ValueChangedNotifier);

                        // Inform that propagation occurred.
                        this.FireOnInvalidOrSkippedPropagationAllowed();
                        this.FireOnPropagated();
                    }
                }
            }

            // Inform that propagation has finished.
            this.FireOnPropagationFinished();
        });
    }

    private OnValidatedInputValidationSkipped()
    {
        this.IsChangingContext.ExecuteInContext(() =>
        {
            if(this.OnPropagationBlocked)
            {
                // Inform that propagation was blocked.
                this.FireOnPropagationBlocked();
            }
            else
            {
                if(this.BlockInvalidOrSkippedPropagation)
                {
                    // Inform that propagation was blocked.
                    this.FireOnInvalidOrSkippedPropagationBlocked();
                    this.FireOnPropagationBlocked();
                }
                else
                {
                    // Actually propagate.
                    this.ElementToValue(this.HtmlElement, this.ValueChangedNotifier);

                    // Inform that propagation occurred.
                    this.FireOnInvalidOrSkippedPropagationAllowed();
                    this.FireOnPropagated();
                }
            }

            // Inform that propagation has finished.
            this.FireOnPropagationFinished();
        });
    }

    private OnModelChanged()
    {
        this.IsChangingContext.ExecuteInContext(() =>
        {
            if(this.BlockPropagation)
            {
                // Skip propagation. Inform that propagation was skipped, then return.
                this.FireOnPropagationBlocked();

                return;
            }

            this.ValueToElement(this.ValidatedInput.HtmlElement, this.ValueChangedNotifier);

            // Inform that propagation occurred.
            this.FireOnPropagationFinished();
        });
    }
}