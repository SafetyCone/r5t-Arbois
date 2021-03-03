import { StringHelper } from "r5t-Avignon";


export class TextAreaWrapper
{
    private zTextAreaHtmlElement : HTMLTextAreaElement;
    public get TextAreaHtmlElement() : HTMLTextAreaElement {
        return this.zTextAreaHtmlElement;
    }
    public set TextAreaHtmlElement(v : HTMLTextAreaElement) {
        this.zTextAreaHtmlElement = v;
    }

    public get Value(): string
    {
        // I always forget how to get the value of a textarea. Is it value, innerText, innerHtml?
        let output = this.zTextAreaHtmlElement.value;
        return output;
    }
    public set Value(value: string)
    {
        this.zTextAreaHtmlElement.value = value;

        // Trigger the change event, as it should be!
        let changeEvent = new Event("change");

        this.zTextAreaHtmlElement.dispatchEvent(changeEvent);
    }


    constructor(textAreaHtmlElement: HTMLTextAreaElement)
    {
        this.TextAreaHtmlElement = textAreaHtmlElement;
    }


    public HasValue(): boolean
    {
        let hasValue = StringHelper.IsNonEmpty(this.zTextAreaHtmlElement.value);
        return hasValue;
    }
}