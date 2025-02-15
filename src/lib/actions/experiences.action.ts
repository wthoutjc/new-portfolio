// Services
import { ExperiencesService } from "@/modules/experiences/services/experiences.service";

// Schemas
import { experiencesSchema } from "../schemas/experiences.schema";
import type { ExperienceActionState } from "@/lib/types/experience-action-state";

class ExperiencesAction {
  private readonly experiencesService: ExperiencesService;

  constructor() {
    this.experiencesService = new ExperiencesService();
  }

  create(
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
      endDate: new Date(formData.get("endDate") as string),
      currentlyWorking: formData.get("currentlyWorking") === "true",
    });

    console.log({
      success,
      data,
      error,
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

    return this.experiencesService.create(data, userId);
  }

  update(
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

    return this.experiencesService.update(id, data);
  }
}

export { ExperiencesAction };
