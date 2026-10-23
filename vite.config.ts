import pandacss from "@pandacss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { bundledCatalog } from "./build-plugins/catalog.ts";

export default defineConfig({
  plugins: [
    tanstackRouter({
      autoCodeSplitting: true,
      target: "react",
    }),
    pandacss({ transform: true }),
    react(),
    bundledCatalog(),
  ],
});
