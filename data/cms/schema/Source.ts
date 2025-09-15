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
      archive: {
        hidden: true,
      },
    } as FieldMeta),
    // dateCreated: z.date().meta({
    //   description: "Source Created",
    //   readOnly: true,
    //   label: "Created",
    //   editor: { hidden: true},
    // } as FieldMeta),
    // dateLastModified: z.date().meta({
    //   description: "Source Last Modified",
    //   readOnly: true,
    //   label: "Last Modified",
    // } as FieldMeta),
  })
  .meta({
    label: {
      plural: "Sources",
      singular: "Source",
    },
    labelField: "title",
    slug: "sources",
  } as TypeMeta);
