import { z } from "zod";
import { SkillLevel, SkillSource } from "@/lib/enums/skill.enum";

export const skillsSchema = z.object({
  name: z.string().min(1, "The name is required"),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
});

export const userSkillSchema = z.object({
  skillId: z.string().min(1, "The skill is required"),
  level: z.nativeEnum(SkillLevel, {
    errorMap: () => ({ message: "The level is required" }),
  }),
  source: z.nativeEnum(SkillSource, {
    errorMap: () => ({ message: "The source is required" }),
  }),
  yearsOfExperience: z
    .number()
    .min(0, "The years of experience must be greater than or equal to 0"),
  sourceId: z.string().optional().nullable(),
});

export const experienceSkillSchema = z.object({
  experienceId: z.string(),
  skillId: z.string(),
});
