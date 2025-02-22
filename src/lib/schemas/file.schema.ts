import { z } from "zod";

export const fileSchema = z.object({
  url: z.string(),
  key: z.string(),
  name: z.string(),
  type: z.string(),
  size: z.number(),
});
