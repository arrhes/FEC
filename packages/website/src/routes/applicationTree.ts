import type { AnyRoute } from "@tanstack/react-router"
import { catchRoute } from "./catchRoute.js"
import { homeLayoutRoute } from "./root/home/homeLayoutRoute.js"
import { homeRootRoute } from "./root/home/homeRootRoute.js"
import { legalRoute } from "./root/legal/legalRoute.js"
import { rootLayoutRoute } from "./rootLayoutRoute.js"

export const applicationTree: AnyRoute = rootLayoutRoute.addChildren([
    homeLayoutRoute.addChildren([homeRootRoute]),

    legalRoute,

    catchRoute,
])
