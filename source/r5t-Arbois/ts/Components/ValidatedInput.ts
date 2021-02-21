import { SimpleEventDispatcher, ISimpleEvent } from "strongly-typed-events";

import { ValidationResult } from "r5t-Avignon/Index";

import { HtmlInputableElement } from "../Types/HtmlInputableElement";

export class ValidatedInput<T extends HtmlInputableElement>
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

    private zOnValidationSuccess = new SimpleEventDispatcher<T>();
    public get OnValidationSuccess(): ISimpleEvent<T>
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


    constructor(
        public readonly HtmlElement: T,
        protected readonly Validator: (value: string) => Promise<ValidationResult>,
        protected readonly Event: keyof HTMLElementEventMap = "change")
    {
        this.HtmlElement.addEventListener(this.Event, () => this.OnEvent());
    }

    private async OnEvent()
    {
        let valueString = this.HtmlElement.value;

        let validationResult = await this.Validator(valueString);

        this.HandleValidationResult(validationResult);
    }

    protected HandleValidationResult(validationResult: ValidationResult)
    {
        this.FireOnValidationFinished(validationResult);

        if(validationResult.IsValid)
        {
            this.FireOnValidationSuccess();
        }
        else
        {
            this.FireOnValidationFailure(validationResult);
        }
    }
}