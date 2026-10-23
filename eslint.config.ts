import eslint from "@eslint/js";
import panda from "@pandacss/eslint-plugin";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    ignores: ["dist", "src/routeTree.gen.ts", "styled-system"],
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  reactHooks.configs.flat["recommended-latest"],
  await panda.configs.recommended({ configPath: "./panda.config.ts" }),
  stylistic.configs.customize({
    arrowParens: true,
    braceStyle: "1tbs",
    commaDangle: "always-multiline",
    indent: 2,
    jsx: true,
    quotes: "double",
    semi: true,
  }),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@pandacss/consistent-property-style": ["error", { style: "longhand" }],
      "@pandacss/no-important": "error",
    },
  },
);
