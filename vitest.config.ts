import pandacss from "@pandacss/vite";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

import { bundledCatalog } from "./build-plugins/catalog.ts";

const resolve = { tsconfigPaths: true };

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [bundledCatalog()],
        resolve,
        test: {
          include: ["src/**/*.test.ts"],
          name: "unit",
        },
      },
      {
        optimizeDeps: { include: ["react-dom/server"] },
        plugins: [pandacss({ transform: true }), bundledCatalog()],
        resolve,
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
