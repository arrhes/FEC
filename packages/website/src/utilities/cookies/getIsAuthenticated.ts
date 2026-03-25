import { cookiePrefix } from "../variables.js"
import { getCookie } from "./getCookie.js"

export function getIsAuthenticated() {
    const isAuthenticatedRaw = getCookie(`${cookiePrefix}_${"is_auth"}`)

    if (isAuthenticatedRaw === "true") return true
    if (isAuthenticatedRaw === "false") return false

    return undefined
}
