# Deployment

The site is static: Vite builds it into `dist/`, and Netlify serves that folder. [`netlify.toml`](../netlify.toml) holds the whole Netlify configuration, so settings in the Netlify UI should not be needed beyond linking the repository.

## Netlify configuration

- **Build:** `pnpm build` typechecks and builds. Netlify reads Node from `.node-version` and pnpm from `PNPM_VERSION`, because Node 26 no longer ships Corepack. Installing runs `prepare`, which patches TypeScript with Effect TSGo and generates `styled-system/`. Netlify restores a cached `node_modules`, and when the lockfile is unchanged pnpm skips the install and `prepare` with it, so `pnpm build` runs `panda codegen` itself before typechecking.
- **Routes:** `/` is served by `index.html`. `/about` and `/about/` are rewritten to `index.html` with status 200. Every other path that does not match a file gets `index.html` with status 404, so the app renders its not-found page and crawlers see a real 404.
- **Caching:** hashed files under `/assets/*` are cached for a year as immutable. Images under `/images/*` are cached for a week, because their names are not hashed. `index.html` keeps Netlify's default of revalidating on every request.
- **Headers:** every response sets `X-Content-Type-Options: nosniff` and `Referrer-Policy: strict-origin-when-cross-origin`.
- **Content Security Policy:** every response enforces a policy that allows scripts, styles, images, fetches, and manifests only from the site's own origin, and blocks everything else, including inline scripts, inline `<style>` elements, plugins, `<base>` changes, and framing (`frame-ancestors 'none'`). The production build has no inline script or style, and Panda emits one static stylesheet. Anything that adds a third-party resource or an inline script must update the policy in `netlify.toml`.
- **Permissions Policy:** every response disables the accelerometer, Topics API, camera, screen capture, geolocation, gyroscope, magnetometer, microphone, Payment Request API, and WebUSB, none of which the site uses.
- **Compression:** Netlify compresses text responses with Brotli or gzip automatically.
- **Indexing:** `robots.txt` allows everything. Netlify does not add an `x-robots-tag: noindex` header to branch deploys, so a branch deploy URL such as `deploy-preview--divinity-cures.netlify.app` can be indexed if it is linked publicly. To consolidate those duplicates and the `divinity-cures.netlify.app` host, each route sets a canonical link to its path on `https://divinitycures.com`, without the query string. The not-found page sets none.

## Bundle

Measured on 2026-10-23 with `vite build`; sizes are minified, with gzipped sizes in parentheses.

| Chunk       | Before              | After               |
| ----------- | ------------------- | ------------------- |
| Entry       | 387.6 kB (125.7 kB) | 377.2 kB (122.5 kB) |
| Home route  | 107.3 kB (28.6 kB)  | 126.7 kB (28.3 kB)  |
| About route | 2.0 kB (0.7 kB)     | 2.0 kB (0.7 kB)     |
| Stylesheet  | 32.6 kB (8.9 kB)    | 32.6 kB (8.9 kB)    |

The build now validates the catalog with `loadCatalog` and ships the decoded result, so visitors no longer run Effect Schema or the Effect runtime to load data, and an invalid catalog fails the build instead of the page. The home route chunk grows uncompressed because shared status and school records are repeated in each skill, but it shrinks gzipped.

Before minification, the entry chunk is mostly React DOM (about 537 kB), Effect (about 245 kB), and TanStack Router (about 162 kB); the home route chunk is mostly TanStack Form (about 97 kB) and the catalog. Most of Effect's share is Schema, which also pulls in modules the app never uses, such as `Duration`, `DateTime`, `BigDecimal`, and HTTP cookie and DNS helpers. After the catalog change, decoding the `search` parameter with Schema is the only reason it stays: an experiment that decoded it with `Predicate` instead cut the entry chunk to 247.3 kB (78.8 kB gzipped).

Card images use `loading="lazy"` and `decoding="async"`. On a cold load at 1280 × 720, only the first seven skill icons load; the rest load as the results list scrolls toward them.

## Checks

The full `pnpm check`, including the browser tests, runs locally and in GitHub Actions on every push and pull request. Netlify runs only `pnpm build`, so a deploy never needs a browser download.

## Preview a deploy

1. In Netlify, open the project and go to **Project configuration → Build & deploy → Continuous deployment**.
   - Under **Build settings**, set **Runtime** to not set, so the Next.js runtime doesn't run. Keep the base directory as `/`. `netlify.toml` takes precedence over the build command and publish directory, but setting them to `pnpm build` and `dist` keeps the UI accurate.
   - Under **Branches and deploy contexts**, keep the production branch as `main`, and add `deploy-preview` to **Branch deploys**.
2. Under **Environment variables**, make sure neither `NODE_VERSION` nor `PNPM_VERSION` is set, because either would override the repository. No Next.js variables such as `NEXT_DISABLE_EDGE_IMAGES` should remain.
3. Push the commit to test with `git push origin main:deploy-preview`. Netlify builds it at `https://deploy-preview--divinity-cures.netlify.app/`.
4. When the deploy finishes, run the checklist below against that URL.

### Preview checklist

| Check                                                                                               | Expected                                                                            |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Open `/`, `/about`, `/about/`, and `/?search=first+aid` directly, and reload each                   | The right page renders with no console errors                                       |
| Open `/missing` directly                                                                            | The not-found page, titled "Page not found - Divinity Cures"                        |
| `curl -sI <preview>/missing`                                                                        | `HTTP/2 404`                                                                        |
| `curl -sI <preview>/about`                                                                          | `HTTP/2 200`                                                                        |
| `curl -sI -H "Accept-Encoding: br" <preview>/assets/<entry>.js`                                     | `content-encoding: br` and `cache-control: public, max-age=31536000, immutable`     |
| `curl -sI <preview>/images/logo.png`                                                                | `cache-control: public, max-age=604800`                                             |
| `curl -sI <preview>/robots.txt`                                                                     | `HTTP/2 200` with `content-type: text/plain`                                        |
| `curl -sI <preview>/about`                                                                          | `content-security-policy` with `frame-ancestors 'none'`, and `permissions-policy`   |
| Open every route, search, follow a badge, and open a description with the console open              | No Content Security Policy violations                                               |
| Browser network panel on `/?search=burn`                                                            | No request leaves the site's own origin                                             |
| Favicon and Apple touch icon                                                                        | The "D" logo                                                                        |
| Type a search, use Back and Forward, follow a cure badge, use **Clear**                             | The input, results, and URL stay in sync                                            |
| Zoom to 200% and 400%, and turn on reduced motion in the OS                                         | Nothing overflows horizontally, and scrolling isn't animated                        |
| Screen reader on a phone (VoiceOver or TalkBack): search, then read the result summary and one card | The summary is announced, and the card reads name, cost, cooldown, range, and cures |

## Cut over

1. Run the preview checklist and the [parity checklist](./parity-checklist.md) against the preview.
2. Note the current production deploy in Netlify's **Deploys** list. That deploy is the rollback target.
3. Merge `vite-rewrite` into `main` and push. Netlify builds and publishes it as production.
4. Repeat the preview checklist against the production URL, except expect no `x-robots-tag` header.
5. Remove the Next.js plugin and environment variables if they are still configured.

## Roll back

1. In Netlify, open **Deploys**, choose the last Next.js production deploy noted above, and select **Publish deploy**. The old site is live again in seconds, and nothing has to be rebuilt.
2. Netlify stops auto-publishing while a rolled-back deploy is locked in. Before re-enabling auto-publishing, either fix forward on `main` or revert the merge with `git revert -m 1 <merge commit>` and push, so the next build doesn't republish the rewrite.
3. The old application stays intact in Git history before the merge commit, so it can be rebuilt from that commit if its deploy ever expires.
