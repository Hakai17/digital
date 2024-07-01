import {
  configureScope,
  init,
  reactRouterV6Instrumentation,
} from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { Buffer } from "buffer";
import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import App from "./App";

globalThis.Buffer = Buffer;

init({
  dsn: "https://0821aa2f56d91e9f7e21b90d9cb9ff7f@o4505229425770496.ingest.sentry.io/4505989626068992",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: reactRouterV6Instrumentation(
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      ),
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  environment: import.meta.env.VITE_ENV_NAME,
});

configureScope(scope => {
  scope.setLevel("warning");
});

createRoot(document.getElementById("root")).render(<App />);
