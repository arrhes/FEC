const romanMatrix: { [key: number]: string } = {
    1000: "M",
    900: "CM",
    500: "D",
    400: "CD",
    100: "C",
    90: "XC",
    50: "L",
    40: "XL",
    10: "X",
    9: "IX",
    5: "V",
    4: "IV",
    1: "I",
}

export function toRoman(number: number): string {
    if (number === 0) return ""
    const keys = Object.keys(romanMatrix).sort((a, b) => Number(b) - Number(a))
    for (const key of keys) {
        if (number >= Number(key)) {
            return romanMatrix[Number(key)] + toRoman(number - Number(key))
        }
    }
    return ""
}
