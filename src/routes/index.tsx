import { createFileRoute } from "@tanstack/react-router";

import { catalog } from "../catalog/index.ts";

function HomeRoute() {
  return (
    <main>
      <h1>Divinity Cures</h1>
      <p>
        Catalog ready:
        {" "}
        {catalog.skills.length}
        {" "}
        skills,
        {" "}
        {catalog.statusEffects.length}
        {" "}
        status effects, and
        {" "}
        {catalog.schools.length}
        {" "}
        schools.
      </p>
    </main>
  );
}

export const Route = createFileRoute("/")({
  component: HomeRoute,
});
