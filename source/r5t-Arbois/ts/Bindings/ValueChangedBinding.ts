import { ValueChangedNotifier } from "../Classes/ValueChangedNotifier";

/**
 * One-way binding from value to HTML element.
 */
export class ValueChangedBinding<TValue, T>
{
    constructor(
        public readonly ValueToWatch: ValueChangedNotifier<TValue>,
        public readonly ValueToChange: T,
        private readonly Modifier: (value: TValue, htmlElement: T) => void
    )
    {
        this.ValueToWatch.OnValueChanged.subscribe(x => this.OnValueChanged(x));
    }

    private OnValueChanged(value: TValue)
    {
        this.Modifier(value, this.ValueToChange);
    }
}