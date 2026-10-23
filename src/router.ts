import { createRouter, type RouterHistory } from "@tanstack/react-router";

import { NotFound, RouteError } from "./components/route-fallbacks.tsx";
import { routeTree } from "./routeTree.gen.ts";
import { parseSearch, stringifySearch } from "./url-state/search-params.ts";

export type AppRouterOptions = {
  readonly history?: RouterHistory;
  readonly isServer?: boolean;
  readonly origin?: string;
  readonly scrollRestoration?: boolean;
};

export const createAppRouter = (options: AppRouterOptions = {}) =>
  createRouter({
    defaultErrorComponent: RouteError,
    defaultNotFoundComponent: NotFound,
    defaultPreload: "intent",
    scrollRestoration: true,
    ...options,
    parseSearch,
    routeTree,
    stringifySearch,
  });

export type AppRouter = ReturnType<typeof createAppRouter>;

export const prepareForHydration = (router: AppRouter) => {
  router.ssr = { manifest: undefined };
};

export const prerenderKey = (router: AppRouter) =>
  router.state.matches.some((match) => match._notFound === true)
    ? "not-found"
    : router.state.location.href;

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createAppRouter>;
  }
}
