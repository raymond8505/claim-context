import * as z from "zod";
export const Source = z
  .object({
    id: z.string().describe("Unique ID").meta({ hidden: true }),
    title: z.string().describe("Source Title"),
    url: z.url().describe("Source URL"),
    dataCreated: z.date().describe("Source Created"),
    sourceLastModified: z.date().describe("Source Last Modified"),
  })
  .meta({
    label: "Sources",
  });
