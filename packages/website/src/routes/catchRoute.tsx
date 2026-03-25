import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { rootLayoutRoute } from "./rootLayoutRoute.js"

export const catchRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "$",
    beforeLoad: () => ({
        title: "Page introuvable",
        description: "La page que vous recherchez n'existe pas ou a été déplacée.",
        robots: "noindex",
    }),
    component: lazyRouteComponent(() => import("../features/notFound/notFoundPage.js"), "NotFoundPage"),
})
