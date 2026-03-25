import { css } from "../../../styled-system/css/css"
import { cx } from "../../../styled-system/css/cx"

export function LinkContent(props: { disabled?: boolean; children?: string; className?: string }) {
    return (
        <span
            aria-disabled={props.disabled}
            className={cx(
                css({
                    color: "primary",
                    textDecoration: "underline",
                    cursor: "pointer",
                    _hover: { textDecoration: "none" },
                    _disabled: { opacity: 0.3, cursor: "not-allowed" },
                }),
                props.className,
            )}
        >
            {props.children}
        </span>
    )
}
