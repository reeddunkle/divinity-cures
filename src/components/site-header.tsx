import { Link } from "@tanstack/react-router";
import { css } from "styled-system/css";
import { textLink } from "styled-system/recipes";

import { uiImages } from "@/assets.ts";
import { site } from "@/site.ts";

const navLink = textLink({ emphasis: "nav" });

export function SiteHeader() {
  return (
    <header
      className={css({
        borderBottomColor: "border.subtle",
        borderBottomStyle: "solid",
        borderBottomWidth: "1px",
      })}
    >
      <div
        className={css({
          alignItems: "center",
          columnGap: "6",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginInline: "auto",
          maxWidth: "content",
          paddingBlock: "3",
          paddingInline: "page",
          rowGap: "2",
        })}
      >
        <Link
          className={css({
            alignItems: "center",
            display: "flex",
            gap: "3",
            textDecorationLine: "none",
          })}
          to="/"
        >
          <img
            alt=""
            className={css({ height: "icon.logo", width: "icon.logo" })}
            height={40}
            src={uiImages.logo}
            width={40}
          />
          <span className={css({ display: "grid" })}>
            <span className={css({ fontSize: "lg", fontWeight: "bold" })}>{site.name}</span>
            <span className={css({ color: "text.muted", fontSize: "xs" })}>{site.game}</span>
          </span>
        </Link>
        <nav aria-label="Primary">
          <ul className={css({ display: "flex", gap: "5", listStyleType: "none" })}>
            <li>
              <Link activeOptions={{ includeSearch: false }} className={navLink} to="/">
                Cures
              </Link>
            </li>
            <li>
              <Link className={navLink} to="/about">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
