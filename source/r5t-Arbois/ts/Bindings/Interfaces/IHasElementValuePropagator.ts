import { IValuePropagator } from "./IValuePropagator";

export interface IHasElementValuePropagator<TElement extends HTMLElement> extends IValuePropagator
{
    Element: TElement;
}