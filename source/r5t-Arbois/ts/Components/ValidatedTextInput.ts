import { SimpleEventDispatcher, ISimpleEvent } from "strongly-typed-events";

import { ValidationResult } from "r5t-Avignon/Index";

/**
 * Applies validation to the value of a text input after a specified event.
 * Then provides an event for the result of validation.
 */
export class ValidatedTextInput
{
    private zOnValidation = new SimpleEventDispatcher<ValidationResult>();
    public get OnValidation(): ISimpleEvent<ValidationResult>
    {
        return this.zOnValidation.asEvent();
    }
    private FireOnValidation(validationResult: ValidationResult)
    {
        // Choose async events.
        this.zOnValidation.dispatchAsync(validationResult);
    }


    constructor(
        public readonly TextInput: HTMLInputElement,
        protected readonly Validator: (value: string) => Promise<ValidationResult>,
        protected readonly Event: keyof HTMLElementEventMap = "change")
    {
        this.TextInput.addEventListener(this.Event, () => this.OnEvent());
    }

    private async OnEvent()
    {
        let valueString = this.TextInput.value;

        let validationResult = await this.Validator(valueString);

        this.HandleValidationResult(validationResult);
    }

    protected HandleValidationResult(validationResult: ValidationResult)
    {
        this.FireOnValidation(validationResult);
    }
}