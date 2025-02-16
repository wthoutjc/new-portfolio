"use server";

// Services
import { ExperiencesService } from "@/modules/experiences/services/experiences.service";

// Schemas
import { experiencesSchema } from "../schemas/experiences.schema";

// Types
import { ActionState } from "../types/action.type";

const experiencesService = new ExperiencesService();

async function create<T>(
  _: ActionState<T>,
  formData: FormData
): Promise<ActionState<T>> {
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
        ? null
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

  const experience = await experiencesService.create(data, userId);

  return {
    data: experience as T,
  };
}

async function update<T>(
  _: ActionState<T>,
  formData: FormData
): Promise<ActionState<T>> {
  const id = formData.get("id")?.toString();

  if (!id) {
    return {
      errors: {
        id: ["No se pudo obtener el id de la experiencia"],
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
        ? null
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
        id: ["Error al actualizar la experiencia"],
      },
    };
  }

  const experience = await experiencesService.update(id, data);

  return {
    data: experience as T,
  };
}

export { create, update };
