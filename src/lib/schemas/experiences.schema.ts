import { z } from "zod";

export const experiencesSchema = z.object({
  title: z.string().min(1),
});
