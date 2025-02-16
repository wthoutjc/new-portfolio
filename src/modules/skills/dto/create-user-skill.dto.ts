import { SkillLevel, SkillSource } from "@prisma/client";

export class CreateUserSkillDto {
  userId!: string;
  skillId!: string;
  level!: SkillLevel;
  source!: SkillSource;
  yearsOfExperience!: number;
  sourceId?: string | null;
}
