import { useEffect, useState } from "react"

export function useDeviceDetect() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (!window) return

        // const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent
        // const mobileDevice = !!userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
        const mobileMedia = window.innerWidth < 768 || window.outerWidth < 768

        setIsMobile(mobileMedia)
        window.addEventListener("resize", () => {
            setIsMobile(mobileMedia)
        })
        return () => {
            window.removeEventListener("resize", () => {
                setIsMobile(false)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { isMobile }
}
