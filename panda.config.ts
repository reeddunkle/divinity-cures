import { defineConfig } from "@pandacss/dev";

import { globalCss } from "./src/theme/global-css.ts";
import { button, card, cureBadge, textLink } from "./src/theme/recipes.ts";
import { semanticTokens, tokens } from "./src/theme/semantic-tokens.ts";

export default defineConfig({
  globalCss,
  include: ["./src/**/*.{ts,tsx}"],
  jsxFramework: "react",
  outdir: "styled-system",
  preflight: true,
  presets: ["@pandacss/preset-base", "@pandacss/preset-panda"],
  strictTokens: true,
  theme: {
    extend: {
      recipes: { button, cureBadge, textLink },
      semanticTokens,
      slotRecipes: { card },
      tokens,
    },
  },
});
