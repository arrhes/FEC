import {
    type ComponentProps,
    createContext,
    type MouseEvent,
    type ReactNode,
    useContext,
    useRef,
    useState,
} from "react"
import { css } from "../../../styled-system/css/css"
import { cx } from "../../../styled-system/css/cx"
import { sleep } from "../../utilities/sleep.ts"

/**
 * Context for passing loading state from Button to ButtonContent
 */
const ButtonLoadingContext = createContext<boolean>(false)

/**
 * Hook to access the loading state from a parent Button
 * Returns false if not within a Button context
 */
export function useButtonLoading() {
    return useContext(ButtonLoadingContext)
}

/**
 * Button component - a neutral container for clickable elements
 * Handles click events, loading state, and disabled state
 * Use composition with ButtonContent for styled button content
 *
 * @example
 * <Button onClick={handleClick} hasLoader>
 *   <ButtonPlain text="Submit" />
 * </Button>
 */
export function Button(
    props: Omit<ComponentProps<"button">, "children" | "disabled"> & {
        hasLoader?: boolean
        children: ReactNode
        title?: string
        isDisabled?: boolean
    },
) {
    const [isLoading, setIsLoading] = useState(false)
    const isLoadingRef = useRef(false)

    async function handleClick(e: MouseEvent<HTMLButtonElement>) {
        if (props.onClick === undefined) return
        if (!props.hasLoader) {
            props.onClick(e)
            return
        }

        if (isLoadingRef.current) return
        isLoadingRef.current = true
        setIsLoading(true)

        try {
            await Promise.all([sleep(100), props.onClick(e)])
        } finally {
            isLoadingRef.current = false
            setIsLoading(false)
        }
    }

    const { hasLoader, className, isDisabled, title, children, onClick: _onClick, ...buttonProps } = props

    return (
        <ButtonLoadingContext.Provider value={isLoading}>
            <button
                {...buttonProps}
                ref={props.ref}
                className={cx(
                    css({
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        cursor: "pointer",
                        width: "fit-content",
                        maxWidth: "100%",
                        height: "fit-content",
                        maxHeight: "fit-content",
                        bg: "transparent",
                        border: "none",
                        padding: "0",
                        _disabled: { cursor: "not-allowed", pointerEvents: "none" },
                    }),
                    className,
                )}
                onClick={handleClick}
                type={props.type ?? "button"}
                disabled={props.isDisabled || isLoading}
                title={title}
            >
                {children}
            </button>
        </ButtonLoadingContext.Provider>
    )
}
