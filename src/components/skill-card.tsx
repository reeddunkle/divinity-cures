import type { ReactNode } from "react";

import { css } from "../../styled-system/css";
import { card } from "../../styled-system/recipes";
import type { SearchResult } from "../search/search.ts";
import { cooldownLabel, rangeLabel, schoolRequirements } from "../skill-details/skill-details.ts";
import { CureBadge } from "./cure-badge.tsx";
import { PointCosts } from "./point-costs.tsx";

const inlineList = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "2",
  listStyleType: "none",
});

function Stat(props: { readonly children: ReactNode; readonly term: string }) {
  return (
    <div className={css({ display: "grid", gap: "0.5" })}>
      <dt className={css({ color: "text.muted", fontSize: "xs" })}>{props.term}</dt>
      <dd className={css({ alignItems: "center", display: "flex", minHeight: "icon.point" })}>
        {props.children}
      </dd>
    </div>
  );
}

export function SkillCard(props: { readonly result: SearchResult }) {
  const { cures, isNameMatch, skill } = props.result;
  const styles = card();
  const titleId = `skill-${skill.id}-title`;

  return (
    <article aria-labelledby={titleId} className={styles.root}>
      <header className={styles.header}>
        <img alt="" className={styles.icon} height={56} src={skill.imageSrc} width={56} />
        <div className={css({ display: "grid", gap: "1" })}>
          <h2 className={styles.title} id={titleId}>
            {isNameMatch ? <mark>{skill.name}</mark> : skill.name}
          </h2>
          <ul aria-label="School requirements" className={inlineList}>
            {schoolRequirements(skill).map((requirement) => (
              <li
                className={css({
                  alignItems: "center",
                  color: "text.muted",
                  display: "flex",
                  fontSize: "sm",
                  gap: "1",
                })}
                key={requirement.id}
              >
                <img
                  alt=""
                  className={css({ height: "icon.school", width: "icon.school" })}
                  height={24}
                  src={requirement.imageSrc}
                  width={24}
                />
                {requirement.label}
              </li>
            ))}
          </ul>
        </div>
      </header>
      <dl className={css({ columnGap: "6", display: "flex", flexWrap: "wrap", rowGap: "2" })}>
        <Stat term="Cost">
          <PointCosts actionPoints={skill.actionPoints} sourcePoints={skill.sourcePoints} />
        </Stat>
        <Stat term="Cooldown">{cooldownLabel(skill.cooldown)}</Stat>
        <Stat term="Range">{rangeLabel(skill.range)}</Stat>
      </dl>
      <section aria-labelledby={`${titleId}-cures`} className={styles.section}>
        <h3 className={styles.sectionTitle} id={`${titleId}-cures`}>
          Cures
        </h3>
        <ul className={inlineList}>
          {cures.map((cure) => (
            <li key={cure.status}>
              <CureBadge cure={cure} />
            </li>
          ))}
        </ul>
      </section>
      <details className={styles.section}>
        <summary
          className={css({
            color: "text.muted",
            cursor: "pointer",
            fontSize: "sm",
            fontWeight: "semibold",
            width: "fit-content",
          })}
        >
          Description
        </summary>
        <p className={css({ maxWidth: "prose", whiteSpace: "pre-line" })}>{skill.description}</p>
      </details>
    </article>
  );
}
