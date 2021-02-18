export class EllipsisStatusParagraph
{
    public static readonly DefaultIntervalMilliseconds = 400;
    public static readonly MaxIncrement = 3;


    private zIncrement: number;
    private zInterval: number;


    constructor(public ParagraphElement: HTMLParagraphElement, public IntervalMilliseconds: number = EllipsisStatusParagraph.DefaultIntervalMilliseconds)
    {
        this.zInterval = IntervalMilliseconds;
    }

    public Start()
    {
        this.ResetIncrement();

        this.zInterval = setInterval(() => this.Increment(), this.IntervalMilliseconds);
    }

    private ResetIncrement()
    {
        this.zIncrement = 0;
    }

    private Increment()
    {
        let paragraphValue = this.ParagraphElement.innerText;

        this.zIncrement++;

        if(this.zIncrement > EllipsisStatusParagraph.MaxIncrement)
        {
            this.ResetIncrement();

            this.ParagraphElement.innerText = paragraphValue.slice(0, paragraphValue.length - EllipsisStatusParagraph.MaxIncrement);
        }
        else
        {
            this.ParagraphElement.innerText = paragraphValue + ".";
        }
    }

    public Stop()
    {
        clearInterval(this.zInterval);

        // Reset the text.
        let paragraphValue = this.ParagraphElement.innerText;
        this.ParagraphElement.innerText = paragraphValue.slice(0, paragraphValue.length - this.zIncrement);
    }
}