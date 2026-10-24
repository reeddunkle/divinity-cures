import { RouterProvider } from "@tanstack/react-router";
import { render } from "vitest-browser-react";

import type { AppRouterOptions } from "@/router.ts";
import { createTestRouter } from "@/tests/common/test-router.ts";

import "@/styles.css";

export const renderApp = async (
  initialEntry: string,
  options: Omit<AppRouterOptions, "history"> = {},
) => {
  const { history, router } = await createTestRouter(initialEntry, options);
  const screen = await render(<RouterProvider router={router} />);

  return { history, router, screen };
};
