export interface MultimediaFile {
  url: string;
  key: string;
  name: string;
  type: string;
  size: number;
}

export interface FileWithPreview {
  url: string;
  key: string;
  name: string;
  type: string;
  size: number;
  preview?: string;
}
