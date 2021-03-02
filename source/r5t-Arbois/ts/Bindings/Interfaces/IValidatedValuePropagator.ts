import { ISignal } from "strongly-typed-events";

import { IValuePropagator } from "./IValuePropagator";

export interface IValidatedValuePropagator extends IValuePropagator
{
    // Indicates that propagation of an invalid or validation-skipped value was blocked.
    OnInvalidOrSkippedPropagationBlocked: ISignal;
    // Indicates that propagation of an invalid or validation-skipped value was allowed.
    OnInvalidOrSkippedPropagationAllowed: ISignal;

    /**
     * If true, only values that have been validated and found valid are propagated.
     * Else, all values, valid, invalid, and those where validation was skipped, will be propagated.
     */
    BlockInvalidOrSkippedPropagation: boolean;
}