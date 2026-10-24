import { css } from "styled-system/css";
import { visuallyHidden } from "styled-system/patterns";

import { uiImages } from "@/assets.ts";
import { costLabel } from "@/skill-details/skill-details.ts";

const pointIcon = css({ height: "icon.point", width: "icon.point" });

const points = (amount: number, src: string, kind: string) =>
  Array.from({ length: amount }, (_, index) => (
    <img
      alt=""
      className={pointIcon}
      decoding="async"
      height={20}
      key={`${kind}-${index}`}
      loading="lazy"
      src={src}
      width={20}
    />
  ));

export function PointCosts(props: {
  readonly actionPoints: number;
  readonly sourcePoints: number;
}) {
  return (
    <span
      className={css({
        alignItems: "center",
        display: "inline-flex",
        flexWrap: "wrap",
        gap: "0.5",
        justifyContent: "center",
      })}
    >
      <span aria-hidden="true" className={css({ display: "contents" })}>
        {points(props.actionPoints, uiImages.actionPoint, "ap")}
        {points(props.sourcePoints, uiImages.sourcePoint, "sp")}
      </span>
      <span className={visuallyHidden()}>{costLabel(props)}</span>
    </span>
  );
}
