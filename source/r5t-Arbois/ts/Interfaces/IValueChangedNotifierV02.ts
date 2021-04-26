import { ISignal } from "ste-signals";

export interface IValueChangedNotifierV02<T>
{
    OnValueChanged: ISignal;
    Value: T;
}