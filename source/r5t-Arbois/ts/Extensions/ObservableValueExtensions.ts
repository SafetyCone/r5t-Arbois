import { ObservableValue, ObservableValueBase } from "../Classes/ObservableValue";

export class ObservableValueExtensions
{
    public static ResetValue<TValue>(observable: ObservableValue<TValue>,
        setIsSynchronous: boolean = ObservableValue.DefaultSetIsSynchronous,
        changeIsSynchronous: boolean = ObservableValue.DefaultSetIsSynchronous)
    {
        observable.Set(ObservableValueBase.DefaultValue, setIsSynchronous, changeIsSynchronous);
    }

    public static ResetValueWithEvents<TValue>(observable: ObservableValue<TValue>)
    {
        observable.SetWithoutEvents(ObservableValueBase.DefaultValue);
    }

    public static SetSynchronous<TValue>(observable: ObservableValue<TValue>, value: TValue)
    {
        observable.Set(value, true, true);
    }

    public static SetAsynchronous<TValue>(observable: ObservableValue<TValue>, value: TValue)
    {
        observable.Set(value, false, false);
    }

    /**
     * Set() method chooses asynchronous method as default.
     */
    public static Set<TValue>(observable: ObservableValue<TValue>, value: TValue)
    {
        ObservableValueExtensions.SetAsynchronous(observable, value);
    }
}