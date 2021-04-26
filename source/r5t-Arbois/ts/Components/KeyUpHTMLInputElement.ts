import { ISignal, SignalDispatcher } from "ste-signals";

import { IValueChangedNotifierV02 } from "../Interfaces/IValueChangedNotifierV02";

/**
 * Wraps an HTMLInputElement and provides a signal for the key-up event.
 * Synchronous dispatch of key-up event.
 * Implements value changed notification.
 */
export class KeyUpHTMLInputElement implements IValueChangedNotifierV02<string>
{
    private zOnValueChanged = new SignalDispatcher();
    public get OnValueChanged(): ISignal
    {
        return this.zOnValueChanged.asEvent();
    }
    private FireOnValueChanged()
    {
        // Choose synchronous dispatch.
        this.zOnValueChanged.dispatch();
    }

    public get Value(): string
    {
        let value = this.InputElement.value;
        return value;
    }


    constructor(
        public readonly InputElement: HTMLInputElement,
    )
    {
        this.Attach();
    }

    private Attach()
    {
        this.InputElement.addEventListener("keyup", () => this.OnKeyUp_Internal());
    }

    private OnKeyUp_Internal()
    {
        this.FireOnValueChanged();
    }
}