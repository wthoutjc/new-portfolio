import { z } from "zod";
import { experienceSkillSchema } from "./skill.schema";
import { fileSchema } from "./file.schema";

export const experiencesSchema = z
  .object({
    title: z.string().min(1, "El título es requerido"),
    employmentType: z
      .string()
      .min(1, "El tipo de empleo es requerido")
      .nullable(),
    company: z.string().min(1, "La empresa es requerida"),
    location: z.string().min(1, "La ubicación es requerida").nullable(),
    locationType: z
      .string()
      .min(1, "El tipo de ubicación es requerido")
      .nullable(),
    startDate: z.date({
      required_error: "La fecha de inicio es requerida",
      invalid_type_error: "La fecha de inicio debe ser una fecha válida",
    }),
    endDate: z
      .date({
        invalid_type_error: "La fecha de fin debe ser una fecha válida",
      })
      .nullable(),
    currentlyWorking: z.boolean().default(false),
    description: z.string().nullable(),
    multimedia: z.array(fileSchema).nullable(),
    experienceSkills: z.array(experienceSkillSchema).nullable(),
  })
  .refine((data) => (data.currentlyWorking ? !data.endDate : !!data.endDate), {
    message: "La fecha de fin es requerida si no está trabajando actualmente",
    path: ["endDate"],
  });
