import type { AnyRouter } from "@tanstack/react-router";

export const mainId = "main";

const isFocusLost = () =>
  document.activeElement === null || document.activeElement === document.body;

export const installFocusPolicy = (router: AnyRouter) =>
  router.subscribe("onRendered", ({ fromLocation, hrefChanged, pathChanged }) => {
    if (fromLocation === undefined || !hrefChanged) {
      return;
    }

    if (pathChanged || isFocusLost()) {
      document.getElementById(mainId)?.focus({ preventScroll: true });
    }
  });
