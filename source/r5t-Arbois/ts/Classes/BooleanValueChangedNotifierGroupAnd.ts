import { ValueChangedNotifier } from "./ValueChangedNotifier";

export class BooleanValueChangedNotifierGroupAnd extends ValueChangedNotifier<boolean>
{
    constructor(private Values: Array<ValueChangedNotifier<boolean>>, initialValue: boolean = false)
    {
        super(initialValue);

        for (const value of this.Values)
        {
            value.OnValueChanged.subscribe(() => this.OnGroupElementChanged());
        }
    }

    private OnGroupElementChanged()
    {
        this.ComputeValue();
    }

    private ComputeValue()
    {
        for (const value of this.Values)
        {
            if(!value.Value)
            {
                this.Value = false;
                return;
            }
        }

        this.Value = true;
    }
}