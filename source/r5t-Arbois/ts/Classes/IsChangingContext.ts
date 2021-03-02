import { Action } from "r5t-Avignon/Index";

/**
 * Useful in two-way bindings to prevent element => value => element => value ... change propagation loops.
 */
export class IsChangingContext
{
    public static readonly DefaultInitialIsChangingValue = false;


    private zIsChanging: boolean;
    public get IsChanging(): boolean
    {
        return this.zIsChanging;
    }
    private SetIsChanging(value: boolean)
    {
        this.zIsChanging = value;
    }


    constructor(
        initialIsChangingValue: boolean = IsChangingContext.DefaultInitialIsChangingValue
    )
    {
        this.zIsChanging = initialIsChangingValue;
    }

    public ExecuteInContext(action: Action)
    {
        if(this.IsChanging)
        {
            return;
        }

        // Allow restoring the prior value not just false.
        let priorValue = this.IsChanging;

        this.SetIsChanging(true);

        action();

        this.SetIsChanging(priorValue);   
    }
}