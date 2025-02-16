import { z } from "zod";

export const educationsSchema = z
  .object({
    title: z.string().min(1, "El título es requerido"),
    institution: z.string().min(1, "La institución es requerida"),
    educationType: z.string().min(1, "El tipo de educación es requerido"),
    startDate: z.date(),
    endDate: z.date().nullable(),
    currentlyStudying: z.boolean(),
    description: z.string().nullable(),
    multimedia: z.any().nullable(),
  })
  .refine((data) => (data.currentlyStudying ? !data.endDate : !!data.endDate), {
    message: "La fecha de fin es requerida si no está estudiando actualmente",
    path: ["endDate"],
  });
