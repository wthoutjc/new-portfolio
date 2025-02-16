import { z } from "zod";
import { experienceSkillSchema } from "./skill.schema";

export const experiencesSchema = z
  .object({
    title: z.string().min(1),
    employmentType: z.string().min(1).nullable(),
    company: z.string().min(1),
    location: z.string().min(1).nullable(),
    locationType: z.string().min(1).nullable(),
    startDate: z.date(),
    endDate: z.date().nullable(),
    currentlyWorking: z.boolean(),
    description: z.string().nullable(),
    multimedia: z.any().nullable(),
    experienceSkills: z.array(experienceSkillSchema).nullable(),
  })
  .refine((data) => (data.currentlyWorking ? !data.endDate : !!data.endDate), {
    message: "La fecha de fin es requerida",
    path: ["endDate"],
  });
