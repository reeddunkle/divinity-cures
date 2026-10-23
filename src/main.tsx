import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import { createAppRouter, prepareForHydration, prerenderKey } from "./router.ts";

import "./styles.css";

const router = createAppRouter();

const rootElement = document.querySelector<HTMLDivElement>("#root");

if (rootElement === null) {
  throw new Error("Root element was not found");
}

await router.load();

for (const element of document.head.querySelectorAll("[data-prerendered]")) {
  element.remove();
}

const app = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

if (rootElement.dataset["prerendered"] === prerenderKey(router)) {
  prepareForHydration(router);
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
