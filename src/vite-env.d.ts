/// <reference types="vite/client" />

declare module "virtual:bundled-catalog" {
  // oxlint-disable-next-line typescript/consistent-type-imports
  export const catalog: import("./catalog/catalog.ts").Catalog;
}
