import { IHasValueChangedNotifierValuePropagator } from "../Bindings/Interfaces/IHasValueChangedNotifierValuePropagator";
import { IValuePropagatorExtensions } from "./IValuePropagatorExtensions";

export class IHasValueChangedNotifierValuePropagatorExtensions
{
    public static SetValueAndFireEvents<TValue>(hasValue: IHasValueChangedNotifierValuePropagator<TValue>, value: TValue)
    {
        hasValue.ValueChangedNotifier.Value = value; // Will fire events.
    }

    /**
     * Allows changing the value and blocking propagation.
     */
    public static SetValueSkipPropagation<TValue>(hasValue: IHasValueChangedNotifierValuePropagator<TValue>, value: TValue)
    {
        IValuePropagatorExtensions.InPropagationBlockedContext(hasValue, () =>
        {
            IHasValueChangedNotifierValuePropagatorExtensions.SetValueAndFireEvents(hasValue, value);
        });
    }

    /**
     * Allows changing the value and ensuring propagation.
     */
    public static SetValueWithPropagation<TValue>(hasValue: IHasValueChangedNotifierValuePropagator<TValue>, value: TValue)
    {
        IValuePropagatorExtensions.InPropagationAllowedContext(hasValue, () =>
        {
            IHasValueChangedNotifierValuePropagatorExtensions.SetValueAndFireEvents(hasValue, value);
        });
    }

    /**
     * Allows changing the value and uses the value's current propagation setting.
     */
    public static SetValueCurrentPropagation<TValue>(hasValue: IHasValueChangedNotifierValuePropagator<TValue>, value: TValue)
    {
        IHasValueChangedNotifierValuePropagatorExtensions.SetValueAndFireEvents(hasValue, value);
    }

    /**
     * Allows changing the value and uses the value's current propagation setting. Chooses using the current propagation setting as the default.
     */
    public static SetValue<TValue>(hasValue: IHasValueChangedNotifierValuePropagator<TValue>, value: TValue)
    {
        IHasValueChangedNotifierValuePropagatorExtensions.SetValueCurrentPropagation(hasValue, value);
    }
}