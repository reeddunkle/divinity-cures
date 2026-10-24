# Static assets

Every image is served from `public/` and referenced by a root-relative path. `src/tests/unit-tests/assets.test.ts` fails when a catalog record, `src/assets.ts`, or `index.html` references a remote URL or a missing file, or when an image under `public/` is not referenced.

## Repository-owned images

| Path                                                                      | Source                                                                              | License and redistribution |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------- |
| `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-icon.png` | `app/` in the Next.js application                                                   | Project-owned artwork      |
| `images/logo.png`                                                         | `public/images/d-icon.png` in the Next.js application, scaled from 800 px to 128 px | Project-owned artwork      |

`apple-icon.png` (180 × 180) is also the Open Graph and Twitter card image, referenced as `uiImages.shareImage`. It meets the 144 × 144 minimum for a Twitter summary card.

The Next.js `android-chrome-*` icons were not carried over because nothing referenced them. Add them back together with a web app manifest if one is introduced.

## Game icons

The icons under `public/images/icons/` are Divinity: Original Sin 2 artwork. The Next.js application loaded them from the project's CloudFront bucket at `https://d124vy484dv6tz.cloudfront.net/icons/`. They were downloaded from that bucket on 2026-10-23 and kept in their original format, because each file's contents matched its extension.

- **Copyright:** Larian Studios. The site footer attributes them.
- **Redistribution:** The project owner approved self-hosting them as fan-site use. No separate license grants redistribution, so remove or replace any icon if Larian objects.
- **Normalization:** File names are the source names lowercased, with each run of other characters replaced by a single hyphen. The data references each file once by path, including icons that several records share.

| Local path (under `public/images/`)               | Source file name                            |
| ------------------------------------------------- | ------------------------------------------- |
| `icons/abi-aerotheurge.png`                       | `abi_aerotheurge.png`                       |
| `icons/abi-geomancer.png`                         | `abi_geomancer.png`                         |
| `icons/abi-huntsman.png`                          | `abi_huntsman.png`                          |
| `icons/abi-hydrosophist.png`                      | `abi_hydrosophist.png`                      |
| `icons/abi-necromancer.png`                       | `abi_necromancer.png`                       |
| `icons/abi-polymorph.png`                         | `abi_polymorph.png`                         |
| `icons/abi-pyrokinetic.png`                       | `abi_pyrokinetic.png`                       |
| `icons/abi-scoundrel.png`                         | `abi_scoundrel.png`                         |
| `icons/abi-summoning.png`                         | `abi_summoning.png`                         |
| `icons/abi-warfare.png`                           | `abi_warfare.png`                           |
| `icons/aerotheurge-16-13.webp`                    | `aerotheurge-16-13.webp`                    |
| `icons/aerotheurge-16-14.png`                     | `aerotheurge-16-14.png`                     |
| `icons/aerotheurge-17-1.webp`                     | `aerotheurge-17-1.webp`                     |
| `icons/aerotheurge-vaporise-icon.png`             | `aerotheurge_vaporise-icon.png`             |
| `icons/ap.webp`                                   | `AP.webp`                                   |
| `icons/bless-icon.webp`                           | `bless-icon.webp`                           |
| `icons/break-the-shackles-icon.png`               | `break_the_shackles-icon.png`               |
| `icons/geomancer-fortify-icon.png`                | `geomancer_fortify-icon.png`                |
| `icons/geomancer-mend-metal-icon.webp`            | `geomancer_mend_metal-icon.webp`            |
| `icons/huntsman-15-24.png`                        | `huntsman-15-24.png`                        |
| `icons/huntsman-first-aid-icon.png`               | `huntsman_first_aid-icon.png`               |
| `icons/huntsman-tactical-retreat-icon.webp`       | `huntsman_tactical_retreat-icon.webp`       |
| `icons/hydrosophist-14-16.png`                    | `hydrosophist-14-16.png`                    |
| `icons/hydrosophist-16-17.png`                    | `hydrosophist-16-17.png`                    |
| `icons/hydrosophist-16-18.png`                    | `hydrosophist-16-18.png`                    |
| `icons/hydrosophist-16-23.png`                    | `hydrosophist-16-23.png`                    |
| `icons/hydrosophist-16-24.png`                    | `hydrosophist-16-24.png`                    |
| `icons/hydrosophist-armour-of-frost.png`          | `hydrosophist_armour_of_frost.png`          |
| `icons/hydrosophist-cryogenic-statis-icon.png`    | `hydrosophist_cryogenic_statis-icon.png`    |
| `icons/hydrosophist-healing-ritual-icon.webp`     | `hydrosophist_healing_ritual-icon.webp`     |
| `icons/hydrosophist-restoration-icon.png`         | `hydrosophist_restoration-icon.png`         |
| `icons/hydrosophist-soothing-cold-icon.webp`      | `hydrosophist_soothing_cold-icon.webp`      |
| `icons/hydrosophist-steam-lance-icon.webp`        | `hydrosophist_steam_lance-icon.webp`        |
| `icons/icn-aer.png`                               | `Icn_Aer.png`                               |
| `icons/icn-geo.webp`                              | `Icn_Geo.webp`                              |
| `icons/icn-hun.webp`                              | `Icn_Hun.webp`                              |
| `icons/icn-hyd.webp`                              | `Icn_Hyd.webp`                              |
| `icons/icn-nec.png`                               | `Icn_Nec.png`                               |
| `icons/icn-pol.png`                               | `Icn_Pol.png`                               |
| `icons/icn-pyr.png`                               | `Icn_Pyr.png`                               |
| `icons/icn-sco.png`                               | `Icn_Sco.png`                               |
| `icons/icn-sum.webp`                              | `Icn_Sum.webp`                              |
| `icons/icn-war.png`                               | `Icn_War.png`                               |
| `icons/maddening-song-icon.webp`                  | `maddening_song-icon.webp`                  |
| `icons/polymorph-12-13.png`                       | `polymorph-12-13.png`                       |
| `icons/pyrokinetic-burn-my-eyes-icon.png`         | `pyrokinetic_burn_my_eyes-icon.png`         |
| `icons/pyrokinetic-haste-icon.png`                | `pyrokinetic_haste-icon.png`                |
| `icons/rested.webp`                               | `rested.webp`                               |
| `icons/school-special.jpg`                        | `school-special.jpg`                        |
| `icons/skill-air-tornado.jpg`                     | `Skill_Air_Tornado.jpg`                     |
| `icons/source-icon-custom.png`                    | `source-icon-custom.png`                    |
| `icons/sp.webp`                                   | `SP.webp`                                   |
| `icons/status-effect-blessed-icon.webp`           | `status_effect_blessed-icon.webp`           |
| `icons/status-effect-charmed-icon.png`            | `status_effect_charmed-icon.png`            |
| `icons/status-effect-fortified-icon.webp`         | `status_effect_fortified-icon.webp`         |
| `icons/status-effect-frozen-icon.webp`            | `status_effect_frozen-icon.webp`            |
| `icons/status-effect-frozen-shell-icon.png`       | `status_effect_frozen_shell-icon.png`       |
| `icons/status-effect-hasted-icon.png`             | `status_effect_hasted-icon.png`             |
| `icons/status-effect-infectious-disease-icon.png` | `status_effect_infectious_disease-icon.png` |
| `icons/status-effect-raged-icon.webp`             | `status_effect_raged-icon.webp`             |
| `icons/status-effect-regenerate-icon.webp`        | `status_effect_regenerate-icon.webp`        |
| `icons/summoning-14-21.webp`                      | `summoning-14-21.webp`                      |
| `icons/summoning-18-6.webp`                       | `summoning-18-6.webp`                       |
| `icons/summoning-harmony-icon.png`                | `summoning_harmony-icon.png`                |
| `icons/warfare-enrage-icon.webp`                  | `warfare_enrage-icon.webp`                  |

## Exceptions

- The Atrophy status effect has no icon. Its empty `imageSrc` was removed, and the status-effect `imageSrc` field is now optional.
- No AWS or wiki image request remains.
