import { ValidatedInput } from "../../Components/ValidatedInput";
import { HtmlInputableElement } from "../../Types/HtmlInputableElement";
import { IValidatedValuePropagator } from "./IValidatedValuePropagator";

export interface IHasValidatedInputValuePropagator<TElement extends HtmlInputableElement> extends IValidatedValuePropagator
{
    ValidatedInput: ValidatedInput<TElement>;
}