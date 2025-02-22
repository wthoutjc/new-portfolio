export class UploadFileDto {
  name!: string;
  type!: string;
  size!: number;
  buffer!: Buffer;
  lastModified?: number;
}

export class UploadFileResponseDto {
  url!: string;
  key!: string;
  name!: string;
  type!: string;
  size!: number;
}
