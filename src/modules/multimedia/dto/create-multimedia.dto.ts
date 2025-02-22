export class CreateMultimediaDto {
  url!: string;
  key!: string;
  name!: string;
  type!: string;
  size!: number;
  entityId!: string;
  entityType!: "experience" | "education";
}
