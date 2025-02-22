import { CreateMultimediaDto } from "@/modules/multimedia/dto/create-multimedia.dto";

export class UpdateEducationDto {
  title?: string;
  institution?: string;
  educationType?: string;
  startDate?: Date;
  endDate?: Date | null;
  currentlyStudying?: boolean;
  description?: string | null;
  multimedia?: Omit<CreateMultimediaDto, "entityId" | "entityType">[] | null;
}
