import {
  EmploymentType,
  LocationType,
} from "@/modules/experiences/enums/experiences.enum";

export interface Experience {
  id: string;
  title: string;
  employmentType: EmploymentType;
  company: string;
  location: string;
  locationType: LocationType;
  startDate: Date;
  endDate?: Date;
  currentlyWorking: boolean;
  description?: string;
  multimedia?: string[];
  experienceSkills?: string[];
}

export interface ExperienceSkill {
  id: string;
  name: string;
  description: string;
  experienceId: string;
}
