import { ValueChangedNotifier } from "../../Classes/ValueChangedNotifier";
import { IValuePropagator } from "./IValuePropagator";

export interface IHasValueChangedNotifierValuePropagator<TValue> extends IValuePropagator
{
    ValueChangedNotifier: ValueChangedNotifier<TValue>
}