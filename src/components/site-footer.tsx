import { css } from "../../styled-system/css";
import { textLink } from "../../styled-system/recipes";
import { site } from "../site.ts";

const footerLink = textLink({ emphasis: "nav" });

export function SiteFooter() {
  return (
    <footer
      className={css({
        borderTopColor: "border.subtle",
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        color: "text.muted",
        fontSize: "sm",
      })}
    >
      <div
        className={css({
          columnGap: "6",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginInline: "auto",
          maxWidth: "content",
          paddingBlock: "4",
          paddingInline: "page",
          rowGap: "2",
        })}
      >
        <p>Fan-made reference. Game icons © Larian Studios.</p>
        <ul className={css({ display: "flex", gap: "5", listStyleType: "none" })}>
          <li>
            <a className={footerLink} href={site.links.source}>
              Source on GitHub
            </a>
          </li>
          <li>
            <a className={footerLink} href={site.links.issues}>
              Report an issue
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
