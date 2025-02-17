export interface Skill {
  id: string;
  name: string;
  icon: string | null;
  description: string | null;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSkill {
  id: string;
  userId: string;
  skillId: string;
  level: SkillLevel;
  source: SkillSource;
  yearsOfExperience: number;
  sourceId: string | null;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  skill: Skill;
}
