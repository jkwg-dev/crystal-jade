import type { SchemaTypeDefinition } from "sanity";
import { dish } from "./dish";
import { factRow } from "./factRow";
import { restaurant } from "./restaurant";
import { siteImage } from "./siteImage";

/**
 * Every Studio schema type: the two documents (restaurant singleton, dish)
 * and the shared objects they compose (siteImage, factRow).
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  siteImage,
  factRow,
  restaurant,
  dish,
];
