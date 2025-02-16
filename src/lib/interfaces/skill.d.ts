export interface Skill {
  id?: string;
  name: string;
  description?: string | null;
  icon?: string | null;
}

export interface UserSkill {
  id?: string;
  userId: string;
  skillId: string;
  level: SkillLevel;
  source: SkillSource;
  yearsOfExperience: number;
  sourceId?: string | null;
  skill?: Skill;
}
