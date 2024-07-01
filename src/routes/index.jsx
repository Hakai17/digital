import { withSentryReactRouterV6Routing } from "@sentry/react";
import { Routes } from "react-router-dom";

export { PrivateRoute } from "./PrivateRoute";
export { Routes } from "./Routes";

export const SentryRoutes = withSentryReactRouterV6Routing(Routes);
