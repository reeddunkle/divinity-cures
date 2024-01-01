import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

import { ActionPoint, SourcePoint } from "@/components/point.tsx";
import type { Skill, SpellSchool } from "@/data/schemas.ts";
import { compareStrings, range, startsWith } from "@/util/util.ts";

import * as styles from "./card.css.ts";
import { CollapsibleSection } from "./collapsible-section.tsx";
import { Cooldown } from "./cooldown.tsx";

const addAsterisk = (str: string) => {
  return `${str}*`;
};

type CardProps = React.HTMLProps<HTMLDivElement> &
  Skill & {
    spellSchools: SpellSchool[];
    searchText: string;
  };

export function Card(props: CardProps) {
  const removes = props.removes.sort(compareStrings);
  const immunities = props.immunities.sort(compareStrings);

  return (
    <div className={clsx(styles.card, props.className)}>
      <div className={styles.col1}>
        <Image
          alt={`Spell icon for ${props.name}`}
          className={styles.skillImage}
          height={styles.IMAGE_SIZE_PX}
          src={props.imageSrc}
          width={styles.IMAGE_SIZE_PX}
        />
        <div className={styles.pointCostCol}>
          {range(props.actionPoints).map((_, index) => (
            <ActionPoint className={styles.point} key={index} />
          ))}
          {range(props.sourcePoints).map((_, index) => (
            <SourcePoint className={styles.point} key={index} />
          ))}
        </div>
        <Cooldown cooldown={props.cooldown} />
      </div>
      <div className={styles.col2}>
        <div className={styles.title}>{props.name}</div>
        <div className={styles.listGrid}>
          {removes.length > 0 ? (
            <div className={styles.listGridColumn}>
              <div className={styles.listTitle}>Removes:</div>
              <ul className={styles.list}>
                {removes.map((statusEffect) => {
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
          ) : null}
          {immunities.length > 0 ? (
            <div className={styles.listGridColumn}>
              <div className={styles.listTitle}>Immunities (*):</div>
              <ul className={styles.list}>
                {immunities.map((statusEffect) => {
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
          ) : null}
        </div>
      </div>
      <div className={styles.col3}>
        {props.spellSchools.map((school) => {
          return (
            <div className={styles.schoolIconGroup} key={school.id}>
              <Image
                alt={`Icon for ${school.name}`}
                height={48}
                src={school.imageSrcColored}
                width={48}
              />
            </div>
          );
        })}
        <CollapsibleSection title="Description" text={props.description} />
      </div>
    </div>
  );
}
