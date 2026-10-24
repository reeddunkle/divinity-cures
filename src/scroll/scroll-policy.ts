import type { AnyRouter } from "@tanstack/react-router";

export type ScrollScope = "page" | "results";

const resultsId = "results";

export const routerScrollOptions: Pick<
  AnyRouter["options"],
  "scrollRestoration" | "scrollRestorationBehavior" | "scrollToTopSelectors"
> = {
  scrollRestoration: true,
  scrollRestorationBehavior: "instant",
  scrollToTopSelectors: ["#main", `#${resultsId}`],
};

const pendingResultsResets = new WeakSet<AnyRouter>();

export const installScrollPolicy = (router: AnyRouter) =>
  router.subscribe("onRendered", () => {
    if (pendingResultsResets.delete(router)) {
      document.getElementById(resultsId)?.scrollTo({ behavior: "instant", top: 0 });
    }
  });

export const scrollNavigationOptions = (router: AnyRouter, scope: ScrollScope) => {
  if (scope === "page") {
    return { resetScroll: true };
  }

  pendingResultsResets.add(router);

  return { resetScroll: false };
};
