export class CreateExperienceDto {
  title!: string;
  employmentType?: string | null;
  company!: string;
  location?: string | null;
  locationType?: string | null;
  startDate!: Date;
  endDate?: Date | null;
  currentlyWorking!: boolean;
  description?: string | null;
  multimedia?: string[];
  experienceSkills?: CreateExperienceSkillDto[] | null;
}

export class CreateExperienceSkillDto {
  experienceId!: string;
  skillId!: string;
}
