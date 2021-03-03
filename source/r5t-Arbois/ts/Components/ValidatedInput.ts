import { SimpleEventDispatcher, ISimpleEvent, SignalDispatcher, ISignal } from "strongly-typed-events";

import { HtmlElementEvent, StringValidator, ValidationResult } from "r5t-Avignon";

import { HtmlInputableElement } from "../Types/HtmlInputableElement";

export class ValidatedInputBase
{
    public ValidationDisabled: boolean = false;
}

/**
 * Validation finished fires after validation success or failure.
 * Either validation skipped or validation finished fires. These are separate.
 */
export class ValidatedInput<TElement extends HtmlInputableElement> extends ValidatedInputBase
{
    private zOnValidationFinished = new SimpleEventDispatcher<ValidationResult>();
    public get OnValidationFinished(): ISimpleEvent<ValidationResult>
    {
        return this.zOnValidationFinished.asEvent();
    }
    private FireOnValidationFinished(validationResult: ValidationResult)
    {
        // Choose async events.
        this.zOnValidationFinished.dispatchAsync(validationResult);
    }

    private zOnValidationSuccess = new SimpleEventDispatcher<TElement>();
    public get OnValidationSuccess(): ISimpleEvent<TElement>
    {
        return this.zOnValidationSuccess.asEvent();
    }
    private FireOnValidationSuccess()
    {
        // Choose async events.
        this.zOnValidationSuccess.dispatchAsync(this.HtmlElement);
    }

    private zOnValidationFailure = new SimpleEventDispatcher<ValidationResult>();
    public get OnValidationFailure(): ISimpleEvent<ValidationResult>
    {
        return this.zOnValidationFailure.asEvent();
    }
    private FireOnValidationFailure(validationResult: ValidationResult)
    {
        // Choose async events.
        this.zOnValidationFailure.dispatchAsync(validationResult);
    }

    private zOnValidationSkipped = new SignalDispatcher();
    public get OnValiationSkipped(): ISignal
    {
        return this.zOnValidationSkipped.asEvent();
    }
    private FireOnValidationSkipped()
    {
        // Choose async events.
        this.zOnValidationSkipped.dispatchAsync();
    }

    public get Value()
    {
        let value = this.HtmlElement.value;
        return value;
    }


    constructor(
        public readonly HtmlElement: TElement,
        protected readonly Validator: StringValidator,
        public readonly Event: HtmlElementEvent = "change")
    {
        super();
        
        this.HtmlElement.addEventListener(this.Event, () => this.OnEvent());
    }

    public IsValid() : Promise<ValidationResult>
    {
        let value = this.Value;

        let gettingIsValid = this.Validator(value);
        return gettingIsValid;
    }

    private async OnEvent()
    {
        if(this.ValidationDisabled)
        {
            // Skip validation. Inform that validation was skipped, then return.
            this.FireOnValidationSkipped();

            return;
        }

        let validationResult = await this.IsValid();

        this.HandleValidationResult(validationResult);
    }

    protected HandleValidationResult(validationResult: ValidationResult)
    {
        if(validationResult.IsValid)
        {
            this.FireOnValidationSuccess();
        }
        else
        {
            this.FireOnValidationFailure(validationResult);
        }

        this.FireOnValidationFinished(validationResult);
    }
}