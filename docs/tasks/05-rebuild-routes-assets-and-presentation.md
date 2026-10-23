# Rebuild routes, assets, and presentation

**Priority:** P1

## Objective

Build the complete accessible interface with Panda CSS v2 and repository-owned asset delivery.

## Work

- Implement `/`, `/about`, not-found, and route-error experiences.
- Rebuild navigation, metadata, search controls, cards, cure badges, point costs, ranges, requirements, and collapsible content.
- Define semantic Panda tokens and purposeful recipes rather than translating Vanilla Extract files one for one.
- Inventory each image's source, license, and redistribution status.
- Move approved images under `public/images`, normalize them, and replace remote URLs with stable local references.
- Add checks for missing asset references and document exceptions or attribution.
- Verify keyboard navigation, focus, landmarks, headings, labels, result feedback, high zoom, and reduced motion.

## Reference

- [Migrating from vanilla-extract to Panda CSS](https://panda-css.com/docs/get-started/vanilla-extract)

## Acceptance criteria

- Routes work through navigation and direct requests.
- Useful deep links such as `/?search=first+aid` still work.
- No AWS or wiki image request remains unless documented.
- Shared visual patterns expose small recipe interfaces and semantic tokens.
- The UI works at narrow widths and with keyboard-only navigation.

