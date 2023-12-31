import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

import { ActionPoint, SourcePoint } from "@/components/point.tsx";
import type { Skill } from "@/data/schemas.ts";
import { compareStrings, range, startsWith } from "@/util/util.ts";

import * as styles from "./card.css.ts";

type CardProps = React.HTMLProps<HTMLDivElement> &
  Skill & {
    searchText: string;
  };

export function Card(props: CardProps) {
  const cures = Array.from(
    new Set([...props.removes, ...props.immunities]),
  ).sort(compareStrings);

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
      </div>
      <div className={styles.col2}>
        <div className={styles.title}>{props.name}</div>
        <div className={styles.description}>{props.description}</div>
      </div>
      <div className={styles.col3}>
        {cures.length > 0 ? (
          <>
            <div className={styles.listTitle}>Cures:</div>
            <ul className={styles.list}>
              {cures.map((cure) => {
                const cureLink = `?search=${cure.toLowerCase()}`;
                const MIN_SEARCH_CHARACTERS = 3;

                return (
                  <li key={cure}>
                    <Link
                      className={clsx(styles.cureLink, {
                        [styles.activeCureLink]:
                          props.searchText.length > MIN_SEARCH_CHARACTERS &&
                          startsWith(cure, props.searchText),
                      })}
                      href={cureLink}
                      prefetch={false}
                    >
                      {cure}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
}
