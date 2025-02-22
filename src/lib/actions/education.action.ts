"use server";
import { EducationsService } from "@/modules/educations/services/educations.service";
import { educationsSchema } from "@/lib/schemas/education.schema";
import { ActionState } from "@/lib/types/action.type";

const educationsService = new EducationsService();

async function create<T>(
  _: ActionState<T>,
  formData: FormData
): Promise<ActionState<T>> {
  const userId = formData.get("userId")?.toString();

  if (!userId) {
    return {
      errors: {
        userId: ["User not found"],
      },
    };
  }

  const { success, data, error } = educationsSchema.safeParse({
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
  });

  if (!success) {
    return {
      errors: error?.flatten().fieldErrors,
    };
  }

  if (!data) {
    return {
      errors: { id: ["Error creating education"] },
    };
  }

  const education = await educationsService.create(data, userId);
  return {
    data: education as T,
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
        id: ["Id not found"],
      },
    };
  }

  const { success, data, error } = educationsSchema.safeParse({
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
  });

  if (!success) {
    return {
      errors: error?.flatten().fieldErrors,
    };
  }

  if (!data) {
    return {
      errors: { id: ["Error updating education"] },
    };
  }

  const education = await educationsService.update(id, data);
  return {
    data: education as T,
  };
}

async function remove<T>(
  _: ActionState<T>,
  formData: FormData
): Promise<ActionState<T>> {
  const id = formData.get("id")?.toString();

  if (!id) {
    return {
      errors: { id: ["Id not found"] },
    };
  }

  const education = await educationsService.delete(id);

  return {
    data: education as T,
  };
}

export { create, update, remove };
