import { SimpleEventDispatcher, ISimpleEvent } from "strongly-typed-events";

import { ValidationResult } from "r5t-Avignon";

import { ValidatedInput } from "./ValidatedInput";

/**
 * Applies validation to the value of a text input after a specified event.
 * Then provides an event for the result of validation.
 */
export class ValidatedTextInput extends ValidatedInput<HTMLInputElement>
{
    constructor(
        textInput: HTMLInputElement,
        validator: (value: string) => Promise<ValidationResult>,
        event: keyof HTMLElementEventMap = "change")
    {
        super(textInput, validator, event);
    }
}