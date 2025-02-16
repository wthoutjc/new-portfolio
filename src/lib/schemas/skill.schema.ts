import { z } from "zod";

export const skillsSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
});

export const experienceSkillSchema = z.object({
  experienceId: z.string(),
  skillId: z.string(),
});
