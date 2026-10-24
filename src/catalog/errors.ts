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

export class MismatchedCatalogReferenceError extends Schema.TaggedError<
  MismatchedCatalogReferenceError,
  { readonly brand: unique symbol }
>()("MismatchedCatalogReferenceError", {
  referenceName: Schema.String,
  sourceDataset: DatasetName,
  sourceId: Schema.String,
  targetDataset: DatasetName,
  targetId: Schema.String,
  targetName: Schema.String,
}) {}

const StatusNameField = Schema.Literals(["clearedBy", "immunities", "removes"]);

export type StatusNameField = typeof StatusNameField.Type;

export class DuplicateStatusNameError extends Schema.TaggedError<
  DuplicateStatusNameError,
  { readonly brand: unique symbol }
>()("DuplicateStatusNameError", {
  statusName: Schema.String,
}) {}

export class UnknownStatusNameError extends Schema.TaggedError<
  UnknownStatusNameError,
  { readonly brand: unique symbol }
>()("UnknownStatusNameError", {
  field: StatusNameField,
  sourceDataset: DatasetName,
  sourceId: Schema.String,
  statusName: Schema.String,
}) {}

export class AliasedStatusNameError extends Schema.TaggedError<
  AliasedStatusNameError,
  { readonly brand: unique symbol }
>()("AliasedStatusNameError", {
  canonicalName: Schema.String,
  field: StatusNameField,
  sourceDataset: DatasetName,
  sourceId: Schema.String,
  statusName: Schema.String,
}) {}

export class InconsistentStatusRemovalError extends Schema.TaggedError<
  InconsistentStatusRemovalError,
  { readonly brand: unique symbol }
>()("InconsistentStatusRemovalError", {
  missingFrom: Schema.Literals(["clearedBy", "removes"]),
  removedName: Schema.String,
  removerName: Schema.String,
}) {}

export type CatalogError =
  | CatalogDecodeError
  | DuplicateCatalogIdError
  | BrokenCatalogReferenceError
  | MismatchedCatalogReferenceError
  | DuplicateStatusNameError
  | UnknownStatusNameError
  | AliasedStatusNameError
  | InconsistentStatusRemovalError;
