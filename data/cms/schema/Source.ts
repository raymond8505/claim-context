import * as z from "zod";
import { FieldMeta, TypeMeta } from "./types";
export const Source = z
  .object({
    id: z.string().meta({
      hidden: true,
      label: "ID",
      description: "Unique ID",
    } as FieldMeta),
    title: z
      .string()
      .meta({ description: "Source Title", label: "Title" } as FieldMeta),
    url: z.url().meta({ description: "Source URL", label: "URL" } as FieldMeta),
    body: z.string().meta({
      description: "Source Body",
      label: "Body",
      multiline: true,
    } as FieldMeta),
    dateCreated: z
      .date()
      .meta({ description: "Source Created", readonly: true } as FieldMeta),
    dateLastModified: z.date().meta({
      description: "Source Last Modified",
      readonly: true,
      label: "Last Modified",
    } as FieldMeta),
  })
  .meta({
    label: {
      plural: "Sources",
      singlular: "Source",
    },
    labelField: "title",
  } as TypeMeta);
