"use server";

import { S3Service } from "@/modules/s3/services/s3.service";
import { UploadFileDto } from "@/modules/s3/dto/upload-file.dto";
import { ActionState } from "../types/action.type";

const s3Service = new S3Service();

const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "video/mp4",
  "video/quicktime",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

async function upload<T>(
  _: ActionState<T>,
  formData: FormData
): Promise<ActionState<T>> {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return {
        errors: {
          file: ["No se ha proporcionado ningún archivo"],
        },
      };
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return {
        errors: {
          file: ["Tipo de archivo no permitido"],
        },
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        errors: {
          file: ["El archivo excede el tamaño máximo permitido (10MB)"],
        },
      };
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadFileDto: UploadFileDto = {
      name: file.name,
      type: file.type,
      size: file.size,
      buffer,
      lastModified: file.lastModified,
    };

    const url = await s3Service.uploadFile(uploadFileDto);

    return {
      data: {
        url,
        name: file.name,
        type: file.type,
        size: file.size,
      } as T,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return {
      errors: {
        file: ["Error al subir el archivo"],
      },
    };
  }
}

export { upload };
