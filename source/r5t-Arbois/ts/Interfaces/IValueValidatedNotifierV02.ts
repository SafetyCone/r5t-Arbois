import { ISimpleEvent } from "ste-simple-events";

import { ValidationResult } from "r5t-Avignon";

export interface IValueValidatedNotifierV02<T>
{
    OnValidation: ISimpleEvent<ValidationResult>;
    Value: T;
}