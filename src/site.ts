export const site = {
  description: "Find cures in Divinity: Original Sin 2",
  game: "Divinity: Original Sin 2",
  links: {
    issues: "https://github.com/reeddunkle/divinity-cures/issues",
    source: "https://github.com/reeddunkle/divinity-cures",
  },
  name: "Divinity Cures",
} as const;

export const pageTitle = (title?: string) =>
  title === undefined ? site.name : `${title} - ${site.name}`;
