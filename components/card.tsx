import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

import { PointCosts } from "@/components/point-costs.tsx";
import type { Skill, SpellSchool } from "@/data/schemas.ts";
import { addAsterisk, compareStrings, startsWith } from "@/util/util.ts";

import * as styles from "./card.css.ts";
import { Cooldown } from "./cooldown.tsx";

type RequirementsProps = {
  reqs: Skill["requirements"];
};

function Requirements(props: RequirementsProps) {
  return (
    <div className={styles.requirements}>
      {props.reqs.length > 0 && (
        <>
          <div className={styles.listTitle}>Requires:</div>
          <ul className={styles.list}>
            {props.reqs.map((requirement) => {
              return (
                <li className={styles.statusEffectItem} key={requirement.id}>
                  {requirement.name}: {requirement.number}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

type SchoolIconsProps = {
  schools: SpellSchool[];
};

function SchoolIcons(props: SchoolIconsProps) {
  return (
    <div className={styles.schoolIcons}>
      {props.schools.map((school) => {
        return (
          <Image
            alt={`Icon for ${school.name}`}
            className={styles.schoolImage}
            height={styles.SCHOOL_IMAGE_SIZE_PX}
            key={school.id}
            src={school.imageSrcColored}
            width={styles.SCHOOL_IMAGE_SIZE_PX}
          />
        );
      })}
    </div>
  );
}

type CuresListProps = {
  className?: string;
  removes: Skill["removes"];
  immunities: Skill["immunities"];
  searchText: string;
};

function CuresList(props: CuresListProps) {
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

type CardProps = Skill & {
  className?: string;
  searchText: string;
  spellSchools: SpellSchool[];
};

export function Card(props: Skill & CardProps) {
  const removes = props.removes.sort(compareStrings);
  const immunities = props.immunities.sort(compareStrings);

  const requirements = props.requirements.sort((reqA, reqB) => {
    return compareStrings(reqA.name, reqB.name);
  });

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
        <SchoolIcons schools={props.spellSchools} />
        <Requirements reqs={requirements} />
        {/* <CollapsibleSection title="Description" text={props.description} /> */}
      </div>
    </div>
  );
}
