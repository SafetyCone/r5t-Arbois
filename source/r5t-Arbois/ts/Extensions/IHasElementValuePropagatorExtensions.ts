import { ActionOn, EventHelper, HtmlElementEvent } from "r5t-Avignon";

import { IHasElementValuePropagator } from "../Bindings/Interfaces/IHasElementValuePropagator";
import { IValuePropagatorExtensions } from "./IValuePropagatorExtensions";

export class IHasElementValuePropagatorExtensions
{
    public static PerformActionAndDispatchEvent<TElement extends HTMLElement>(hasElement: IHasElementValuePropagator<TElement>, action: ActionOn<TElement>,
        event: HtmlElementEvent = "change")
    {
        action(hasElement.Element);

        EventHelper.DispatchEvent(hasElement.Element, event);
    }

    /**
     * Allows changing the has-element's element and blocking propagation.
     */
    public static ElementActionSkipPropagation<TElement extends HTMLElement>(hasElement: IHasElementValuePropagator<TElement>, action: ActionOn<TElement>,
        event: HtmlElementEvent = "change")
    {
        IValuePropagatorExtensions.InPropagationBlockedContext(hasElement, () =>
        {
            IHasElementValuePropagatorExtensions.PerformActionAndDispatchEvent(hasElement, action, event);
        });
    }

    /**
     * Allows changing the has-element's element and ensuring propagation.
     */
    public static ElementActionWithPropagation<TElement extends HTMLElement>(hasElement: IHasElementValuePropagator<TElement>, action: ActionOn<TElement>,
        event: HtmlElementEvent = "change")
    {
        IValuePropagatorExtensions.InPropagationAllowedContext(hasElement, () =>
        {
            IHasElementValuePropagatorExtensions.PerformActionAndDispatchEvent(hasElement, action, event);
        });
    }

    /**
     * Allows changing the has-element's element using the current propagation settting of the has-element.
     */
    public static ElementActionCurrentPropagation<TElement extends HTMLElement>(hasElement: IHasElementValuePropagator<TElement>, action: ActionOn<TElement>,
        event: HtmlElementEvent = "change")
    {
        IHasElementValuePropagatorExtensions.PerformActionAndDispatchEvent(hasElement, action, event);
    }

    /**
     * Allows changing the has-element's element. Chooses the current propagation setting of the has-element as the default.
     */
    public static ElementAction<TElement extends HTMLElement>(hasElement: IHasElementValuePropagator<TElement>, action: ActionOn<TElement>)
    {
        IHasElementValuePropagatorExtensions.ElementActionCurrentPropagation(hasElement, action);
    }
}