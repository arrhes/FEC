export function setCookie(name: string, value: string) {
    document.cookie = `${name}=${value}; path=/; SameSite=Lax`
}
