import { ISignal, ISignalHandler, ISubscribable, SignalDispatcher } from "strongly-typed-events";

/**
 * An evented debouncer.
 * Synchronous dispatch of debounced signal.
 */
export class SignalDebouncer
{
    public static readonly DefaultTimeoutMilliseconds = 300;


    private Timeout: number;

    protected zOnDebouncedSignal = new SignalDispatcher();
    public get OnDebouncedSignal(): ISignal
    {
        return this.zOnDebouncedSignal.asEvent();
    }


    constructor(
        private readonly Event: ISubscribable<ISignalHandler>,
        private readonly TimeoutMilliseconds = SignalDebouncer.DefaultTimeoutMilliseconds)
    {
        this.Attach();
    }

    private Attach()
    {
        this.Event.subscribe(this.OnEvent);
    }

    private OnEvent = () => this.OnEvent_Internal();
    private OnEvent_Internal()
    {
        // Reset the timeout.
        window.clearTimeout(this.Timeout);

        this.Timeout = window.setTimeout(() =>
        {
            // Fire the event.
            this.zOnDebouncedSignal.dispatch();
        },
        this.TimeoutMilliseconds);
    }

    public Detach()
    {
        this.Event.unsubscribe(this.OnEvent);
    }
}