import { ValueChangedNotifier } from "../Classes/ValueChangedNotifier";

export class ButtonEnabledBinding
{
    constructor(private Button: HTMLButtonElement, private BooleanValueChangedNotifier: ValueChangedNotifier<boolean>)
    {
        this.BooleanValueChangedNotifier.OnValueChanged.subscribe((value) => this.OnValueChanged(value));
    }

    private OnValueChanged(value: boolean)
    {
        this.Button.disabled = !value;
    }
}