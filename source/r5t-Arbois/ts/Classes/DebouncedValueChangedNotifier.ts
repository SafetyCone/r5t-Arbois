import { ISignal, SignalDispatcher } from "ste-signals";

import { IValueChangedNotifierV02 } from "../Interfaces/IValueChangedNotifierV02";
import { SignalDebouncer } from "./SignalDebouncer";

/**
 * A wrapper that debounces a value changed notifier.
 * Synchronous dispatch of value changed event.
 */
export class DebouncedValueChangedNotifier<T> implements IValueChangedNotifierV02<T>
{
    private zOnValueChanged = new SignalDispatcher();
    public get OnValueChanged(): ISignal
    {
        return this.zOnValueChanged.asEvent();
    }
    private FireOnValueChanged()
    {
        // Choose synchronous dispatch.
        this.zOnValueChanged.dispatch();
    }

    public get Value(): T
    {
        let value = this.ValueSource.Value;
        return value;
    }

    private readonly SignalDebouncer: SignalDebouncer;


    constructor(
        private readonly ValueSource: IValueChangedNotifierV02<T>,
        private readonly TimeoutMilliseconds = SignalDebouncer.DefaultTimeoutMilliseconds,
    )
    {
        this.SignalDebouncer = new SignalDebouncer(this.ValueSource.OnValueChanged, this.TimeoutMilliseconds);

        this.Attach();
    }

    private Attach()
    {
        this.SignalDebouncer.OnDebouncedSignal.subscribe(() => this.OnDebouncedSignalHandler());
    }

    private OnDebouncedSignalHandler()
    {
        this.FireOnValueChanged();
    }
}