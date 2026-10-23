import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  include: ["./src/**/*.{ts,tsx}"],
  jsxFramework: "react",
  outdir: "styled-system",
  preflight: true,
  presets: ["@pandacss/preset-base", "@pandacss/preset-panda"],
  strictTokens: true,
  theme: {
    extend: {
      semanticTokens: {
        colors: {
          background: { value: { base: "{colors.gray.950}" } },
          foreground: { value: { base: "{colors.gray.50}" } },
        },
      },
    },
  },
});
