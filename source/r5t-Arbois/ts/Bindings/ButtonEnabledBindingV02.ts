import { ObservableValue } from "../Classes/ObservableValue";

export class ButtonEnabledBindingV02
{
    constructor(
        private readonly Button: HTMLButtonElement,
        private ButtonEnabled: ObservableValue<boolean>)
    {
        this.ButtonEnabled.OnSet.subscribe((value) => this.OnButtonEnabledSet(value));
    }

    private OnButtonEnabledSet(value: boolean)
    {
        this.Button.disabled = !value;
    }
}