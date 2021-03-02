import { IHasValidatedInputValuePropagator } from "../Bindings/Interfaces/IHasValidatedInputValuePropagator";
import { HtmlInputableElement } from "../Types/HtmlInputableElement";
import { IValidatedValuePropagatorExtensions } from "./IValidatedValuePropagatorExtensions";
import { IValuePropagatorExtensions } from "./IValuePropagatorExtensions";
import { ValidatedInputExtensions } from "./ValidatedInputExtensions";

export class IHasValidatedInputValuePropagatorExtensions
{
    public static SetValueSkipValidationAndPropagation<TElement extends HtmlInputableElement>(hasValidatedInput: IHasValidatedInputValuePropagator<TElement>, value: string)
    {
        IValuePropagatorExtensions.InPropagationBlockedContext(hasValidatedInput, () =>
        {
            ValidatedInputExtensions.SetValueSkipValidation(hasValidatedInput.ValidatedInput, value);
        });
    }

    public static SetValueWithValidationSkipPropagation<TElement extends HtmlInputableElement>(hasValidatedInput: IHasValidatedInputValuePropagator<TElement>, value: string)
    {
        IValuePropagatorExtensions.InPropagationBlockedContext(hasValidatedInput, () =>
        {
            ValidatedInputExtensions.SetValueWithValidation(hasValidatedInput.ValidatedInput, value);
        });
    }

    public static SetValueSkipValidationWithPropagation<TElement extends HtmlInputableElement>(hasValidatedInput: IHasValidatedInputValuePropagator<TElement>, value: string)
    {
        IValidatedValuePropagatorExtensions.InAllowInvalidOrSkippedPropagationContext(hasValidatedInput, () =>
        {
            ValidatedInputExtensions.SetValueSkipValidation(hasValidatedInput.ValidatedInput, value);
        });
    }

    public static SetValueWithValidationAndPropagation<TElement extends HtmlInputableElement>(hasValidatedInput: IHasValidatedInputValuePropagator<TElement>, value: string)
    {
        IValuePropagatorExtensions.InPropagationAllowedContext(hasValidatedInput, () =>
        {
            ValidatedInputExtensions.SetValueWithValidation(hasValidatedInput.ValidatedInput, value);
        });
    }

    public static SetValueCurrentValidationAndPropagation<TElement extends HtmlInputableElement>(hasValidatedInput: IHasValidatedInputValuePropagator<TElement>, value: string)
    {
        ValidatedInputExtensions.SetValueCurrentValidation(hasValidatedInput.ValidatedInput, value);
    }

    /**
     * Allows setting the value of an inputable element, choosing using the current validation and propagation as the default behavior.
     */
    public static SetValue<TElement extends HtmlInputableElement>(hasValidatedInput: IHasValidatedInputValuePropagator<TElement>, value: string)
    {
        IHasValidatedInputValuePropagatorExtensions.SetValueCurrentValidationAndPropagation(hasValidatedInput, value);
    }
}