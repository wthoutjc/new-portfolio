import { z } from "zod";
import {
  EmploymentType,
  LocationType,
} from "@/modules/experiences/enums/experiences.enum";

export const experiencesSchema = z
  .object({
    title: z.string().min(1),
    employmentType: z.nativeEnum(EmploymentType),
    company: z.string().min(1),
    location: z.string().min(1),
    locationType: z.nativeEnum(LocationType),
    startDate: z.date(),
    endDate: z.date().optional(),
    currentlyWorking: z.boolean(),
    description: z.string().optional(),
    multimedia: z.array(z.string()).optional(),
    experienceSkills: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (data.currentlyWorking) {
        return data.endDate === null;
      }
      return data.endDate !== null;
    },
    {
      message: "La fecha de fin es requerida",
      path: ["endDate"],
    }
  );
