import { SimpleEventDispatcher, ISimpleEvent } from "strongly-typed-events";

import { ValidationResult } from "r5t-Avignon/Index";

import { ValidatedInput } from "./ValidatedInput";

/**
 * Applies validation to the value of a text input after a specified event.
 * Then provides an event for the result of validation.
 */
export class ValidatedTextArea extends ValidatedInput<HTMLTextAreaElement>
{
    constructor(
        textArea: HTMLTextAreaElement,
        validator: (value: string) => Promise<ValidationResult>,
        event: keyof HTMLElementEventMap = "change")
    {
        super(textArea, validator, event);
    }
}