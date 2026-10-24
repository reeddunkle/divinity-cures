import { createMemoryHistory } from "@tanstack/react-router";

import { type AppRouterOptions, createAppRouter } from "@/router.ts";

export const createTestRouter = async (
  initialEntry: string,
  options: Omit<AppRouterOptions, "history"> = {},
) => {
  const history = createMemoryHistory({ initialEntries: [initialEntry] });
  const router = createAppRouter({ scrollRestoration: false, ...options, history });

  await router.load();

  return { history, router };
};
