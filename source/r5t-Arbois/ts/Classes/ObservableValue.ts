import { SimpleEventDispatcher, ISimpleEvent, ISignal, SignalDispatcher } from "strongly-typed-events";

/**
 * Changed event is fired before set.
 */
export abstract class ObservableValueBase
{
    public static readonly DefaultValue = undefined;
    public static readonly DefaultSetIsSynchronous = false;
    public static readonly DefaultChangedIsSynchronous = false;


    protected zOnChangedSignal = new SignalDispatcher();
    /**
     * Event occurs when value has been changed from it's prior value (not just set, but the value actually changed).
     */
    public get OnChangedSignal(): ISignal
    {
        return this.zOnChangedSignal.asEvent();
    }

    protected zOnSetSignal = new SignalDispatcher();
    /**
     * Event occurs when the value is set, even if the value is set to the same value.
     */
    public get OnSetSignal(): ISignal
    {
        return this.zOnSetSignal.asEvent();
    }

    public abstract get HasValue(): boolean;
}

export class ObservableValue<TValue> extends ObservableValueBase
{
    private zOnChanged = new SimpleEventDispatcher<TValue>();
    /**
     * Event occurs when value has been changed from it's prior value (not just set, but the value actually changed).
     */
    public get OnChanged(): ISimpleEvent<TValue>
    {
        return this.zOnChanged.asEvent();
    }

    private zOnSet = new SimpleEventDispatcher<TValue>();
    /**
     * Event occurs when the value is set, even if the value is set to the same value.
     */
    public get OnSet(): ISimpleEvent<TValue>
    {
        return this.zOnSet.asEvent();
    }


    private zValue: TValue;
    public get Value(): TValue
    {
        return this.zValue;
    }
    public set Value(value: TValue)
    {
        this.Set(value);
    }

    public get HasValue(): boolean
    {
        let hasValue = this.zValue !== ObservableValueBase.DefaultValue;
        return hasValue;
    }


    public constructor(value: TValue = ObservableValueBase.DefaultValue)
    {
        super();
        
        this.zValue = value;
    }

    public Get(): TValue
    {
        return this.Value;
    }

    public Set(value: TValue,
        setIsSynchronous: boolean = ObservableValue.DefaultSetIsSynchronous,
        changeIsSynchronous: boolean = ObservableValue.DefaultSetIsSynchronous)
    {
        let valueChanged = this.zValue != value;

        this.SetWithoutEvents(value);

        // Changed.
        if(valueChanged)
        {
            if(changeIsSynchronous)
            {
                this.zOnChangedSignal.dispatch();
                this.zOnChanged.dispatch(this.zValue);
            }
            else
            {
                // Asynchronous by default.
                this.zOnChangedSignal.dispatchAsync();
                this.zOnChanged.dispatchAsync(this.zValue);
            }
        }

        // Set.
        if(setIsSynchronous)
        {
            this.zOnSetSignal.dispatch();
            this.zOnSet.dispatch(this.zValue);
        }
        else
        {
            // Asynchronous by default.
            this.zOnSetSignal.dispatchAsync();
            this.zOnSet.dispatchAsync(this.zValue);
        }
    }

    public SetWithoutEvents(value: TValue)
    {
        this.zValue = value;
    }
}