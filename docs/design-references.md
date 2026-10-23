# Design references

Research behind the site's type scale and color palette.

## Type scale

### Next.js app (tag `nextjs-final`)

The old fluid scale lives in `util/scale.ts`. View it with:

```sh
git show nextjs-final:util/scale.ts
```

- [Modular Scale: 1em base, 1.2 ratio](https://www.modularscale.com/?1&em&1.2) produced the static minor-third steps.
- [fluid.style/type](https://fluid.style/type) generated the `clamp()` preferred values for each fluid step.

### Kevin Powell: fluid type with `progress()`

Notes and transcript: [tasks/fluid-type.md](./tasks/fluid-type.md)

- [Utopia](https://utopia.fyi/)
- [MDN: `progress()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/progress)
- [Matthew Morete](https://matthewmorete.com/)

## Color

- [Paletton palette](https://paletton.com/#uid=14n0u0ktPiAlqqgpXmxBddWN28G)
