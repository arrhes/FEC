function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function sleep(timer: number) {
    await timeout(timer)
    return
}
