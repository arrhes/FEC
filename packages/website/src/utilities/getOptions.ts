export function getOptions<T extends { [key: string]: string }>(object: T) {
    const options = []
    for (const key in object) {
        options.push({
            key: key,
            label: object[key],
        })
    }
    return options
}
