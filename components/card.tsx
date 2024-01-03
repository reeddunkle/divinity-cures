import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

import { PointCosts } from "@/components/point-costs.tsx";
import type { Skill } from "@/data/skill-schema.ts";
import { addAsterisk, compareStrings, startsWith } from "@/util/util.ts";

import * as styles from "./card.css.ts";
import { Cooldown } from "./cooldown.tsx";
import { Range } from "./range.tsx";

const abbreviations: Record<string, string> = {
  Geomancer: "Geo",
  Huntsman: "Hunts",
  Hydrosophist: "Hydro",
  Polymorph: "Poly",
  Pyrokinetic: "Pyro",
  Summoning: "Summon",
};

const abbreviateName = (name: string) => {
  return abbreviations[name] ?? name;
};

function SchoolsAndReqs(props: { schools: Skill["schools"] }) {
  return (
    <div className={styles.schoolsAndReqs}>
      {props.schools.map((school) => {
        return (
          <div className={styles.pair} key={school.id}>
            <div>{abbreviateName(school.name)}</div>
            <div className={styles.numberAndImage}>
              {!!school.requires && school.requires > 0 ?
                <div className={styles.requireNumber}>({school.requires})</div>
              : null}
              <Image
                alt={`Icon for ${school.name}`}
                className={styles.schoolImage}
                height={styles.SCHOOL_IMAGE_SIZE_PX}
                key={school.id}
                src={school.imageSrcColored}
                width={styles.SCHOOL_IMAGE_SIZE_PX}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CuresList(props: {
  className?: string;
  removes: Skill["removes"];
  immunities: Skill["immunities"];
  searchText: string;
}) {
  return (
    <div className={clsx(styles.listGrid, props.className)}>
      {props.removes.length > 0 && (
        <div>
          <div className={styles.listTitle}>Removes:</div>
          <ul className={styles.list}>
            {props.removes.map((statusEffect) => {
              const statusEffectLink = `?search=${statusEffect.toLowerCase()}`;
              const MIN_SEARCH_CHARACTERS = 3;

              return (
                <li className={styles.statusEffectItem} key={statusEffect}>
                  <Link
                    className={clsx(styles.statusEffectLink, {
                      [styles.activeLink]:
                        props.searchText.length > MIN_SEARCH_CHARACTERS &&
                        startsWith(statusEffect, props.searchText),
                    })}
                    href={statusEffectLink}
                    prefetch={false}
                  >
                    {statusEffect}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {props.immunities.length > 0 && (
        <div>
          <div className={styles.listTitle}>Immunities (*):</div>
          <ul className={styles.list}>
            {props.immunities.map((statusEffect) => {
              const statusEffectLink = `?search=${statusEffect.toLowerCase()}`;
              const MIN_SEARCH_CHARACTERS = 3;

              return (
                <li className={styles.statusEffectItem} key={statusEffect}>
                  <Link
                    className={clsx(styles.statusEffectLink, {
                      [styles.activeLink]:
                        props.searchText.length > MIN_SEARCH_CHARACTERS &&
                        startsWith(statusEffect, props.searchText),
                    })}
                    href={statusEffectLink}
                    prefetch={false}
                  >
                    {addAsterisk(statusEffect)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export function Card(
  props: Skill & {
    className?: string;
    searchText: string;
  },
) {
  const removes = props.removes.sort(compareStrings);
  const immunities = props.immunities.sort(compareStrings);

  return (
    <div className={clsx(styles.card, props.className)}>
      <div className={styles.col1}>
        <Image
          alt={`Spell icon for ${props.name}`}
          className={styles.skillImage}
          height={styles.SPELL_IMAGE_SIZE_PX}
          src={props.imageSrc}
          width={styles.SPELL_IMAGE_SIZE_PX}
        />
        <PointCosts ap={props.actionPoints} sp={props.sourcePoints} />
        <Cooldown cooldown={props.cooldown} />
        <Range range={props.range} />
      </div>
      <div className={styles.col2}>
        <div className={styles.title}>{props.name}</div>
        <CuresList
          immunities={immunities}
          removes={removes}
          searchText={props.searchText}
        />
      </div>
      <div className={styles.col3}>
        <SchoolsAndReqs schools={props.schools} />
        {/* <CollapsibleSection title="Description" text={props.description} /> */}
      </div>
    </div>
  );
}
