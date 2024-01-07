import Link from "next/link";

import { siteConfig } from "@/config/site.ts";

import * as styles from "./page.css.ts";

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        <Link href="/about" prefetch={false}>
          About
        </Link>
      </h1>
      <section>
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum quas
          fugit nisi, quidem pariatur magnam odio, enim asperiores, quam
          reprehenderit qui sunt. Delectus reprehenderit modi ipsam nemo vitae
          quaerat aliquam?
        </div>
      </section>
      <section>
        <ul>
          {Object.entries(siteConfig.links).map(([name, href]) => {
            return (
              <li key={name}>
                <Link className={styles.siteLink} href={href}>
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
