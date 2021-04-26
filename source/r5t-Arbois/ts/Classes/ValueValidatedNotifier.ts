import { ISimpleEvent, SimpleEventDispatcher } from "ste-simple-events";

import { ValidationResult, SynchronousValidator } from "r5t-Avignon";

import { IValueValidatedNotifierV02 } from "../Interfaces/IValueValidatedNotifierV02";
import { IValueChangedNotifierV02 } from "../Interfaces/IValueChangedNotifierV02";

/**
 * Synchronous dispatch.
 */
export class ValueValidatedNotifier<T> implements IValueValidatedNotifierV02<T>
{
    private zOnValidation = new SimpleEventDispatcher<ValidationResult>();
    public get OnValidation(): ISimpleEvent<ValidationResult>
    {
        return this.zOnValidation.asEvent();
    }
    private FireOnValidation(validationResult: ValidationResult)
    {
        // Choose synchronous dispatch.
        this.zOnValidation.dispatch(validationResult);
    }

    public get Value(): T
    {
        let value = this.ValueSource.Value;
        return value;
    }


    constructor(
        private readonly ValueSource: IValueChangedNotifierV02<T>,
        private readonly Validator: SynchronousValidator<T>,
    )
    {
        this.Attach();
    }

    private Attach()
    {
        this.ValueSource.OnValueChanged.subscribe(() => this.OnValueChangedHandler());
    }

    private OnValueChangedHandler()
    {
        let validationResult = this.Validator(this.ValueSource.Value);

        this.FireOnValidation(validationResult);
    }
}