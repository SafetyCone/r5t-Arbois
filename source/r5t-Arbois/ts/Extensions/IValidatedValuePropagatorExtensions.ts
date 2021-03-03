import { Action } from "r5t-Avignon";

import { IValidatedValuePropagator } from "../Bindings/Interfaces/IValidatedValuePropagator";

export class IValidatedValuePropagatorExtensions
{
    public static InBlockInvalidOrSkippedPropagationContext(validatedValuePropagator: IValidatedValuePropagator, action: Action)
    {
        // Allow restoring the prior value, not just true.
        let priorValue = validatedValuePropagator.BlockInvalidOrSkippedPropagation;

        validatedValuePropagator.BlockInvalidOrSkippedPropagation = true;

        let postAction = () =>
        {
            validatedValuePropagator.OnPropagationFinished.unsubscribe(postAction);

            validatedValuePropagator.BlockInvalidOrSkippedPropagation = priorValue;
        }
        validatedValuePropagator.OnPropagationFinished.subscribe(postAction);

        action();
    }

    public static InAllowInvalidOrSkippedPropagationContext(validatedValuePropagator: IValidatedValuePropagator, action: Action)
    {
        // Allow restoring the prior value, not just false.
        let priorValue = validatedValuePropagator.BlockInvalidOrSkippedPropagation;

        validatedValuePropagator.BlockInvalidOrSkippedPropagation = false;

        let postAction = () =>
        {
            validatedValuePropagator.OnPropagationFinished.unsubscribe(postAction);

            validatedValuePropagator.BlockInvalidOrSkippedPropagation = priorValue;
        }
        validatedValuePropagator.OnPropagationFinished.subscribe(postAction);

        action();
    }
}