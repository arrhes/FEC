import { css } from "../../../styled-system/css/css"

export function ErrorPage() {
    return (
        <div
            className={css({
                width: "100%",
                height: "100%",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            })}
        >
            <p className={css({ color: "red", fontSize: "0.875rem" })}>Une erreur est survenue.</p>
        </div>
    )
}
