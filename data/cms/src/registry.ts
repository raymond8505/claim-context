import * as z from "zod";
import schema from "../schema";

export type RegisteredType = {
  description: string;
  label: string;
};
export const typeRegistry = z.registry<RegisteredType>();

schema.forEach((type) => {
  const { label, description } = type.meta() as RegisteredType;
  typeRegistry.add(type, {
    label,
    description,
  });
});
