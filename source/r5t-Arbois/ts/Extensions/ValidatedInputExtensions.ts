import { ActionOn, EventHelper, HtmlElementEvent } from "r5t-Avignon";

import { ValidatedInput } from "../Components/ValidatedInput";
import { HtmlInputableElement } from "../Types/HtmlInputableElement";

export class ValidatedInputExtensions
{
    /**
     * Allows changing the validated input's element without causing validation to fire.
     */
    public static InUnvalidatedContext<TElement extends HtmlInputableElement>(validatedInput: ValidatedInput<TElement>, action: ActionOn<TElement>)
    {
        // Allow restoring the prior value, nost just false.
        let priorValue = validatedInput.ValidationDisabled;

        validatedInput.ValidationDisabled = true;

        let postAction = () =>
        {
            validatedInput.OnValiationSkipped.unsubscribe(postAction);

            validatedInput.ValidationDisabled = priorValue;
        };
        validatedInput.OnValiationSkipped.subscribe(postAction);

        action(validatedInput.HtmlElement);
    }

    /**
     * Allows changing the validated input's element while ensuring validation will fire.
     */
    public static InValidatedContext<TElement extends HtmlInputableElement>(validatedInput: ValidatedInput<TElement>, action: ActionOn<TElement>)
    {
        // Allow restoring the prior value, nost just true.
        let priorValue = validatedInput.ValidationDisabled;

        validatedInput.ValidationDisabled = false;

        let postAction = () =>
        {
            validatedInput.OnValiationSkipped.unsubscribe(postAction);

            validatedInput.ValidationDisabled = priorValue;
        };
        validatedInput.OnValiationSkipped.subscribe(postAction);

        action(validatedInput.HtmlElement);
    }

    public static SetValueAndDispatchEvent<TElement extends HtmlInputableElement>(validatedInput: ValidatedInput<TElement>, value: string,
        event: HtmlElementEvent = "change")
    {
        validatedInput.HtmlElement.value = value;

        EventHelper.DispatchEvent(validatedInput.HtmlElement, event);
    }

    /**
     * Allows setting the value of a validated input, skipping validation, but still firing a synthetic change event to allow all other code to update.
     */
    public static SetValueSkipValidation<TElement extends HtmlInputableElement>(validatedInput: ValidatedInput<TElement>, value: string,
        event: HtmlElementEvent = "change")
    {
        ValidatedInputExtensions.InUnvalidatedContext(validatedInput, () =>
        {
            ValidatedInputExtensions.SetValueAndDispatchEvent(validatedInput, value, event);
        });
    }

    /**
     * Allows setting the value of a validated input with validation.
     */
    public static SetValueWithValidation<TElement extends HtmlInputableElement>(validatedInput: ValidatedInput<TElement>, value: string,
        event: HtmlElementEvent = "change")
    {
        ValidatedInputExtensions.InValidatedContext(validatedInput, () =>
        {
            ValidatedInputExtensions.SetValueAndDispatchEvent(validatedInput, value, event);
        });
    }

    /**
     * Allows setting the value of a validated input using the current validation setting of the validated input.
     */
    public static SetValueCurrentValidation<TElement extends HtmlInputableElement>(validatedInput: ValidatedInput<TElement>, value: string,
        event: HtmlElementEvent = "change")
    {
        ValidatedInputExtensions.SetValueAndDispatchEvent(validatedInput, value, event);
    }

    /**
     * Allows setting the value of a validated input. Chooses using the current validation setting as the default.
     */
    public static SetValue<TElement extends HtmlInputableElement>(validatedInput: ValidatedInput<TElement>, value: string,
        event: HtmlElementEvent = "change")
    {
        ValidatedInputExtensions.SetValueCurrentValidation(validatedInput, value, event);
    }
}