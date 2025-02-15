export class CreateExperienceDto {
  title!: string;
  employmentType!: string;
  company!: string;
  location!: string;
  locationType!: string;
  startDate!: Date;
  endDate?: Date;
  currentlyWorking!: boolean;
  description?: string;
  multimedia?: string[];
  experienceSkills?: string[];
}
