# Catalog content

The catalog data was inherited from the Next.js application, which was hand-coded from in-game text. This page records which facts have been checked, where corrections came from, and which questions remain open. Where no trustworthy answer exists, the catalog keeps what the Next.js application used.

The main secondary source is [dos2.wiki](https://dos2.wiki), a fan wiki that quotes in-game tooltips. Its pages were imported from Fandom and are not all up to date, so a tooltip quote counts as stronger evidence than its prose.

## Data model

The catalog keeps every mined fact, including facts the app does not show yet. A field marked _shown_ appears in the app today.

### Skills

| Field            | Meaning                                                                                                                                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`             | Stable identifier.                                                                                                                                                                                                     |
| `name`           | In-game skill name. _Shown_ and searched.                                                                                                                                                                              |
| `description`    | Tooltip text as mined. _Shown._                                                                                                                                                                                        |
| `imageSrc`       | Skill icon. _Shown._                                                                                                                                                                                                   |
| `schools`        | Schools the skill belongs to, each with the school level it `requires`. _Shown_ and searched.                                                                                                                          |
| `actionPoints`   | Action Points to cast. _Shown._                                                                                                                                                                                        |
| `sourcePoints`   | Source Points to cast. _Shown._                                                                                                                                                                                        |
| `cooldown`       | Turns before the skill can be cast again; 0 means none, and `oncePerCombat` means once per combat. _Shown._                                                                                                            |
| `memory`         | Memory slots the skill takes.                                                                                                                                                                                          |
| `range`          | Range in meters; 0 means melee range or self. _Shown._                                                                                                                                                                 |
| `removes`        | Statuses casting the skill removes. _Shown_ as cures.                                                                                                                                                                  |
| `immunities`     | Statuses the skill itself grants immunity to, apart from any applied status. _Shown_ as cures.                                                                                                                         |
| `stats`          | Stats the skill changes, as an `amount` or a `percent`. `scales` means the value grows with the caster.                                                                                                                |
| `statusEffects`  | Statuses the skill applies, with their `duration` in turns. A `description`, `imageSrc`, or `stats` here describes this skill's version of the status. Their removals and immunities are _shown_ as the skill's cures. |
| `surfaces`       | Surfaces the skill creates, such as the water puddle under Cleanse Wounds.                                                                                                                                             |
| `surfaceRemoves` | Surfaces the skill clears, such as Tornado clearing Deathfog and Lava.                                                                                                                                                 |
| `notes`          | Observed behavior the tooltip does not mention.                                                                                                                                                                        |

### Status effects

| Field         | Meaning                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------- |
| `id`          | Stable identifier.                                                                                  |
| `name`        | Canonical status name. _Shown_ and searched.                                                        |
| `aliases`     | Other names for the same status. Searched, and never used in another record.                        |
| `description` | The status's own tooltip text, when it has been mined.                                              |
| `imageSrc`    | Status icon.                                                                                        |
| `removes`     | Statuses this status removes when applied. _Shown_ as cures of skills that apply it.                |
| `immunities`  | Statuses this status grants immunity to. _Shown_ as cures of skills that apply it.                  |
| `stats`       | Stats the status changes, as an `amount` or a `percent`. `scales` means the value grows with level. |
| `scales`      | Whether the status's effect grows with level.                                                       |
| `givenBy`     | Sources other than skills that apply the status, such as Blessed Oil Surface.                       |

The loader derives each status's `clearedBy`, the statuses whose `removes` lists it, so that fact is written only once.

### Spell schools

| Field             | Meaning                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| `id`              | Stable identifier.                                                                                      |
| `name`            | In-game school name. _Shown_ and searched.                                                              |
| `description`     | What investing in the school does.                                                                      |
| `imageSrc`        | The school's plain ability icon.                                                                        |
| `imageSrcColored` | The school's colored icon. _Shown._                                                                     |
| `modifies`        | Damage or restoration types each school point increases, by `amount` or `percent`.                      |
| `effects`         | Other benefits each school point grants, such as Necromancer's healing or Polymorph's attribute points. |

### Status names and cures

A **cure** is any status a skill removes or grants immunity to, directly or through a status it applies, whether the removed status is harmful or not. Enrage removes Clear-Minded, a buff, and that counts as a cure.

Every name in a `removes` or `immunities` list must be the canonical name of a status record, so the build fails on a misspelling or an alias. A status's canonical name is the one the game shows for the status itself, on its icon or its own tooltip. Names from skill tooltips or the wiki that differ become aliases. Where no source settles a name, the project owner decides from play.

## Corrections

| Change                                                                                                                                                                      | Evidence                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The Maddening Song status is named **Mad**, with **Madness** kept as an alias. Cures that listed "Madness" now list "Mad", and Clear-Minded lists it once instead of twice. | The game's own tooltips call it Mad: [Maddening Song](https://dos2.wiki/wiki/Maddening_Song) reads "Set Mad for 1 turn(s)", and [Peace of Mind](https://dos2.wiki/wiki/Peace_Of_Mind) "Removes … Enraged and Mad". The [Status Effects](https://dos2.wiki/wiki/Status_Effects) table labels the same status "Madness", with the Maddening Song icon and cause, and lists it as "Mad" among Permafrost's immunities. |
| The status Skin Graft applies is **Shed Skin**, described as "Resets all cooldowns." instead of "MISSING INFO".                                                             | The [Skin Graft](https://dos2.wiki/wiki/Skin_Graft) tooltip reads "Reset all cooldowns. … Set Shed Skin for 0 turn(s)." The status's own tooltip was not found, so the description restates the skill's effect.                                                                                                                                                                                                     |
| Enraged's stat is **Critical Chance**, not "Critical Change".                                                                                                               | The [Status Effects](https://dos2.wiki/wiki/Status_Effects) table lists Enraged with "Critical Chance + 100 %".                                                                                                                                                                                                                                                                                                     |
| The Silencing Stare status is named **Silenced**, with **Muted** kept as an alias. Rested's immunity to "Muted" now lists "Silenced", and the Muted record is gone.         | The [Silencing Stare](https://dos2.wiki/wiki/Silencing_Stare) tooltip reads "Set Silenced for 1 turn(s)", and the [First Aid](https://dos2.wiki/wiki/First_Aid) tooltip cures "Silenced". The [Status Effects](https://dos2.wiki/wiki/Status_Effects) table quotes Rested as protecting from "Muted" and has no Muted or Silenced status of its own.                                                                |
| The Throw Dust status is named **Blinded**, with **Blind** kept as an alias.                                                                                                | The [Throw Dust](https://dos2.wiki/wiki/Throw_Dust) tooltip reads "Set Blinded for 1 turn(s)", and the [Status Effects](https://dos2.wiki/wiki/Status_Effects) table names the status Blinded. The First Aid and Rested tooltips call it "Blind".                                                                                                                                                                   |

Search matches aliases as well as canonical names, so "madness" still finds every Mad cure, "muted" finds Silenced, and "blind" finds Blinded.

## Confirmed by the project owner

- Fortify grants immunity to being teleported. The [Fortify](https://dos2.wiki/wiki/Fortify) tooltip agrees: "While Fortified, the target cannot be teleported."
- Skin Graft is the only skill with a once-per-combat cooldown.
- Peace of Mind removes Drunk and Frightened, though its tooltip does not say so.
- Infected, Infectious Disease, and Diseased are three distinct statuses.
- A range of 0 is shown as `0 m`, because that is what the game shows. It effectively means melee range or self.

## Open questions

- **Frightened and Terrified.** Peace of Mind and Enrage remove Frightened. The wiki has a [Terrified](<https://dos2.wiki/wiki/Terrified_(Status)>) page and a Frightened status icon from the game files, but no page describes Frightened, and neither skill's tooltip mentions it. Both names are kept.
- **Teleport's name.** Fortified grants immunity to a status the data calls Teleport, inherited from the Next.js application. The game's own name for it has not been seen, so the name is kept until a source or play settles it.
