import { CreateMultimediaDto } from "@/modules/multimedia/dto/create-multimedia.dto";

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
  experienceSkills?: CreateExperienceSkillDto[] | null;
  multimedia?: Omit<CreateMultimediaDto, "entityId" | "entityType">[] | null;
}

export class CreateExperienceSkillDto {
  experienceId!: string;
  skillId!: string;
}
