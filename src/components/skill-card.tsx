import type { ReactNode } from "react";

import { css } from "../../styled-system/css";
import { visuallyHidden } from "../../styled-system/patterns";
import { card } from "../../styled-system/recipes";
import type { SearchResult } from "../search/search.ts";
import { schoolRequirements } from "../skill-details/skill-details.ts";
import { CooldownDial } from "./cooldown-dial.tsx";
import { CureBadge } from "./cure-badge.tsx";
import { PointCosts } from "./point-costs.tsx";
import { RangeIndicator } from "./range-indicator.tsx";

const inlineList = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "2",
  listStyleType: "none",
});

function Stat(props: { readonly children: ReactNode; readonly term: string }) {
  return (
    <div className={css({ display: "flex", justifyContent: "center" })}>
      <dt className={visuallyHidden()}>{props.term}</dt>
      <dd className={css({ display: "flex", justifyContent: "center" })}>{props.children}</dd>
    </div>
  );
}

export function SkillCard(props: { readonly result: SearchResult }) {
  const { cures, isNameMatch, skill } = props.result;
  const styles = card();
  const titleId = `skill-${skill.id}-title`;

  return (
    <article aria-labelledby={titleId} className={styles.root}>
      <h2 className={styles.title} id={titleId}>
        {isNameMatch ? <mark>{skill.name}</mark> : skill.name}
      </h2>
      <div className={styles.stats}>
        <img alt="" className={styles.icon} height={56} src={skill.imageSrc} width={56} />
        <dl className={css({ display: "grid", gap: "2" })}>
          <Stat term="Cost">
            <PointCosts actionPoints={skill.actionPoints} sourcePoints={skill.sourcePoints} />
          </Stat>
          <Stat term="Cooldown">
            <CooldownDial cooldown={skill.cooldown} />
          </Stat>
          <Stat term="Range">
            <RangeIndicator range={skill.range} />
          </Stat>
        </dl>
      </div>
      <div className={styles.content}>
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
        <details className={styles.description}>
          <summary className={styles.descriptionSummary}>Description</summary>
          <p className={styles.descriptionBody}>{skill.description}</p>
        </details>
      </div>
      <ul aria-label="School requirements" className={styles.gutter}>
        {schoolRequirements(skill).map((requirement) => (
          <li
            className={css({ display: "flex", flexDirection: "column", gap: "0.5" })}
            key={requirement.id}
            title={requirement.label}
          >
            {Array.from({ length: requirement.count }, (_, index) => (
              <img
                alt=""
                className={css({ height: "icon.schoolGutter", width: "icon.schoolGutter" })}
                height={32}
                key={index}
                src={requirement.imageSrc}
                width={32}
              />
            ))}
            <span className={visuallyHidden()}>{requirement.label}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
