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

- [Video](https://www.youtube.com/watch?v=bLB90QwRki4)
- [Utopia](https://utopia.fyi/)
- [MDN: `progress()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/progress)
- [Matthew Morete](https://matthewmorete.com/)
- [Transcript](./fluid-type-video-transcript.txt)

Timestamps:

- 0:00 The problem with `clamp()`
- 0:42 Why `clamp()` type scales fall out of sync
- 1:51 How `progress()` works
- 3:43 Making it more readable
- 4:51 Switching to rem
- 5:37 Fluid type scales with `progress()`
- 7:31 Cleaning up the type scale math
- 8:57 Using it today: browser support
- 10:16 The `tan(atan2())` fallback
- 11:20 Why this beats a generator
- 12:42 Specific font sizes (no type scale)
- 13:34 Wrapping up
