import { IValueChangedNotifier } from "./ValueChangedNotifier";

export class ValueChangedNotifierGroupAction
{
    constructor(private Values: Array<IValueChangedNotifier>, private Action: () => void)
    {
        for (const value of this.Values) {
            value.OnValueChangedSignal.subscribe(() => this.OnGroupElementChanged());
        }
    }

    private OnGroupElementChanged()
    {
        this.Action();
    }
}