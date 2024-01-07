import { clsx } from "clsx";
import Link from "next/link";

import type { Skill } from "@/data/skill-schema.ts";
import { addAsterisk, startsWith } from "@/util/util.ts";

import * as styles from "./cures-list.css.ts";

function CuresUl(props: {
  cures: string[];
  isActive?: (text: string) => boolean;
}) {
  return (
    <ul className={styles.list}>
      {props.cures.map((statusEffect) => {
        const statusEffectLink = `?search=${statusEffect.toLowerCase()}`;

        return (
          <li className={styles.statusEffectItem} key={statusEffect}>
            <Link
              className={clsx(styles.statusEffectLink, {
                [styles.activeLink]: props.isActive?.(statusEffect),
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
  );
}

const MIN_SEARCH_CHARACTERS = 3;

export function CuresList(props: {
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
          <CuresUl
            cures={props.removes}
            isActive={(statusEffect) =>
              props.searchText.length > MIN_SEARCH_CHARACTERS &&
              startsWith(statusEffect, props.searchText)
            }
          />
        </div>
      )}
      {props.immunities.length > 0 && (
        <div>
          <div className={styles.listTitle}>Immunities (*):</div>
          <CuresUl
            cures={props.immunities.map(addAsterisk)}
            isActive={(statusEffect) =>
              props.searchText.length > MIN_SEARCH_CHARACTERS &&
              startsWith(statusEffect, props.searchText)
            }
          />
        </div>
      )}
    </div>
  );
}
