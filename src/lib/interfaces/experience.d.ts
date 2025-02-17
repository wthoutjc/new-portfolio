import { JsonValue } from "@prisma/client/runtime/library";

export interface Experience {
  id: string;
  title: string;
  employmentType: string | null;
  company: string;
  location: string | null;
  locationType: string | null;
  startDate: Date;
  endDate: Date | null;
  currentlyWorking: boolean;
  description: string | null;
  multimedia: JsonValue;
  experienceSkills: ExperienceSkill[];
}

export interface ExperienceSkill {
  experienceId: string;
  skillId: string;
  skill: {
    id: string;
    name: string;
    icon: string | null;
    description: string | null;
  };
}
