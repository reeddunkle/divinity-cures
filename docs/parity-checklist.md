# Parity checklist

This compares the rewrite with the Next.js app at `main` (`34eb28e`), both run locally on 2026-10-23, the old app with `next dev` and the rewrite with `vite preview`. **Intended** marks differences that follow from the rewrite's design and need no fix.

## Search results

For each query, both apps returned the same skills with the same cures and immunity markers. Order was ignored because the old app sorted in place.

| Query       | Skills | Result                                                                    |
| ----------- | -----: | ------------------------------------------------------------------------- |
| _(empty)_   |     26 | Same                                                                      |
| `burn`      |     12 | Same                                                                      |
| `disease`   |      7 | Same                                                                      |
| `knock`     |      2 | Same                                                                      |
| `frozen`    |      5 | Same                                                                      |
| `rest`      |      1 | Same                                                                      |
| `mad`       |      4 | Same                                                                      |
| `blind`     |      2 | Same                                                                      |
| `first aid` |      1 | Same                                                                      |
| `cleanse`   |  1 → 2 | **Intended.** Matching at the start of any word adds Mass Cleanse Wounds. |

## Behavior

| Item                   | Old                                                       | Rewrite                                                          | Status       |
| ---------------------- | --------------------------------------------------------- | ---------------------------------------------------------------- | ------------ |
| `/` with no query      | Every cure skill                                          | Every cure skill                                                 | Same         |
| `/?search=…` deep link | Filters results                                           | Filters results and fills the input                              | Same         |
| `/about`               | Explains direct and indirect cures, with a First Aid link | Same content, reworded; the link goes to `/?search=first+aid`    | Same         |
| Cure badge             | Links to `?search=<status>`                               | Links to `/?search=<Status>`                                     | Same         |
| Immunity marker        | Asterisk and legend                                       | Asterisk and legend, plus "(grants immunity)" for screen readers | Same         |
| Typing                 | Doesn't update the URL                                    | Updates the URL, adding one history entry per edit session       | **Intended** |
| Query with no matches  | Shows the previous query's results                        | Shows "No skills match" and no results                           | **Intended** |
| Matching               | Start of the whole name or status                         | Start of any word                                                | **Intended** |
| Result order           | Unstable in-place sorts                                   | Source Points, Action Points, name, then identifier              | **Intended** |
| Clear                  | Navigates to `/` and focuses the input                    | Navigates to `/` and focuses the input                           | Same         |
| Unknown path           | Next.js 404 page                                          | Not-found page inside the site layout                            | **Intended** |
| Page titles            | "Divinity Cures", "About - Divinity Cures"                | Same, plus "Page not found - Divinity Cures"                     | Same         |
| Favicons               | `favicon.ico`, 16 px, Apple touch icon                    | Same files, plus a 32 px icon                                    | Same         |

## Presentation

| Item                   | Old                                                                   | Rewrite                                                        | Status       |
| ---------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------- | ------------ |
| Site title             | "Divinity Original Sin: 2" in the header                              | "Divinity Cures" with the game name beneath                    | **Intended** |
| Navigation             | Cures, About, GitHub, and Issues in the footer                        | Cures and About in the header; GitHub and Issues in the footer | **Intended** |
| Scrolling              | Results scroll inside a fixed-height panel                            | The whole page scrolls                                         | **Intended** |
| Card contents          | Name, icon, AP/SP icons, cooldown, range, schools, cures, description | Same, with labeled stats                                       | Same         |
| School requirements    | One school icon repeated per required level                           | One icon with the school name and level                        | **Intended** |
| Cooldown of Skin Graft | ∞                                                                     | "Once per combat"                                              | Same meaning |
| Images                 | CloudFront through Next.js image optimization                         | Self-hosted under `public/images`                              | **Intended** |

## Viewports

Checked at 375 × 812, 768 × 1024, and about 1280 px wide. Nothing scrolled horizontally, and the search controls wrap below the input at 375 px.
