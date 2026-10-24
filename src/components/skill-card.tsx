import { Tooltip } from "@base-ui/react/tooltip";
import { Link, useRouter } from "@tanstack/react-router";
import type { MouseEvent, ReactNode } from "react";

import { css, cx } from "../../styled-system/css";
import { visuallyHidden } from "../../styled-system/patterns";
import { card, tooltip } from "../../styled-system/recipes";
import type { SearchResult } from "../search/search.ts";
import {
  cooldownLabel,
  rangeLabel,
  type SchoolRequirement,
  schoolRequirements,
} from "../skill-details/skill-details.ts";
import { navigateToQuery } from "../url-state/search-navigation.ts";
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

function Stat(props: {
  readonly children: ReactNode;
  readonly term: string;
  readonly title?: string;
}) {
  return (
    <div
      className={css({ display: "flex", justifyContent: "center", justifySelf: "stretch" })}
      title={props.title}
    >
      <dt className={visuallyHidden()}>{props.term}</dt>
      <dd className={css({ display: "flex", justifyContent: "center" })}>{props.children}</dd>
    </div>
  );
}

const isPlainClick = (event: MouseEvent) =>
  event.button === 0 && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey;

const schoolLink = css({
  borderRadius: "sm",
  display: "flex",
  flexDirection: "column",
  gap: "0.5",
  outlineOffset: "0.5",
  _hover: {
    outlineColor: "match.background/50",
    outlineStyle: "solid",
    outlineWidth: "2px",
  },
});

const matchedSchoolLink = css({
  outlineColor: "match.background",
  outlineStyle: "solid",
  outlineWidth: "2px",
  _hover: { outlineColor: "match.background" },
});

function SchoolLink(props: { readonly isMatch: boolean; readonly requirement: SchoolRequirement }) {
  const router = useRouter();
  const { requirement } = props;
  const styles = tooltip();

  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        render={
          <Link
            aria-label={`Search ${requirement.name} skills`}
            className={cx(schoolLink, props.isMatch && matchedSchoolLink)}
            onClick={(event) => {
              if (isPlainClick(event)) {
                event.preventDefault();
                void navigateToQuery(router, requirement.name, "commit", { resetScroll: true });
              }
            }}
            search={{ search: requirement.name }}
            to="/"
          />
        }
      >
        {Array.from({ length: requirement.count }, (_, index) => (
          <img
            alt=""
            className={css({ height: "icon.schoolGutter", width: "icon.schoolGutter" })}
            decoding="async"
            height={32}
            key={index}
            loading="lazy"
            src={requirement.imageSrc}
            width={32}
          />
        ))}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner className={styles.positioner} side="left" sideOffset={8}>
          <Tooltip.Popup className={styles.popup}>
            <Tooltip.Arrow className={styles.arrow} />
            {requirement.label}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export function SkillCard(props: { readonly result: SearchResult }) {
  const { cures, isNameMatch, matchedSchoolIds, skill } = props.result;
  const styles = card();
  const titleId = `skill-${skill.id}-title`;

  return (
    <article aria-labelledby={titleId} className={styles.root}>
      <h2 className={styles.title} id={titleId}>
        {isNameMatch ? <mark>{skill.name}</mark> : skill.name}
      </h2>
      <div className={styles.stats}>
        <img
          alt=""
          className={styles.icon}
          decoding="async"
          height={56}
          loading="lazy"
          src={skill.imageSrc}
          width={56}
        />
        <dl className={css({ display: "grid", gap: "2", justifySelf: "stretch" })}>
          <Stat term="Cost">
            <PointCosts actionPoints={skill.actionPoints} sourcePoints={skill.sourcePoints} />
          </Stat>
          <Stat term="Cooldown" title={`Cooldown: ${cooldownLabel(skill.cooldown)}`}>
            <CooldownDial cooldown={skill.cooldown} />
          </Stat>
          <Stat term="Range" title={`Range: ${rangeLabel(skill.range)}`}>
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
          <li key={requirement.id}>
            <SchoolLink
              isMatch={matchedSchoolIds.includes(requirement.id)}
              requirement={requirement}
            />
            <span className={visuallyHidden()}>{requirement.label}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
