import { SkillLevel, SkillSource } from "@prisma/client";

export class UpdateUserSkillDto {
  level?: SkillLevel;
  source?: SkillSource;
  yearsOfExperience?: number;
  sourceId?: string | null;
}
