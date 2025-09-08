import * as z from "zod";
import { Source } from "./Source";
import { FieldMeta, TypeMeta } from "./types";

export const Subject = z
  .object({
    id: z.string().meta({
      hidden: true,
      description: "Unique ID",
      label: "ID",
    } as FieldMeta),
    title: z.string().meta({
      description: "Short description of the subject",
      label: "Title",
    } as FieldMeta),
    summary: z.string().meta({
      description: "AI Generated summary of the subject based on its sources",
      label: "Summary",
      multiline: true,
    } as FieldMeta),
    sources: z.array(Source).meta({
      description: "Sources describing this subject",
      label: "Sources",
      relationship: {
        type: Source,
        displayField: "title",
      },
    } as FieldMeta),
    dateCreated: z.date().meta({
      description: "Source Created",
      readonly: true,
      label: "Created",
    } as FieldMeta),
    dateLastModified: z
      .date()
      .meta({
        description: "Source Last Modified",
        readonly: true,
        label: "Last Modified",
      } as FieldMeta),
  })
  .meta({
    label: {
      singular: "Subject",
      plural: "Subjects",
    },
    labelField: "title",
  } as TypeMeta);
