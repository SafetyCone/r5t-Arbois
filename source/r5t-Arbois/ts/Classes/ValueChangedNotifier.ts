import { SimpleEventDispatcher, ISimpleEvent, ISignal, SignalDispatcher } from "strongly-typed-events";

export interface IValueChangedNotifier
{
    OnValueChangedSignal: ISignal;
}

export abstract class ValueChangedNotifierBase implements IValueChangedNotifier
{
    protected zOnValueChangedSignal = new SignalDispatcher();
    public get OnValueChangedSignal(): ISignal
    {
        return this.zOnValueChangedSignal.asEvent();
    }

    public abstract get HasValue(): boolean;
}

export class ValueChangedNotifier<T> extends ValueChangedNotifierBase
{
    private zValue: T;
    public get Value(): T
    {
        return this.zValue;
    }
    public set Value(value: T)
    {
        this.SetValue(value);
    }

    public get HasValue(): boolean
    {
        let hasValue = this.zValue !== undefined;
        return hasValue;
    }

    private zOnValueChanged = new SimpleEventDispatcher<T>();
    public get OnValueChanged(): ISimpleEvent<T>
    {
        return this.zOnValueChanged.asEvent();
    }


    public constructor(value: T = undefined)
    {
        super();
        
        this.zValue = value;
    }

    public ClearValue(): void
    {
        this.Value = undefined;
    }

    /**
     * Sets the value and, if the value is changed, dispatches the changed event synchronously.
     * This is useful when you do not want to add an asynchronous continuation to whatever is changed by the changing the value.
     */
    public SetValueIfChangedSynchronous(value: T)
    {
        let valueChanged = this.zValue != value;

        this.zValue = value;

        if(valueChanged)
        {
            this.zOnValueChangedSignal.dispatch();
            this.zOnValueChanged.dispatch(this.zValue);
        }
    }

    /**
     * Sets the value and, if the value is changed, dispatches the changed event asynchronously.
     * This should be the default behavior since DOM events are all asynchronous.
     */
    public SetValueIfChangedAsynchronous(value: T)
    {
        let valueChanged = this.zValue != value;

        this.zValue = value;

        if(valueChanged)
        {
            this.zOnValueChangedSignal.dispatchAsync();
            this.zOnValueChanged.dispatchAsync(this.zValue);
        }
    }

    /**
     * Uses the -Asynchronous() set method as the default.
     */
    public SetValue(value: T)
    {
        this.SetValueIfChangedAsynchronous(value);
    }

    public SetSync(value: T)
    {
        this.SetValueIfChangedSynchronous(value);
    }

    public SetAsync(value: T)
    {
        this.SetValueIfChangedAsynchronous(value);
    }

    /**
     * Uses the -Async() set method as the default.
     */
    public Set(value: T)
    {
        this.SetAsync(value);
    }
}