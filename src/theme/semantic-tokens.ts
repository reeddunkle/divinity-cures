import { defineSemanticTokens, defineTokens } from "@pandacss/dev";

export const tokens = defineTokens({
  colors: {
    plum: {
      700: { value: "#5a1873" },
      800: { value: "#43105a" },
      900: { value: "#350944" },
      950: { value: "#22042d" },
    },
  },
  sizes: {
    content: { value: "48rem" },
  },
});

export const semanticTokens = defineSemanticTokens({
  colors: {
    canvas: { value: "{colors.plum.900}" },
    surface: {
      raised: { value: "{colors.plum.800}" },
      sunken: { value: "{colors.plum.950}" },
      hover: { value: "{colors.plum.700}" },
    },
    text: {
      default: { value: "{colors.violet.100}" },
      muted: { value: "{colors.violet.300}" },
      onAccent: { value: "{colors.plum.950}" },
      skillName: { value: "{colors.green.300}" },
    },
    border: {
      subtle: { value: "{colors.violet.900}" },
      default: { value: "{colors.violet.700}" },
      strong: { value: "{colors.violet.400}" },
    },
    link: {
      default: { value: "{colors.violet.200}" },
      hover: { value: "{colors.cyan.300}" },
    },
    focusRing: { value: "{colors.cyan.300}" },
    match: {
      background: { value: "{colors.yellow.300}" },
      foreground: { value: "{colors.plum.950}" },
    },
    cure: {
      removes: {
        background: { value: "{colors.violet.900}" },
        foreground: { value: "{colors.violet.100}" },
      },
      immunity: {
        background: { value: "{colors.teal.900}" },
        foreground: { value: "{colors.teal.100}" },
      },
    },
  },
  shadows: {
    results: { value: "0 0 1.5rem 0.125rem rgb(139 92 246 / 0.35)" },
  },
  radii: {
    card: { value: "{radii.lg}" },
    control: { value: "{radii.md}" },
    pill: { value: "{radii.full}" },
  },
  sizes: {
    icon: {
      logo: { value: "{sizes.10}" },
      skill: { value: "{sizes.14}" },
      school: { value: "{sizes.6}" },
      schoolGutter: { value: "{sizes.8}" },
      cooldown: { value: "{sizes.11}" },
      point: { value: "{sizes.5}" },
      control: { value: "{sizes.5}" },
    },
  },
  spacing: {
    page: { value: { base: "{spacing.4}", md: "{spacing.6}" } },
  },
});
