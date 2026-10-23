import * as Schema from "effect/Schema";

const DatasetName = Schema.Literals(["skills", "spellSchools", "statusEffects"]);

export type DatasetName = typeof DatasetName.Type;

export class CatalogDecodeError extends Schema.TaggedError<
  CatalogDecodeError,
  { readonly brand: unique symbol }
>()("CatalogDecodeError", {
  message: Schema.String,
}) {}

export class DuplicateCatalogIdError extends Schema.TaggedError<
  DuplicateCatalogIdError,
  { readonly brand: unique symbol }
>()("DuplicateCatalogIdError", {
  dataset: DatasetName,
  id: Schema.String,
}) {}

export class BrokenCatalogReferenceError extends Schema.TaggedError<
  BrokenCatalogReferenceError,
  { readonly brand: unique symbol }
>()("BrokenCatalogReferenceError", {
  sourceDataset: DatasetName,
  sourceId: Schema.String,
  targetDataset: DatasetName,
  targetId: Schema.String,
}) {}

export type CatalogError =
  | CatalogDecodeError
  | DuplicateCatalogIdError
  | BrokenCatalogReferenceError;
