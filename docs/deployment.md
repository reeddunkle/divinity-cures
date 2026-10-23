# Deployment

The site is static: Vite builds it into `dist/`, and Netlify serves that folder. [`netlify.toml`](../netlify.toml) holds the whole Netlify configuration, so settings in the Netlify UI should not be needed beyond linking the repository.

## Netlify configuration

- **Build:** `pnpm build` typechecks and builds. Netlify reads Node from `.node-version` and pnpm from `PNPM_VERSION`, because Node 26 no longer ships Corepack. Installing runs `prepare`, which patches TypeScript with Effect TSGo and generates `styled-system/`.
- **Routes:** `/` is served by `index.html`. `/about` and `/about/` are rewritten to `index.html` with status 200. Every other path that does not match a file gets `index.html` with status 404, so the app renders its not-found page and crawlers see a real 404.
- **Caching:** hashed files under `/assets/*` are cached for a year as immutable. Images under `/images/*` are cached for a week, because their names are not hashed. `index.html` keeps Netlify's default of revalidating on every request.
- **Headers:** every response sets `X-Content-Type-Options: nosniff` and `Referrer-Policy: strict-origin-when-cross-origin`.
- **Compression:** Netlify compresses text responses with Brotli or gzip automatically.
- **Indexing:** `robots.txt` allows everything. Deploy Previews and branch deploys should carry Netlify's `x-robots-tag: noindex` header, which the preview checklist verifies. There is no canonical link yet, because the production domain isn't recorded in the repository.

## Bundle

As of the cutover preparation, the entry chunk is 387 kB (125 kB gzipped), the home route chunk is 105 kB (28 kB gzipped), and the stylesheet is 29 kB (8 kB gzipped). Effect is the largest dependency. It lands in the entry chunk because the router decodes search parameters with Effect Schema, and that is acceptable for now. The home route chunk holds TanStack Form, the catalog JSON, and the search code.

## Checks

The full `pnpm check`, including the browser tests, runs locally. Netlify runs only `pnpm build`, so a deploy never needs a browser download. There is no other CI service yet; see [task 10](./tasks/10-add-continuous-integration.md).

## Preview a deploy

1. Push the `vite-rewrite` branch to GitHub.
2. In Netlify, open the site and go to **Site configuration → Build & deploy → Continuous deployment**.
   - Under **Build settings**, check for a build command, publish directory, or base directory left over from Next.js. `netlify.toml` takes precedence over the build command and publish directory, but a base directory would still apply, and clearing all three avoids confusion.
   - Under **Branches and deploy contexts**, keep the production branch as `main`. Add `vite-rewrite` to **Branch deploys**, or open a pull request from it to get a Deploy Preview.
3. Under **Build & deploy → Build plugins**, remove `@netlify/plugin-nextjs` if it was installed from the UI. It fails on a project without Next.js.
4. Under **Environment variables**, remove `NEXT_DISABLE_EDGE_IMAGES` and any other Next.js variables once production is cut over. They do nothing for the new build.
5. When the deploy finishes, open its unique URL and run the checklist below.

### Preview checklist

| Check                                                                                               | Expected                                                                            |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Open `/`, `/about`, `/about/`, and `/?search=first+aid` directly, and reload each                   | The right page renders with no console errors                                       |
| Open `/missing` directly                                                                            | The not-found page, titled "Page not found - Divinity Cures"                        |
| `curl -sI <preview>/missing`                                                                        | `HTTP/2 404`                                                                        |
| `curl -sI <preview>/about`                                                                          | `HTTP/2 200`                                                                        |
| `curl -sI -H "Accept-Encoding: br" <preview>/assets/<entry>.js`                                     | `content-encoding: br` and `cache-control: public, max-age=31536000, immutable`     |
| `curl -sI <preview>/images/logo.png`                                                                | `cache-control: public, max-age=604800`                                             |
| `curl -sI <preview>/`                                                                               | `x-robots-tag: noindex` on a preview, but not in production                         |
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
