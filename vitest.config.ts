import pandacss from "@pandacss/vite";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

import { bundledCatalog } from "./build-plugins/catalog.ts";

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [bundledCatalog()],
        test: {
          include: ["src/**/*.test.ts"],
          name: "unit",
        },
      },
      {
        optimizeDeps: { include: ["react-dom/server"] },
        plugins: [pandacss({ transform: true }), bundledCatalog()],
        test: {
          browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: "chromium" }],
            provider: playwright(),
          },
          include: ["src/**/*.browser.test.tsx"],
          name: "browser",
        },
      },
    ],
  },
});
