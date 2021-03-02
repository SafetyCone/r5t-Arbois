import { SignalDispatcher, ISignal } from "strongly-typed-events";
import { ValuePropagation } from "../../Classes/ValuePropagation";

import { IValuePropagator } from "../Interfaces/IValuePropagator";

export abstract class ValuePropagatorBase implements IValuePropagator
{
    private zOnPropagationFinished = new SignalDispatcher();
    public get OnPropagationFinished(): ISignal
    {
        return this.zOnPropagationFinished.asEvent();
    }
    protected FireOnPropagationFinished()
    {
        // Choose async events.
        this.zOnPropagationFinished.dispatchAsync();
    }

    private zOnPropagated = new SignalDispatcher();
    public get OnPropagated(): ISignal
    {
        return this.zOnPropagated.asEvent();
    }
    protected FireOnPropagated()
    {
        // Choose async events.
        this.zOnPropagated.dispatchAsync();
    }

    private zOnPropagationBlocked = new SignalDispatcher();
    public get OnPropagationBlocked(): ISignal
    {
        return this.zOnPropagationBlocked.asEvent();
    }
    protected FireOnPropagationBlocked()
    {
        // Choose async events.
        this.zOnPropagationBlocked.dispatchAsync();
    }


    public BlockPropagation: boolean = ValuePropagation.DefaultBlockPropagation;
}