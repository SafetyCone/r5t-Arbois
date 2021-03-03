import { Task, TaskHelper } from "r5t-Avignon";

import { ValueChangedNotifier } from "./ValueChangedNotifier";

export class ValueAwaiter
{
    public static async AwaitValue<T>(
        value: ValueChangedNotifier<T>,
        ifAwaiting: Task = TaskHelper.DefaultTask)
        : Promise<T>
    {
        if(value.HasValue)
        {
            return value.Value;
        }
        else
        {
            // Create the promise.
            let promise = new Promise<T>((resolve) =>
            {
                // Create the closure to handle the value changed event.
                let fn = (arg: T) =>
                {
                    // Unsubscribe so this happens only once.
                    // This should allow the close to be garbage collected.
                    value.OnValueChanged.unsubscribe(fn);

                    resolve(arg);
                };

                // Subscribe to the value changed event.
                value.OnValueChanged.subscribe(fn);
            });

            // If we are awaiting the value, let people know.
            await ifAwaiting();

            // Return the promise.
            return promise;
        }
    }
}