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
    borderRadius: "pill",
    borderStyle: "solid",
    borderWidth: "1px",
    boxShadow: "sm",
    display: "inline-flex",
    fontSize: "sm",
    fontWeight: "semibold",
    gap: "1",
    lineHeight: "tight",
    minHeight: "8",
    paddingBlock: "1.5",
    paddingInline: "3",
    textDecorationLine: "none",
    _hover: {
      boxShadow: "md",
    },
    _motionSafe: {
      transitionDuration: "fast",
      transitionProperty: "background-color, border-color, box-shadow, transform",
      _hover: {
        transform: "translateY(-1px)",
      },
    },
  },
  variants: {
    effect: {
      removes: {
        backgroundColor: "cure.removes.background",
        borderColor: "cure.removes.border",
        color: "cure.removes.foreground",
        _hover: {
          backgroundColor: "cure.removes.backgroundHover",
          borderColor: "cure.removes.borderHover",
        },
      },
      immunity: {
        backgroundColor: "cure.immunity.background",
        borderColor: "cure.immunity.border",
        color: "cure.immunity.foreground",
        _hover: {
          backgroundColor: "cure.immunity.backgroundHover",
          borderColor: "cure.immunity.borderHover",
        },
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
        borderColor: "match.border",
        color: "match.foreground",
        _hover: {
          backgroundColor: "match.backgroundHover",
          borderColor: "match.border",
        },
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
    "side",
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
      gridTemplateAreas: '"side title gutter" "side content gutter"',
      gridTemplateRows: "auto 1fr",
      gridTemplateColumns: "auto 1fr auto",
      padding: { base: "3", md: "4" },
      position: "relative",
      rowGap: "1",
    },
    title: {
      alignSelf: "start",
      color: "text.skillName",
      fontSize: "2xl",
      fontWeight: "bold",
      gridArea: "title",
      lineHeight: "tight",
      minWidth: "0",
      overflowWrap: "break-word",
      textTransform: "uppercase",
    },
    side: {
      alignContent: "start",
      display: "grid",
      gap: "2",
      gridArea: "side",
      justifyItems: "center",
      width: "16",
    },
    stats: {
      display: "grid",
      gap: "2",
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
      marginTop: "3",
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
      backgroundColor: "surface.tint",
      borderColor: "border.tint",
      borderRadius: "control",
      borderStyle: "solid",
      borderWidth: "1px",
      _hover: {
        backgroundColor: "surface.tintHover",
        borderColor: "border.tintHover",
      },
      _open: {
        backgroundColor: "surface.inset",
        _hover: {
          backgroundColor: "surface.inset",
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
        borderBottomColor: "border.tint",
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
  variants: {
    nameMatch: {
      false: {},
      true: {
        title: {
          textDecorationColor: "match.background",
          textDecorationLine: "underline",
          textDecorationThickness: "0.12em",
          textUnderlineOffset: "0.18em",
        },
      },
    },
  },
  defaultVariants: {
    nameMatch: false,
  },
  staticCss: [{ nameMatch: ["*"] }],
});

export const tooltip = defineSlotRecipe({
  className: "tooltip",
  slots: ["positioner", "popup", "arrow"],
  base: {
    positioner: {
      zIndex: "tooltip",
    },
    popup: {
      backgroundColor: "text.default",
      borderRadius: "control",
      color: "text.onAccent",
      fontSize: "sm",
      fontWeight: "semibold",
      paddingBlock: "1",
      paddingInline: "2",
      "&[data-starting-style], &[data-ending-style]": {
        opacity: "0",
      },
      _motionSafe: {
        transitionDuration: "fast",
        transitionProperty: "opacity",
        "&[data-instant]": {
          transitionDuration: "0s",
        },
      },
    },
    arrow: {
      backgroundColor: "text.default",
      height: "2",
      rotate: "45deg",
      width: "2",
      "&[data-side=top]": { bottom: "-1" },
      "&[data-side=bottom]": { top: "-1" },
      "&[data-side=left]": { right: "-1" },
      "&[data-side=right]": { left: "-1" },
    },
  },
});
