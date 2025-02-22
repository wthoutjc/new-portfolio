import { z } from "zod";

export const educationsSchema = z
  .object({
    title: z.string().min(1, "The title is required"),
    institution: z.string().min(1, "The institution is required"),
    educationType: z.string().min(1, "The education type is required"),
    startDate: z.date(),
    endDate: z.date().nullable(),
    currentlyStudying: z.boolean(),
    description: z.string().nullable(),
    multimedia: z.any().nullable(),
  })
  .refine((data) => (data.currentlyStudying ? !data.endDate : !!data.endDate), {
    message: "The end date is required if you are not currently studying",
    path: ["endDate"],
  });
