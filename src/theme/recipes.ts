import { defineRecipe, defineSlotRecipe } from "@pandacss/dev";

export const button = defineRecipe({
  className: "button",
  base: {
    alignItems: "center",
    borderColor: "border.default",
    borderRadius: "control",
    borderStyle: "solid",
    borderWidth: "1px",
    cursor: "pointer",
    display: "inline-flex",
    flexShrink: "0",
    fontWeight: "semibold",
    gap: "2",
    justifyContent: "center",
    minHeight: "11",
    minWidth: "11",
    paddingInline: "4",
    _disabled: {
      cursor: "not-allowed",
      opacity: "0.5",
    },
    _motionSafe: {
      transitionDuration: "fast",
      transitionProperty: "background-color, border-color, color",
    },
  },
  variants: {
    tone: {
      primary: {
        backgroundColor: "violet.300",
        borderColor: "violet.300",
        color: "text.onAccent",
        _enabled: {
          _hover: {
            backgroundColor: "violet.200",
          },
        },
      },
      quiet: {
        backgroundColor: "surface.sunken",
        color: "text.default",
        _enabled: {
          _hover: {
            backgroundColor: "surface.hover",
          },
        },
      },
    },
  },
  defaultVariants: {
    tone: "primary",
  },
});

export const textLink = defineRecipe({
  className: "text-link",
  base: {
    color: "link.default",
    textDecorationLine: "underline",
    textDecorationThickness: "1px",
    textUnderlineOffset: "0.2em",
    _hover: {
      color: "link.hover",
    },
  },
  variants: {
    emphasis: {
      inline: {},
      nav: {
        color: "text.muted",
        fontWeight: "medium",
        textDecorationLine: "none",
        _currentPage: {
          color: "text.default",
          textDecorationLine: "underline",
        },
      },
    },
  },
  defaultVariants: {
    emphasis: "inline",
  },
});

export const cureBadge = defineRecipe({
  className: "cure-badge",
  base: {
    alignItems: "center",
    borderColor: "transparent",
    borderRadius: "pill",
    borderStyle: "solid",
    borderWidth: "1px",
    display: "inline-flex",
    fontSize: "sm",
    gap: "1",
    lineHeight: "tight",
    paddingBlock: "1",
    paddingInline: "2.5",
    textDecorationLine: "none",
    _hover: {
      borderColor: "border.strong",
      textDecorationLine: "underline",
    },
  },
  variants: {
    effect: {
      removes: {
        backgroundColor: "cure.removes.background",
        color: "cure.removes.foreground",
      },
      immunity: {
        backgroundColor: "cure.immunity.background",
        color: "cure.immunity.foreground",
      },
    },
    matched: {
      false: {},
      true: {},
    },
  },
  compoundVariants: [
    {
      css: {
        backgroundColor: "match.background",
        color: "match.foreground",
        fontWeight: "semibold",
      },
      matched: true,
    },
  ],
  defaultVariants: {
    effect: "removes",
    matched: false,
  },
});

export const card = defineSlotRecipe({
  className: "card",
  slots: [
    "root",
    "title",
    "stats",
    "icon",
    "content",
    "gutter",
    "section",
    "sectionTitle",
    "description",
    "descriptionSummary",
    "descriptionBody",
  ],
  base: {
    root: {
      columnGap: { base: "3", md: "4" },
      display: "grid",
      gridTemplateAreas: '"title title gutter" "stats content gutter"',
      gridTemplateColumns: "minmax(4.5rem, 1fr) 4fr auto",
      padding: { base: "3", md: "4" },
      position: "relative",
      rowGap: "3",
    },
    title: {
      color: "text.skillName",
      fontSize: "2xl",
      fontWeight: "medium",
      gridArea: "title",
      letterSpacing: "wide",
      lineHeight: "none",
      textTransform: "uppercase",
    },
    stats: {
      alignContent: "start",
      display: "grid",
      gap: "2",
      gridArea: "stats",
      justifyItems: "center",
    },
    icon: {
      borderRadius: "control",
      height: "icon.skill",
      width: "icon.skill",
    },
    content: {
      alignContent: "start",
      display: "grid",
      gap: "4",
      gridArea: "content",
      minWidth: "0",
    },
    gutter: {
      display: "flex",
      flexDirection: "column",
      gap: "2",
      gridArea: "gutter",
      listStyleType: "none",
    },
    section: {
      display: "grid",
      gap: "2",
    },
    sectionTitle: {
      color: "text.muted",
      fontSize: "xs",
      fontWeight: "semibold",
      letterSpacing: "wider",
      textTransform: "uppercase",
    },
    description: {
      backgroundColor: "surface.raised",
      borderColor: "border.default",
      borderRadius: "control",
      borderStyle: "solid",
      borderWidth: "1px",
      _hover: {
        backgroundColor: "surface.hover",
        borderColor: "border.strong",
      },
      _open: {
        backgroundColor: "violet.950",
        borderColor: "border.strong",
        _hover: {
          backgroundColor: "violet.950",
        },
      },
      _motionSafe: {
        transitionDuration: "fast",
        transitionProperty: "background-color, border-color",
      },
    },
    descriptionSummary: {
      cursor: "pointer",
      fontWeight: "semibold",
      paddingBlock: "2",
      paddingInline: "3",
      "[open] > &": {
        borderBottomColor: "border.strong",
        borderBottomStyle: "solid",
        borderBottomWidth: "1px",
      },
    },
    descriptionBody: {
      maxWidth: "prose",
      paddingBlock: "2",
      paddingInline: "3",
      whiteSpace: "pre-line",
    },
  },
});
