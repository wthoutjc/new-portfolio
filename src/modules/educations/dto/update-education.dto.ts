export class UpdateEducationDto {
  title?: string;
  institution?: string;
  educationType?: string;
  startDate?: Date;
  endDate?: Date | null;
  currentlyStudying?: boolean;
  description?: string | null;
  multimedia?: string[] | null;
}
