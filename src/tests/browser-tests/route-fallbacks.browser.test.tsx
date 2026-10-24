import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import { NotFound, RouteError } from "@/components/route-fallbacks.tsx";

const renderFailingRoute = async () => {
  let attempts = 0;

  const rootRoute = createRootRoute({ component: Outlet });
  const flakyRoute = createRoute({
    component: () => <p>Loaded</p>,
    getParentRoute: () => rootRoute,
    loader: () => {
      attempts += 1;

      if (attempts === 1) {
        throw new Error("First load fails");
      }
    },
    path: "/",
  });

  const router = createRouter({
    defaultErrorComponent: RouteError,
    defaultNotFoundComponent: NotFound,
    history: createMemoryHistory({ initialEntries: ["/"] }),
    routeTree: rootRoute.addChildren([flakyRoute]),
  });

  await router.load();

  return render(<RouterProvider router={router} />);
};

describe("RouteError", () => {
  it("recovers when the failed route loads on retry", async () => {
    const screen = await renderFailingRoute();

    await expect
      .element(screen.getByRole("heading", { level: 1, name: "Something went wrong" }))
      .toBeVisible();

    await screen.getByRole("button", { name: "Try again" }).click();

    await expect.element(screen.getByText("Loaded")).toBeVisible();
  });

  it("links back to the cure list", async () => {
    const screen = await renderFailingRoute();

    await expect
      .element(screen.getByRole("link", { name: "Go to cures" }))
      .toHaveAttribute("href", "/");
  });
});
