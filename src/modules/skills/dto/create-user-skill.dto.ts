import { SkillLevel, SkillSource } from "@/lib/interfaces/skill";

export class CreateUserSkillDto {
  userId!: string;
  skillId!: string;
  level!: SkillLevel;
  source!: SkillSource;
  yearsOfExperience!: number;
  sourceId?: string | null;
}
