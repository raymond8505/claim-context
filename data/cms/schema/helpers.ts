import schema from ".";
import { TypeMeta } from "./types";

export function getTypeBySlug(slug?: string) {
  if (!slug) return undefined;
  return schema.find(
    (t) => (t.meta() as TypeMeta)?.slug.toString().toLocaleLowerCase() === slug
  );
}
