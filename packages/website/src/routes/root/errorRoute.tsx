import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { rootLayoutRoute } from "../rootLayoutRoute.js"

export const errorRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/error",
    beforeLoad: () => ({
        title: "Error",
        robots: "noindex",
    }),
    component: lazyRouteComponent(() => import("../../features/error/errorPage.js"), "ErrorPage"),
})
