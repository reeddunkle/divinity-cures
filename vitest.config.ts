import pandacss from "@pandacss/vite";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          include: ["src/**/*.test.ts"],
          name: "unit",
        },
      },
      {
        plugins: [pandacss({ transform: true })],
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
