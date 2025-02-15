"use server";

// Services
import { ExperiencesService } from "@/modules/experiences/services/experiences.service";

// Schemas
import { experiencesSchema } from "../schemas/experiences.schema";
import type { ExperienceActionState } from "@/lib/types/experience-action-state";

const experiencesService = new ExperiencesService();

function create(
  _: unknown,
  formData: FormData
): ExperienceActionState | Promise<ExperienceActionState> {
  const userId = formData.get("userId")?.toString();

  if (!userId) {
    return {
      errors: {
        userId: ["No se pudo obtener el usuario"],
      },
    };
  }

  const { success, data, error } = experiencesSchema.safeParse({
    location: formData.get("location"),
    locationType: formData.get("locationType"),
    employment: formData.get("employment"),
    employmentType: formData.get("employmentType"),
    title: formData.get("title"),
    company: formData.get("company"),
    description: formData.get("description"),
    startDate: new Date(formData.get("startDate") as string),
    endDate:
      formData.get("currentlyWorking") === "true"
        ? undefined
        : new Date(formData.get("endDate") as string),
    currentlyWorking: formData.get("currentlyWorking") === "true",
  });

  if (!success) {
    return {
      errors: error?.flatten().fieldErrors,
    };
  }

  if (!data) {
    return {
      errors: {
        id: ["Error al crear la experiencia"],
      },
    };
  }

  return experiencesService.create(data, userId);
}

function update(
  _: unknown,
  formData: FormData
): ExperienceActionState | Promise<ExperienceActionState> {
  const id = formData.get("id")?.toString();

  if (!id) {
    return {
      errors: {
        id: ["No se pudo obtener el id de la experiencia"],
      },
    };
  }

  const { success, data, error } = experiencesSchema.safeParse(formData);

  if (!success) {
    return {
      errors: error?.flatten().fieldErrors,
    };
  }

  if (!data) {
    return {
      errors: {
        id: ["Error al actualizar la experiencia"],
      },
    };
  }

  return experiencesService.update(id, data);
}

export { create, update };
