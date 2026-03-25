export function getCookie(name: string) {
    const stringCookies = document?.cookie?.split("; ")
    const cookie = stringCookies?.find((x) => x.includes(name))
    if (cookie === undefined || cookie === "") return undefined

    const cookieValue = cookie.split("=").at(1)
    if (cookieValue === undefined || cookieValue === "") return undefined

    return cookieValue
}
