import { z } from "zod";
import { SkillLevel, SkillSource } from "@/lib/enums/skill.enum";

export const skillsSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
});

export const userSkillSchema = z.object({
  skillId: z.string().min(1, "La habilidad es requerida"),
  level: z.nativeEnum(SkillLevel, {
    errorMap: () => ({ message: "El nivel es requerido" }),
  }),
  source: z.nativeEnum(SkillSource, {
    errorMap: () => ({ message: "La fuente es requerida" }),
  }),
  yearsOfExperience: z
    .number()
    .min(0, "Los años de experiencia deben ser mayor o igual a 0"),
  sourceId: z.string().optional().nullable(),
});

export const experienceSkillSchema = z.object({
  experienceId: z.string(),
  skillId: z.string(),
});
