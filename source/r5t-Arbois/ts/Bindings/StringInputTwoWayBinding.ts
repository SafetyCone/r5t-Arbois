import { HtmlInputableElement } from "../Types/HtmlInputableElement";
import { HtmlInputableStringTwoWayChangeBinding } from "./HtmlInputableStringTwoWayChangeBinding";

export class StringInputTwoWayBinding<TElement extends HtmlInputableElement>
    extends HtmlInputableStringTwoWayChangeBinding<TElement>
{
}