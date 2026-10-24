# Deployment

Vite builds the static site into `dist/`, and Netlify serves it. [`netlify.toml`](../netlify.toml) holds all Netlify configuration, so the Netlify UI only needs the linked repository.

## Netlify configuration

- **Build.** `pnpm build` typechecks, builds, and prerenders. Netlify reads Node from `.node-version` and pnpm from `PNPM_VERSION`, since Node 26 dropped Corepack. Install runs `prepare`, which patches TypeScript with Effect TSGo and generates `styled-system/`. When the lockfile is unchanged, Netlify restores a cached `node_modules` and pnpm skips install and `prepare`, so `pnpm build` runs `panda codegen` itself before typechecking. After `vite build`, `build-plugins/prerender.ts` loads `src/entry-server.tsx` through Vite, renders `/`, `/about`, and the not-found page to `index.html`, `about/index.html`, and `404.html`, and writes `sitemap.xml` and `robots.txt`.
- **Routes.** `index.html` serves `/`. `/about` and `/about/` rewrite to `about/index.html` with status 200, forced so Netlify's directory handling can't redirect them. Any other path without a matching file gets `404.html` with status 404. Each HTML file holds its page's title, description, canonical link, social card tags, and full content, so crawlers and link previews need no JavaScript. `/?search=burn` gets `index.html`, and the client renders the results.
- **Caching.** Hashed files under `/assets/*` are cached as immutable for a year. `/images/*` is cached for a week because image names aren't hashed. `index.html` keeps Netlify's default of revalidating on every request.
- **Headers.** Every response sets `X-Content-Type-Options: nosniff` and `Referrer-Policy: strict-origin-when-cross-origin`.
- **Content Security Policy.** Every response allows scripts, styles, images, fetches, and manifests only from the site's origin. It blocks everything else, including inline scripts, inline `<style>`, plugins, `<base>` changes, and framing (`frame-ancestors 'none'`). The build has no inline script or style, and Panda emits one static stylesheet. Adding a third-party resource or inline script means updating the policy in `netlify.toml`.
- **Permissions Policy.** Every response disables the accelerometer, Topics API, camera, screen capture, geolocation, gyroscope, magnetometer, microphone, Payment Request API, and WebUSB. The site uses none of them.
- **Compression.** Netlify serves text with Brotli or gzip.
- **Indexing.** `robots.txt` allows everything and points to `sitemap.xml`, which lists `/` and `/about`. Netlify doesn't send `x-robots-tag: noindex` on branch deploys, so a publicly linked branch URL such as `deploy-preview--divinity-cures.netlify.app` can get indexed. Each route's canonical link points to its path on `https://divinitycures.com`, without the query string, to consolidate those duplicates and the `divinity-cures.netlify.app` host. The not-found page has none.

## Bundle

Measured on 2026-10-23 with `vite build`. Sizes are minified, with gzipped sizes in parentheses. The first load fetches the entry chunk and, from "Schema removed" on, a shared `site` chunk that `index.html` preloads.

| JavaScript          | Before              | Catalog built ahead | Schema removed      | Prerendered         |
| ------------------- | ------------------- | ------------------- | ------------------- | ------------------- |
| First load          | 387.6 kB (125.7 kB) | 377.2 kB (122.5 kB) | 316.4 kB (103.7 kB) | 318.0 kB (104.8 kB) |
| Entry chunk         | 387.6 kB (125.7 kB) | 377.2 kB (122.5 kB) | 247.2 kB (78.7 kB)  | 227.2 kB (71.7 kB)  |
| Shared `site` chunk | none                | none                | 69.2 kB (25.0 kB)   | 69.8 kB (25.2 kB)   |
| Route tree chunk    | none                | none                | none                | 21.0 kB (7.9 kB)    |
| Home route          | 107.3 kB (28.6 kB)  | 126.7 kB (28.3 kB)  | 128.2 kB (28.8 kB)  | 128.2 kB (28.8 kB)  |
| About route         | 2.0 kB (0.7 kB)     | 2.0 kB (0.7 kB)     | 2.0 kB (0.7 kB)     | 2.0 kB (0.7 kB)     |

The stylesheet is 32.6 kB (8.9 kB) throughout.

- **Catalog built ahead.** The build validates the catalog with `loadCatalog` and ships the decoded result, so visitors no longer run Effect Schema or the Effect runtime to load data. The home route chunk grows uncompressed because each skill repeats its shared status and school records, but it barely changes gzipped.
- **Schema removed.** The `search` parameter was the last value the browser decoded with Effect Schema, which also pulled in unused modules such as `Duration`, `DateTime`, `BigDecimal`, and HTTP cookie and DNS helpers. Decoding it with `Predicate` took Schema out of the browser bundle.
- **Prerendered.** The client loads the router before rendering so it can hydrate the prerendered markup. That moves the route tree into its own chunk, which `index.html` also preloads.

Before minification, the remaining JavaScript is mostly React DOM, TanStack Router, and, in the home route, TanStack Form and the catalog.

Card images use `loading="lazy"` and `decoding="async"`. A cold load at 1280 × 720 fetches only the first seven skill icons, and the rest load as the results list scrolls toward them.

## Checks

`pnpm check`, including the browser tests, runs locally and in GitHub Actions on every push and pull request. Netlify runs only `pnpm build`, so deploys never download a browser.

## Preview a deploy

1. In Netlify, open the project and go to **Project configuration → Build & deploy → Continuous deployment**.
   - Under **Build settings**, set **Runtime** to not set so the Next.js runtime doesn't run, and keep the base directory as `/`. `netlify.toml` overrides the build command and publish directory, but set them to `pnpm build` and `dist` so the UI stays accurate.
   - Under **Branches and deploy contexts**, keep `main` as the production branch and add `deploy-preview` to **Branch deploys**.
2. Under **Environment variables**, make sure `NODE_VERSION` and `PNPM_VERSION` are unset, because either overrides the repository. Remove any Next.js variables such as `NEXT_DISABLE_EDGE_IMAGES`.
3. Push the commit to test with `git push origin main:deploy-preview`. Netlify builds it at `https://deploy-preview--divinity-cures.netlify.app/`.
4. When the deploy finishes, run the checklist below against that URL.

### Preview checklist

| Check                                                                                               | Expected                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Open `/`, `/about`, `/about/`, and `/?search=first+aid` directly, and reload each                   | The right page renders with no console errors                                                                                                            |
| Open `/missing` directly                                                                            | The not-found page, titled "Page not found - Divinity Cures"                                                                                             |
| `curl -sI <preview>/missing`                                                                        | `HTTP/2 404`                                                                                                                                             |
| `curl -sI <preview>/about`                                                                          | `HTTP/2 200`                                                                                                                                             |
| `curl -sI -H "Accept-Encoding: br" <preview>/assets/<entry>.js`                                     | `content-encoding: br` and `cache-control: public, max-age=31536000, immutable`                                                                          |
| `curl -sI <preview>/images/logo.png`                                                                | `cache-control: public, max-age=604800`                                                                                                                  |
| `curl -sI <preview>/robots.txt`                                                                     | `HTTP/2 200` with `content-type: text/plain`                                                                                                             |
| `curl -s <preview>/about` and `curl -s <preview>/missing`                                           | Each page's title, description, Open Graph tags, and main heading, with no `<script>` other than the entry module; only real pages have a canonical link |
| `curl -s <preview>/sitemap.xml`                                                                     | `/` and `/about` on `https://divinitycures.com`                                                                                                          |
| Share `<preview>/about` in a chat app that unfurls links                                            | A card with the page title, description, and the "D" logo                                                                                                |
| `curl -sI <preview>/about`                                                                          | `content-security-policy` with `frame-ancestors 'none'`, and `permissions-policy`                                                                        |
| Open every route, search, follow a badge, and open a description with the console open              | No Content Security Policy violations                                                                                                                    |
| Browser network panel on `/?search=burn`                                                            | No request leaves the site's own origin                                                                                                                  |
| Favicon and Apple touch icon                                                                        | The "D" logo                                                                                                                                             |
| Type a search, use Back and Forward, follow a cure badge, use **Clear**                             | The input, results, and URL stay in sync                                                                                                                 |
| Zoom to 200% and 400%, and turn on reduced motion in the OS                                         | Nothing overflows horizontally, and scrolling isn't animated                                                                                             |
| Screen reader on a phone (VoiceOver or TalkBack): search, then read the result summary and one card | The summary is announced, and the card reads name, cost, cooldown, range, and cures                                                                      |

## Cut over

1. Run the preview checklist and the [parity checklist](./parity-checklist.md) against the preview.
2. Note the current production deploy in Netlify's **Deploys** list. That deploy is the rollback target.
3. Merge `vite-rewrite` into `main` and push. Netlify builds and publishes it as production.
4. Repeat the preview checklist against the production URL, except expect no `x-robots-tag` header.
5. Remove the Next.js plugin and environment variables if they are still configured.

## Roll back

1. In Netlify **Deploys**, choose the last Next.js production deploy noted above and select **Publish deploy**. The old site is live again in seconds with no rebuild.
2. Netlify stops auto-publishing while a rolled-back deploy is locked. Before re-enabling it, fix forward on `main` or revert the merge with `git revert -m 1 <merge commit>` and push, so the next build doesn't republish the rewrite.
3. If the old deploy ever expires, rebuild it from the commit before the merge.
