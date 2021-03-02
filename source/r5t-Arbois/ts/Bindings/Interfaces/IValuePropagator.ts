import { ISignal } from "strongly-typed-events";


export interface IValuePropagator
{
    // Indicates that the propagation process has finished (does not say whether propagation occurred or not).
    OnPropagationFinished: ISignal;

    // Indicates propagation succeeded.
    OnPropagated: ISignal;
    // Indicates propagation was blocked.
    OnPropagationBlocked: ISignal;


    BlockPropagation: boolean;
}