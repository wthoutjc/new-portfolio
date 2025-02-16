import { SkillLevel, SkillSource } from "@/lib/interfaces/skill";

export class UpdateUserSkillDto {
  level?: SkillLevel;
  source?: SkillSource;
  yearsOfExperience?: number;
  sourceId?: string | null;
}
