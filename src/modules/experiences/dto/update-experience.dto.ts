import { CreateMultimediaDto } from "@/modules/multimedia/dto/create-multimedia.dto";
import { CreateExperienceDto } from "./create-experience.dto";

export class UpdateExperienceDto implements Partial<CreateExperienceDto> {
  title?: string;
  employmentType?: string | null;
  company?: string;
  location?: string | null;
  locationType?: string | null;
  startDate?: Date;
  endDate?: Date | null;
  currentlyWorking?: boolean;
  description?: string | null;
  experienceSkills?: { experienceId: string; skillId: string }[] | null;
  multimedia?: Omit<CreateMultimediaDto, "entityId" | "entityType">[] | null;
}
