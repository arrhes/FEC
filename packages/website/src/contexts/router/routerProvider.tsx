import { RouterProvider as Router } from "@tanstack/react-router"
import { applicationRouter } from "../../routes/applicationRouter.js"

export function RouterProvider() {
    return <Router router={applicationRouter} />
}
