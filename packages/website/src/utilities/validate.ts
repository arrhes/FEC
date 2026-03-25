import * as v from "valibot"
import { ClientError } from "./clientError.js"

type Validate<T extends v.GenericSchema<unknown, unknown>> = {
    schema: T
    data: v.InferOutput<T>
}

export function validate<T extends v.GenericSchema<unknown, unknown>>(parameters: Validate<T>) {
    const parsedData = v.safeParse(parameters.schema, parameters.data)

    if (parsedData.issues === undefined) {
        return <const>{
            success: true,
            data: parsedData.output,
            error: undefined,
        }
    }

    return <const>{
        success: false,
        data: undefined,
        error: new ClientError({
            message: "Error with the data validation",
            rawError: parsedData.issues,
        }),
    }
}
