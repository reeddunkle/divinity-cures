# Catalog content

The catalog data was inherited from the Next.js application, which was hand-coded from in-game text. This page records which facts have been checked, where corrections came from, and which questions remain open. Where no trustworthy answer exists, the catalog keeps what the Next.js application used.

The main secondary source is [dos2.wiki](https://dos2.wiki), a fan wiki that quotes in-game tooltips. Its pages were imported from Fandom and are not all up to date, so a tooltip quote counts as stronger evidence than its prose.

## Corrections

| Change                                                                                                                                                                      | Evidence                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The Maddening Song status is named **Mad**, with **Madness** kept as an alias. Cures that listed "Madness" now list "Mad", and Clear-Minded lists it once instead of twice. | The game's own tooltips call it Mad: [Maddening Song](https://dos2.wiki/wiki/Maddening_Song) reads "Set Mad for 1 turn(s)", and [Peace of Mind](https://dos2.wiki/wiki/Peace_Of_Mind) "Removes … Enraged and Mad". The [Status Effects](https://dos2.wiki/wiki/Status_Effects) table labels the same status "Madness", with the Maddening Song icon and cause, and lists it as "Mad" among Permafrost's immunities. |
| The status Skin Graft applies is **Shed Skin**, described as "Resets all cooldowns." instead of "MISSING INFO".                                                             | The [Skin Graft](https://dos2.wiki/wiki/Skin_Graft) tooltip reads "Reset all cooldowns. … Set Shed Skin for 0 turn(s)." The status's own tooltip was not found, so the description restates the skill's effect.                                                                                                                                                                                                     |
| Enraged's stat is **Critical Chance**, not "Critical Change".                                                                                                               | The [Status Effects](https://dos2.wiki/wiki/Status_Effects) table lists Enraged with "Critical Chance + 100 %".                                                                                                                                                                                                                                                                                                     |

Search matches aliases as well as canonical names, so "madness" still finds every Mad cure.

## Confirmed by the project owner

- Fortify grants immunity to being teleported. The [Fortify](https://dos2.wiki/wiki/Fortify) tooltip agrees: "While Fortified, the target cannot be teleported."
- Skin Graft is the only skill with a once-per-combat cooldown.
- A range of 0 is shown as `0 m`, because that is what the game shows. It effectively means melee range or self.

## Open questions

- **Infected and Infectious Disease.** Fortify removes both, and Break the Shackles removes Infectious Disease. The [Infect](https://dos2.wiki/wiki/Infect) page describes a spreading "infectious disease" that inflicts an Infected status, and the game files include an Infectious Disease icon, but its tooltip quote is broken. Fortify's tooltip lists neither, while its prose says it removes "Diseased and Infected". Both names are kept until a tooltip settles whether they are one status.
- **Frightened and Terrified.** Peace of Mind and Enrage remove Frightened. The wiki has a [Terrified](<https://dos2.wiki/wiki/Terrified_(Status)>) page and a Frightened status icon from the game files, but no page describes Frightened, and neither skill's tooltip mentions it. Both names are kept.
- **Peace of Mind's extra cures.** The data says Peace of Mind removes Drunk and Frightened, which its tooltip does not list. They may come from Clear-Minded, from in-game testing, or from an older patch.
- **Removing beneficial statuses.** Enrage removes Clear-Minded, which is a buff, and the catalog counts it as a cure, as the Next.js application did. Whether only negative statuses should count is undecided.
