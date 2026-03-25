import * as v from "valibot"

export class ClientError {
    message?: string
    cause?: string
    stack?: string

    constructor(props: {
        message?: string
        cause?: string
        rawError?: unknown
    }) {
        if (props.rawError instanceof ClientError) {
            this.message = props.rawError.message
            this.cause = props.rawError.cause
            this.stack = props.rawError.stack
            return
        }

        this.message =
            props.message !== undefined
                ? props.message
                : props.rawError instanceof Error
                  ? props.rawError.message
                  : "Unknown error"

        this.cause =
            props.cause === undefined
                ? props.rawError instanceof Error
                    ? String(props.rawError.cause)
                    : props.rawError instanceof String
                      ? JSON.parse(String(props.rawError))
                      : props.rawError
                : props.rawError instanceof v.ValiError
                  ? v.flatten(props.rawError.issues)
                  : props.cause

        this.stack = props.rawError instanceof Error ? props.rawError.stack : new Error().stack

        if (import.meta.env.VITE_ENV === "development") {
            console.trace({
                message: this.message,
                cause: this.cause,
            })
        }
    }
}
