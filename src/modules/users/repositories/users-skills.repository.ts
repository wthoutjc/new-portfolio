import { db } from "@/common/database/database";
import { SkillLevel, SkillSource } from "@/lib/enums/skill.enum";

class UsersSkillsRepository {
  private readonly dbService: typeof db;

  constructor() {
    this.dbService = db;
  }

  async updateUserSkillsFromExperience(userId: string, experienceId: string) {
    // 1. Obtener todas las experiencias del usuario con sus habilidades
    const experiences = await this.dbService.experiences.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      include: {
        experienceSkills: {
          include: {
            skill: true,
          },
        },
      },
    });

    // 2. Calcular los años de experiencia por habilidad
    const skillExperience = new Map<string, number>();

    experiences.forEach((experience) => {
      const startDate = experience.startDate;
      const endDate = experience.currentlyWorking
        ? new Date()
        : experience.endDate!;

      const yearsOfExperience =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365);

      experience.experienceSkills.forEach((expSkill) => {
        const currentYears = skillExperience.get(expSkill.skillId) || 0;
        skillExperience.set(expSkill.skillId, currentYears + yearsOfExperience);
      });
    });

    // 3. Actualizar o crear UserSkills
    const updates = Array.from(skillExperience.entries()).map(
      ([skillId, years]) => {
        return this.dbService.usersSkills.upsert({
          where: {
            userId_skillId: {
              userId,
              skillId,
            },
          },
          create: {
            userId,
            skillId,
            level: this.calculateSkillLevel(years),
            source: SkillSource.EXPERIENCE,
            yearsOfExperience: Number(years.toFixed(2)),
            sourceId: experienceId,
          },
          update: {
            level: this.calculateSkillLevel(years),
            yearsOfExperience: Number(years.toFixed(2)),
          },
        });
      }
    );

    return this.dbService.$transaction(updates);
  }

  private calculateSkillLevel(years: number): SkillLevel {
    if (years >= 5) return SkillLevel.EXPERT;
    if (years >= 2) return SkillLevel.COMPETENT;
    if (years > 0) return SkillLevel.BEGINNER;
    return SkillLevel.NO_EXPERIENCE;
  }
}

export { UsersSkillsRepository };
