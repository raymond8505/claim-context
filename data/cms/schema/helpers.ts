import schema from ".";
import { TypeMeta } from "./types";

export function getTypeBySlug(slug?: string) {
  if (!slug) return undefined;
  return schema.find(
    (t) => (t.meta() as TypeMeta)?.slug.toString().toLocaleLowerCase() === slug
  );
}

/**
 * Gets the title of an item based on its type slug's meta labelField otherwise "title"
 * @param item
 * @param typeSlug
 * @returns
 */
export function getTitle(item: Record<string, unknown>, typeSlug: string) {
  const type = getTypeBySlug(typeSlug);

  return type
    ? item?.[(type.meta() as TypeMeta).labelField ?? "title"]
    : "undefined";
}
