"use server";
import { SkillsService } from "@/modules/skills/services/skills.service";
import { skillsSchema } from "@/lib/schemas/skill.schema";
import { ActionState } from "@/lib/types/action.type";

const skillsService = new SkillsService();

async function create<T>(
  _: ActionState<T>,
  formData: FormData
): Promise<ActionState<T>> {
  const { success, data, error } = skillsSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    icon: formData.get("icon"),
  });
  if (!success) {
    return {
      errors: error?.flatten().fieldErrors,
    };
  }
  if (!data) {
    return {
      errors: { id: ["Error al crear el skill"] },
    };
  }
  const skill = await skillsService.create(data);
  return {
    data: skill as T,
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
        id: ["No se pudo obtener el id del skill"],
      },
    };
  }
  const { success, data, error } = skillsSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    icon: formData.get("icon"),
  });
  if (!success) {
    return {
      errors: error?.flatten().fieldErrors,
    };
  }
  if (!data) {
    return {
      errors: { id: ["Error al actualizar el skill"] },
    };
  }
  const skill = await skillsService.update(id, data);
  return {
    data: skill as T,
  };
}
export { create, update };
