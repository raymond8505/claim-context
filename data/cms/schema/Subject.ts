import * as z from "zod";
import { Source } from "./Source";

export const Subject = z
  .object({
    id: z.string().describe("Unique ID").meta({ hidden: true }),
    title: z.string().describe("Short description of the subject"),
    summary: z
      .string()
      .describe("AI Generated summary of the subject based on its sources"),
    sources: z
      .array(z.string())
      .describe("Sources describing this subject")
      .meta({
        relationship: {
          type: typeof Source,
          displayField: "title",
        },
      }),
  })
  .meta({
    label: "Subjects",
  });
