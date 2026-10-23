import { createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import { renderPage } from "./entry-server.tsx";
import { createAppRouter, prepareForHydration, prerenderKey } from "./router.ts";

const containers: HTMLElement[] = [];

beforeAll(() => {
  Reflect.set(globalThis, "IS_REACT_ACT_ENVIRONMENT", true);
});

afterAll(() => {
  Reflect.deleteProperty(globalThis, "IS_REACT_ACT_ENVIRONMENT");
});

afterEach(() => {
  for (const container of containers.splice(0)) {
    container.remove();
  }
});

const hydrate = async (url: string, prerenderedUrl: string) => {
  const page = await renderPage(prerenderedUrl);
  const container = document.createElement("div");
  container.innerHTML = page.body;
  document.body.append(container);
  containers.push(container);

  const router = createAppRouter({
    history: createMemoryHistory({ initialEntries: [url] }),
    scrollRestoration: false,
  });
  await router.load();
  prepareForHydration(router);

  const errors: unknown[] = [];
  const consoleErrors: unknown[][] = [];
  const originalConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    consoleErrors.push(args);
  };

  try {
    await act(async () => {
      hydrateRoot(container, <RouterProvider router={router} />, {
        onRecoverableError: (error) => {
          errors.push(error);
        },
      });
    });
  } finally {
    console.error = originalConsoleError;
  }

  return { consoleErrors, errors, key: prerenderKey(router), page };
};

describe("hydration", () => {
  it.each([
    ["/", "/"],
    ["/about", "/about"],
    ["/missing", "/__not-found__"],
  ])("hydrates %s from its prerendered markup without mismatches", async (url, prerenderedUrl) => {
    const { consoleErrors, errors, key, page } = await hydrate(url, prerenderedUrl);

    expect(key).toBe(page.key);
    expect(errors.map(String)).toEqual([]);
    expect(consoleErrors.map((args) => args.map(String).join(" "))).toEqual([]);
  });
});
