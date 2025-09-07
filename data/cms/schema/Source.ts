import * as z from "zod";
export const Source = z
  .object({
    id: z
      .string()
      .meta({ hidden: true, label: "ID", description: "Unique ID" }),
    title: z.string().meta({ description: "Source Title", label: "Title" }),
    url: z.url().meta({ description: "Source URL", label: "URL" }),
    body: z
      .string()
      .meta({ description: "Source Body", label: "Body", multiline: true }),
    dateCreated: z.date().meta({ description: "Source Created", hidden: true }),
    dateLastModified: z.date().meta({
      description: "Source Last Modified",
      readonly: true,
      label: "Last Modified",
    }),
  })
  .meta({
    label: {
      plural: "Sources",
      singlular: "Source",
    },
    labelField: "title",
  });
