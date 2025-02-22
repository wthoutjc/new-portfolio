"use server";

import { EducationsService } from "@/modules/educations/services/educations.service";
import { educationsSchema } from "@/lib/schemas/education.schema";
import { ActionState } from "../types/action.type";
import { upload } from "./upload.action";
import { UploadFileResponseDto } from "@/modules/s3/dto/upload-file.dto";

const educationsService = new EducationsService();

async function create<T>(
  _: ActionState<T>,
  formData: FormData
): Promise<ActionState<T>> {
  try {
    const userId = formData.get("userId")?.toString();

    if (!userId) {
      return {
        errors: {
          userId: ["No se pudo obtener el usuario"],
        },
      };
    }

    // Manejar la subida de archivos primero
    const files = formData.getAll("files");
    const multimediaMetadata = JSON.parse(
      formData.get("multimedia")?.toString() || "null"
    );
    let multimedia = multimediaMetadata;

    // Solo procesar archivos si hay nuevos
    if (files.length) {
      multimedia = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileFormData = new FormData();
        fileFormData.append("file", file);

        const response = await upload<UploadFileResponseDto>(
          undefined,
          fileFormData
        );

        if (!response) continue;

        if (response.errors) {
          return { errors: response.errors };
        }

        if (response.data) {
          const { url, key, name, type, size } = response.data;
          multimedia.push({
            url,
            key,
            name,
            type,
            size,
          });
        }
      }

      // Combinar con archivos existentes que no fueron modificados
      if (multimediaMetadata) {
        const existingFiles = multimediaMetadata.filter(
          (file: any) =>
            !file.url.startsWith("blob:") && !file.url.includes("objecturl")
        );
        multimedia = [...multimedia, ...existingFiles];
      }
    }

    const educationData = {
      title: formData.get("title"),
      institution: formData.get("institution"),
      educationType: formData.get("educationType"),
      startDate: new Date(formData.get("startDate") as string),
      endDate:
        formData.get("currentlyStudying") === "true"
          ? null
          : new Date(formData.get("endDate") as string),
      currentlyStudying: formData.get("currentlyStudying") === "true",
      description: formData.get("description"),
      multimedia: multimedia.length ? multimedia : null,
    };

    const { success, data, error } = educationsSchema.safeParse(educationData);

    if (!success) {
      return {
        errors: error?.flatten().fieldErrors,
      };
    }

    const education = await educationsService.create(data, userId);

    return {
      data: education as T,
    };
  } catch (error) {
    console.error("Error creating education:", error);
    return {
      errors: {
        _form: ["Error al crear la educación"],
      },
    };
  }
}

async function update<T>(
  _: ActionState<T>,
  formData: FormData
): Promise<ActionState<T>> {
  try {
    const id = formData.get("id")?.toString();

    if (!id) {
      return {
        errors: {
          id: ["No se pudo obtener el id de la educación"],
        },
      };
    }

    // Manejar la subida de archivos primero
    const files = formData.getAll("files");
    const multimediaMetadata = JSON.parse(
      formData.get("multimedia")?.toString() || "null"
    );
    let multimedia = multimediaMetadata;

    // Solo procesar archivos si hay nuevos
    if (files.length) {
      multimedia = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileFormData = new FormData();
        fileFormData.append("file", file);

        const response = await upload<UploadFileResponseDto>(
          undefined,
          fileFormData
        );

        if (!response) continue;

        if (response.errors) {
          return { errors: response.errors };
        }

        if (response.data) {
          const { url, key, name, type, size } = response.data;
          multimedia.push({
            url,
            key,
            name,
            type,
            size,
          });
        }
      }

      // Combinar con archivos existentes que no fueron modificados
      if (multimediaMetadata) {
        const existingFiles = multimediaMetadata.filter(
          (file: any) =>
            !file.url.startsWith("blob:") && !file.url.includes("objecturl")
        );
        multimedia = [...multimedia, ...existingFiles];
      }
    }

    const educationData = {
      title: formData.get("title"),
      institution: formData.get("institution"),
      educationType: formData.get("educationType"),
      startDate: new Date(formData.get("startDate") as string),
      endDate:
        formData.get("currentlyStudying") === "true"
          ? null
          : new Date(formData.get("endDate") as string),
      currentlyStudying: formData.get("currentlyStudying") === "true",
      description: formData.get("description"),
      multimedia: multimedia?.length ? multimedia : null,
    };

    const { success, data, error } = educationsSchema.safeParse(educationData);

    if (!success) {
      return {
        errors: error?.flatten().fieldErrors,
      };
    }

    const education = await educationsService.update(id, data);

    return {
      data: education as T,
    };
  } catch (error) {
    console.error("Error updating education:", error);
    return {
      errors: {
        _form: ["Error al actualizar la educación"],
      },
    };
  }
}

async function remove<T>(
  _: ActionState<T>,
  formData: FormData
): Promise<ActionState<T>> {
  try {
    const id = formData.get("id")?.toString();

    if (!id) {
      return {
        errors: {
          id: ["No se pudo obtener el id de la educación"],
        },
      };
    }

    const education = await educationsService.delete(id);

    return {
      data: education as T,
    };
  } catch (error) {
    console.error("Error deleting education:", error);
    return {
      errors: {
        _form: ["Error al eliminar la educación"],
      },
    };
  }
}

export { create, update, remove };
