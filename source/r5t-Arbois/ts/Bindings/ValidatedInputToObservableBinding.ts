import { ObservableValue } from "../Classes/ObservableValue";
import { ValidatedInput } from "../Components/ValidatedInput";
import { HtmlInputableElement } from "../Types/HtmlInputableElement";

export class ValidatedInputToObservableBindingBase
{
    public static readonly DefaultSkippedIsValid = false;
}

export class ValidatedInputToObservableBinding<TElement extends HtmlInputableElement>
{
    constructor(
        public readonly ValidatedInput: ValidatedInput<TElement>,
        public readonly IsValidObservable: ObservableValue<boolean>,
        skippedIsValid: boolean = ValidatedInputToObservableBindingBase.DefaultSkippedIsValid)
    {
        this.ValidatedInput.OnValidationFinished.subscribe((validationResult) => this.OnValidation(validationResult.IsValid));
        this.ValidatedInput.OnValiationSkipped.subscribe(() => this.OnValidation(skippedIsValid));
    }

    private OnValidation(isValid: boolean)
    {
        this.IsValidObservable.Set(isValid);
    }
}