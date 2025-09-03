import schema from ".";

export function getTypeBySlug(slug: string) {
  return schema.find(
    (t) => t.meta()?.label?.toString().toLocaleLowerCase() === slug
  );
}
