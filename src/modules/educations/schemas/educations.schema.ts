import { z } from "zod";

export const educationsSchema = z.object({
  institution: z.string().min(1, "La institución es requerida"),
  degree: z.string().min(1, "El grado es requerido"),
  field: z.string().min(1, "El campo de estudio es requerido"),
  startDate: z.date({
    required_error: "La fecha de inicio es requerida",
    invalid_type_error: "La fecha de inicio debe ser una fecha válida",
  }),
  endDate: z
    .date({
      invalid_type_error: "La fecha de fin debe ser una fecha válida",
    })
    .nullable(),
  currentlyStudying: z.boolean().default(false),
  description: z.string().nullable(),
  multimedia: z
    .array(
      z.object({
        url: z.string(),
        key: z.string(),
        name: z.string(),
        type: z.string(),
        size: z.number(),
      })
    )
    .nullable(),
});
