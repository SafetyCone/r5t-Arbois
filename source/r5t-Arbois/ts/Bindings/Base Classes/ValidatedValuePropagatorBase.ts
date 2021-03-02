import { ISignal, SignalDispatcher } from "strongly-typed-events";

import { ValidatedValuePropagation } from "../../Classes/ValidatedValuePropagation";
import { IValidatedValuePropagator } from "../Interfaces/IValidatedValuePropagator";
import { ValuePropagatorBase } from "./ValuePropagatorBase";

export abstract class ValidatedValuePropagatorBase extends ValuePropagatorBase
    implements IValidatedValuePropagator
{
    private zOnInvalidOrSkippedPropagationBlocked = new SignalDispatcher();
    public get OnInvalidOrSkippedPropagationBlocked(): ISignal
    {
        return this.zOnInvalidOrSkippedPropagationBlocked.asEvent();
    }
    protected FireOnInvalidOrSkippedPropagationBlocked()
    {
        // Choose async events.
        this.zOnInvalidOrSkippedPropagationBlocked.dispatchAsync();
    }

    private zOnInvalidOrSkippedPropagationAllowed = new SignalDispatcher();
    public get OnInvalidOrSkippedPropagationAllowed(): ISignal
    {
        return this.zOnInvalidOrSkippedPropagationAllowed.asEvent();
    }
    protected FireOnInvalidOrSkippedPropagationAllowed()
    {
        // Choose async events.
        this.zOnInvalidOrSkippedPropagationAllowed.dispatchAsync();
    }

    public BlockInvalidOrSkippedPropagation: boolean = ValidatedValuePropagation.DefaultBlockInvalidOrSkippedPropagation;
}