export function compareAmounts(parameters: { a: number; b: number }) {
    if (Math.abs(parameters.a - parameters.b) < 0.009) return true
    return false
}
