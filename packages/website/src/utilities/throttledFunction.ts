export function throttledFunction(parameters: { function: () => void | Promise<void>; delay?: number }) {
    let timeoutId: string | number | NodeJS.Timeout | undefined

    return async () => {
        if (timeoutId === undefined) {
            await parameters.function()
            timeoutId = setTimeout(() => {
                timeoutId = undefined
            }, parameters.delay ?? 300)
        }
    }
}
