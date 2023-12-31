/* eslint-disable sort-keys */

const { resolve } = require("node:path");

const project = resolve(__dirname, "tsconfig.json");

module.exports = {
  root: true,
  extends: [
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/next"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    "next/core-web-vitals",
    // 'prettier',
    "plugin:@stylistic/disable-legacy",
  ],
  plugins: [
    "@stylistic",
    // "tailwind", // Try off for now
    "only-warn",
  ],
  parserOptions: {
    project,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  rules: {
    // @stylistic -- https://eslint.style/rules
    "@stylistic/quotes": [1, "double"],
    "@stylistic/padding-line-between-statements": [
      // @stylistic -- https://eslint.style/rules/default/padding-line-between-statements
      "error",
      {
        // Line before `return`
        blankLine: "always",
        prev: "*",
        next: "return",
      },
      {
        // Line after `directive`
        blankLine: "always",
        prev: "directive",
        next: "*",
      },
      {
        // Line between...
        blankLine: "always",
        prev: "*",
        next: [
          "block",
          "block-like",
          "break",
          "class",
          "continue",
          "do",
          "empty",
          "function",
          "if",
          "interface",
          "multiline-const",
          "multiline-expression",
          "switch",
          "try",
          "type",
          "while",
        ],
      },
      {
        // Line between...
        blankLine: "always",
        prev: "multiline-expression",
        next: "expression",
      },
      {
        // Line before export
        // Should be everything except for other exports
        blankLine: "always",
        prev: [
          "block",
          "block-like",
          "class",
          "const",
          "do",
          "expression",
          "function",
          "if",
          "interface",
          "let",
          "multiline-expression",
          "switch",
          "type",
          "var",
          "while",
        ],
        next: ["cjs-export", "export"],
      },
    ],
    "@stylistic/comma-dangle": ["error", "always-multiline"],
    "@stylistic/jsx-newline": [1, { prevent: true, allowMultilines: false }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/prefer-reduce-type-parameter": "off",
    "eslint-comments/require-description": "off",
    "import/no-anonymous-default-export": "off",
    "import/no-default-export": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/order": [
      "error",
      {
        alphabetize: { caseInsensitive: true, order: "asc" },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
        ],
        pathGroups: [
          { pattern: "@/**", group: "internal", position: "before" },
        ],
        pathGroupsExcludedImportTypes: ["@/**"],
        "newlines-between": "always",
      },
    ],
    "no-implicit-coercion": "off",
    "no-nested-ternary": "off",
    "react/no-array-index-key": "off",
    "sort-imports": [
      "error",
      {
        allowSeparatedGroups: true,
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
      },
    ],
    "sort-keys": [
      "error",
      "asc",
      { allowLineSeparatedGroups: true, caseSensitive: false, natural: true },
    ],
    "unicorn/filename-case": "off",
  },
};
