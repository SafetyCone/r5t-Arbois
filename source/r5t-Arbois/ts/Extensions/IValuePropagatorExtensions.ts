import { Action } from "r5t-Avignon/Index";

import { IValuePropagator } from "../Bindings/Interfaces/IValuePropagator";

export class IValuePropagatorExtensions
{
    public static InPropagationBlockedContext(valuePropagator: IValuePropagator, action: Action)
    {
        // Allow restoring the prior value, nost just false.
        let priorValue = valuePropagator.BlockPropagation;

        valuePropagator.BlockPropagation = true;

        let postAction = () =>
        {
            valuePropagator.OnPropagationFinished.unsubscribe(postAction);

            valuePropagator.BlockPropagation = priorValue;
        };
        valuePropagator.OnPropagationFinished.subscribe(postAction);

        action();
    }

    public static InPropagationAllowedContext(valuePropagator: IValuePropagator, action: Action)
    {
        // Allow restoring the prior value, nost just true.
        let priorValue = valuePropagator.BlockPropagation;

        valuePropagator.BlockPropagation = false;

        let postAction = () =>
        {
            valuePropagator.OnPropagationFinished.unsubscribe(postAction);

            valuePropagator.BlockPropagation = priorValue;
        };
        valuePropagator.OnPropagationFinished.subscribe(postAction);

        action();
    }
}