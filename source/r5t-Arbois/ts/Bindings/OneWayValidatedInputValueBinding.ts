import { HtmlElementEvent, Parsifier, StringValidator, ValidationResult } from "r5t-Avignon";

import { ValueChangedNotifier } from "../Classes/ValueChangedNotifier";
import { ValidatedInput } from "../Components/ValidatedInput";
import { ElementAndValueAction } from "../Types/ElementAndValueAction";
import { HtmlInputableElement } from "../Types/HtmlInputableElement";
import { IHasValidatedInputValuePropagator } from "./Interfaces/IHasValidatedInputValuePropagator";
import { ValidatedValuePropagatorBase } from "./Base Classes/ValidatedValuePropagatorBase";

export class OneWayValidatedInputValueBinding<TElement extends HtmlInputableElement, TValue> extends ValidatedValuePropagatorBase
    implements IHasValidatedInputValuePropagator<TElement>
{
    public readonly ValidatedInput: ValidatedInput<TElement>;
    // Store closures to prove we have captured context.
    private OnValidatedInputValidationFinished_Internal = (validationResult: ValidationResult) => this.OnValidatedInputValidationFinished(validationResult);
    private OnValidatedInputValidationSkipped_Internal = () => this.OnValidatedInputValidationSkipped();
    private readonly ElementToValue: ElementAndValueAction<TElement, TValue>;


    constructor(
        public readonly HtmlElement: TElement,
        public readonly ValueChangedNotifier: ValueChangedNotifier<TValue>,
        validator: StringValidator,
        parsifier: Parsifier<TValue>,
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

        this.ValidatedInput.OnValidationFinished.subscribe(this.OnValidatedInputValidationFinished_Internal);
        this.ValidatedInput.OnValiationSkipped.subscribe(this.OnValidatedInputValidationSkipped_Internal);
    }

    private OnValidatedInputValidationFinished(validationResult: ValidationResult)
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
    }

    private OnValidatedInputValidationSkipped()
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
    }
}