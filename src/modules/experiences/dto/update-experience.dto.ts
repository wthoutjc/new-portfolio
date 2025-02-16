import { CreateExperienceSkillDto } from "./create-experience.dto";

export class UpdateExperienceDto {
  title?: string;
  employmentType?: string | null;
  company?: string;
  location?: string | null;
  locationType?: string | null;
  startDate?: Date;
  endDate?: Date | null;
  currentlyWorking?: boolean;
  description?: string | null;
  multimedia?: string[] | null;
  experienceSkills?: CreateExperienceSkillDto[] | null;
}
