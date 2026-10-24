import { createFileRoute, Link } from "@tanstack/react-router";
import { css } from "styled-system/css";
import { textLink } from "styled-system/recipes";

import { Page } from "@/components/page.tsx";
import { pageHead, site } from "@/site.ts";

const list = css({
  display: "grid",
  gap: "2",
  listStyleType: "disc",
  paddingInlineStart: "6",
});

function AboutRoute() {
  return (
    <Page title="About">
      <div className={css({ display: "grid", gap: "5", maxWidth: "prose" })}>
        <p>
          A <strong>cure</strong> is a skill that removes a <strong>status effect</strong> in one of
          two ways:
        </p>
        <ul className={list}>
          <li>It removes the status effect directly.</li>
          <li>
            It applies a different status effect, which in turn removes the first one. That status
            often grants immunity as well, marked with a shield icon.
          </li>
        </ul>
        <section className={css({ display: "grid", gap: "2" })}>
          <h2 className={css({ fontSize: "xl", fontWeight: "bold" })}>Example</h2>
          <ul className={list}>
            <li>
              <strong>First Aid</strong> removes <strong>Disarmed</strong> and{" "}
              <strong>Knocked Down</strong>, and it grants <strong>Rested</strong>.
            </li>
            <li>
              <strong>Rested</strong> grants immunity to, and removes, <strong>Blinded</strong>,{" "}
              <strong>Crippled</strong>, <strong>Knocked Down</strong>, and{" "}
              <strong>Silenced</strong>.
            </li>
            <li>
              <strong>First Aid</strong> therefore cures all of these,{" "}
              <Link className={textLink()} search={{ search: "first aid" }} to="/">
                and more
              </Link>
              .
            </li>
          </ul>
        </section>
        <p>The line between direct and indirect is blurry, so both count equally as a cure.</p>
        <p>
          A cure doesn&apos;t have to remove something harmful. <strong>Enrage</strong> removes{" "}
          <strong>Clear-Minded</strong>, a helpful status, and that counts as a cure too.
        </p>
        <p>
          I hand-coded this data. If I missed anything, please{" "}
          <a className={textLink()} href={site.links.issues}>
            let me know
          </a>
          .
        </p>
      </div>
    </Page>
  );
}

export const Route = createFileRoute("/about")({
  component: AboutRoute,
  head: () => pageHead({ path: "/about", title: "About" }),
});
