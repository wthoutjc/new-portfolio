"use server";
import { UserSkillsService } from "@/modules/skills/services/user-skills.service";
import { userSkillSchema } from "@/lib/schemas/skill.schema";
import { ActionState } from "@/lib/types/action.type";
import { calculateLevel } from "../utils/calculate-level";

const userSkillsService = new UserSkillsService();

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

  const yearsOfExperience = Number(formData.get("yearsOfExperience"));
  const level = calculateLevel(yearsOfExperience);

  const { success, data, error } = userSkillSchema.safeParse({
    skillId: formData.get("skillId"),
    source: formData.get("source"),
    sourceId: formData.get("sourceId"),
    yearsOfExperience,
    level,
  });

  if (!success) {
    return {
      errors: error?.flatten().fieldErrors,
    };
  }

  if (!data) {
    return {
      errors: { id: ["Error al crear la habilidad del usuario"] },
    };
  }

  const userSkill = await userSkillsService.create({
    ...data,
    userId,
  });

  return {
    data: userSkill as T,
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
        id: ["No se pudo obtener el id de la habilidad del usuario"],
      },
    };
  }

  const yearsOfExperience = Number(formData.get("yearsOfExperience"));
  const level = calculateLevel(yearsOfExperience);

  const { success, data, error } = userSkillSchema.safeParse({
    skillId: formData.get("skillId"),
    source: formData.get("source"),
    sourceId: formData.get("sourceId"),
    yearsOfExperience,
    level,
  });

  if (!success) {
    return {
      errors: error?.flatten().fieldErrors,
    };
  }

  if (!data) {
    return {
      errors: { id: ["Error al actualizar la habilidad del usuario"] },
    };
  }

  const userSkill = await userSkillsService.update(id, data);

  return {
    data: userSkill as T,
  };
}

async function remove<T>(
  _: ActionState<T>,
  formData: FormData
): Promise<ActionState<T>> {
  const id = formData.get("id")?.toString();

  if (!id) {
    return {
      errors: {
        id: ["No se pudo obtener el id de la habilidad del usuario"],
      },
    };
  }

  const userSkill = await userSkillsService.delete(id);

  return {
    data: userSkill as T,
  };
}

export { create, update, remove };
