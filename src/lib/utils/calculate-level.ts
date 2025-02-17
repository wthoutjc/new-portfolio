import { SkillLevel } from "../enums/skill.enum";

export function calculateLevel(yearsOfExperience: number): SkillLevel {
  if (yearsOfExperience >= 3) return SkillLevel.EXPERT;
  if (yearsOfExperience >= 1) return SkillLevel.COMPETENT;
  if (yearsOfExperience > 0) return SkillLevel.BEGINNER;
  return SkillLevel.NO_EXPERIENCE;
}
