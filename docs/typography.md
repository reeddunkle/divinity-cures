# Typography

Research behind the site's type scale.

## Next.js app (tag `nextjs-final`)

The old fluid scale lives in `util/scale.ts`. View it with:

```sh
git show nextjs-final:util/scale.ts
```

- [Modular Scale: 1em base, 1.2 ratio](https://www.modularscale.com/?1&em&1.2) produced the static minor-third steps.
- [fluid.style/type](https://fluid.style/type) generated the `clamp()` preferred values for each fluid step.

## Kevin Powell: fluid type with `progress()`

Notes and transcript: [tasks/fluid-type.md](./tasks/fluid-type.md)

- [Video](https://www.youtube.com/watch?v=bLB90QwRki4)
- [Utopia](https://utopia.fyi/)
- [MDN: `progress()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/progress)
- [Matthew Morete](https://matthewmorete.com/)
