"use server";

// Services
import { ExperiencesService } from "@/modules/experiences/services/experiences.service";

// Schemas
import { experiencesSchema } from "../schemas/experiences.schema";

// Types
import { ActionState } from "../types/action.type";
import { upload } from "./upload.action";
import { UploadFileResponseDto } from "@/modules/s3/dto/upload-file.dto";

const experiencesService = new ExperiencesService();

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

    const experienceData = {
      title: formData.get("title"),
      employmentType: formData.get("employmentType"),
      company: formData.get("company"),
      location: formData.get("location"),
      locationType: formData.get("locationType"),
      startDate: new Date(formData.get("startDate") as string),
      endDate:
        formData.get("currentlyWorking") === "true"
          ? null
          : new Date(formData.get("endDate") as string),
      currentlyWorking: formData.get("currentlyWorking") === "true",
      description: formData.get("description"),
      experienceSkills: JSON.parse(
        formData.get("experienceSkills")?.toString() || "[]"
      ),
      multimedia: multimedia?.length ? multimedia : null,
    };

    const { success, data, error } =
      experiencesSchema.safeParse(experienceData);

    if (!success) {
      return {
        errors: error?.flatten().fieldErrors,
      };
    }

    const experience = await experiencesService.create(data, userId);

    return {
      data: experience as T,
    };
  } catch (error) {
    console.error("Error creating experience:", error);
    return {
      errors: {
        _form: ["Error al crear la experiencia"],
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
          id: ["No se pudo obtener el id de la experiencia"],
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

    const experienceData = {
      title: formData.get("title"),
      employmentType: formData.get("employmentType"),
      company: formData.get("company"),
      location: formData.get("location"),
      locationType: formData.get("locationType"),
      startDate: new Date(formData.get("startDate") as string),
      endDate:
        formData.get("currentlyWorking") === "true"
          ? null
          : new Date(formData.get("endDate") as string),
      currentlyWorking: formData.get("currentlyWorking") === "true",
      description: formData.get("description"),
      experienceSkills: JSON.parse(
        formData.get("experienceSkills")?.toString() || "[]"
      ),
      multimedia: multimedia?.length ? multimedia : null,
    };

    const { success, data, error } =
      experiencesSchema.safeParse(experienceData);

    if (!success) {
      return {
        errors: error?.flatten().fieldErrors,
      };
    }

    const experience = await experiencesService.update(id, data);

    return {
      data: experience as T,
    };
  } catch (error) {
    console.error("Error updating experience:", error);
    return {
      errors: {
        _form: ["Error al actualizar la experiencia"],
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
          id: ["No se pudo obtener el id de la experiencia"],
        },
      };
    }

    const experience = await experiencesService.delete(id);

    return {
      data: experience as T,
    };
  } catch (error) {
    console.error("Error deleting experience:", error);
    return {
      errors: {
        _form: ["Error al eliminar la experiencia"],
      },
    };
  }
}

export { create, update, remove };
