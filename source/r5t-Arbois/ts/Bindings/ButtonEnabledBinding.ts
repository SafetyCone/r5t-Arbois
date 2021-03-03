import { ValueChangedNotifier } from "../Classes/ValueChangedNotifier";

export class ButtonEnabledBinding
{
    constructor(
        private readonly Button: HTMLButtonElement,
        private ButtonEnabled: ValueChangedNotifier<boolean>)
    {
        this.ButtonEnabled.OnValueChanged.subscribe((value) => this.OnValueChanged(value));
    }

    private OnValueChanged(value: boolean)
    {
        this.Button.disabled = !value;
    }
}