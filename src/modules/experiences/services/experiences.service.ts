"use server";
import { ExperiencesRepository } from "../repositories/experiences.repository";
import { FindAllDto } from "@/modules/common/dto/find-all.dto";
import { CreateExperienceDto } from "@/modules/experiences/dto/create-experience.dto";
import { UpdateExperienceDto } from "@/modules/experiences/dto/update-experience.dto";
import { UsersSkillsService } from "@/modules/users/services/users-skills.service";
import { MultimediaService } from "@/modules/multimedia/services/multimedia.service";
import { CreateMultimediaDto } from "@/modules/multimedia/dto/create-multimedia.dto";

class ExperiencesService {
  private readonly experiencesRepository: ExperiencesRepository;
  private readonly usersSkillsService: UsersSkillsService;
  private readonly multimediaService: MultimediaService;

  constructor() {
    this.experiencesRepository = new ExperiencesRepository();
    this.usersSkillsService = new UsersSkillsService();
    this.multimediaService = new MultimediaService();
  }

  findAll(findAllDto: FindAllDto) {
    return this.experiencesRepository.findAll(findAllDto);
  }

  async findOne(id: string) {
    const experience = await this.experiencesRepository.findOne(id);
    if (!experience) return null;

    const multimedia = await this.multimediaService.findByEntity(
      id,
      "experience"
    );
    return { ...experience, multimedia };
  }

  async create(createExperienceDto: CreateExperienceDto, userId: string) {
    const { multimedia, ...experienceData } = createExperienceDto;

    const experience = await this.experiencesRepository.create(
      experienceData,
      userId
    );

    if (multimedia?.length) {
      await Promise.all(
        multimedia.map(async (file) => {
          // Remover el prefijo temporal de la clave si existe
          const key = file.key.startsWith("temp-")
            ? file.key.replace("temp-", "")
            : file.key;

          return this.multimediaService.create({
            ...file,
            key,
            entityId: experience.id,
            entityType: "experience",
          } as CreateMultimediaDto);
        })
      );
    }

    await this.usersSkillsService.updateUserSkillsFromExperience(
      userId,
      experience.id
    );

    return this.findOne(experience.id);
  }

  async update(id: string, updateExperienceDto: UpdateExperienceDto) {
    const experience = await this.experiencesRepository.findOne(id);
    if (!experience) throw new Error("Experience not found");

    const { multimedia, ...experienceData } = updateExperienceDto;

    // Obtener multimedia actual
    const currentMultimedia = await this.multimediaService.findByEntity(
      id,
      "experience"
    );

    // Caso 1: Se están eliminando todos los archivos
    if (currentMultimedia?.length && !multimedia?.length) {
      await this.multimediaService.deleteByEntity(id, "experience");
    }
    // Caso 2: Hay cambios en los archivos existentes
    else if (multimedia?.length) {
      // Verificar si hay cambios reales en multimedia
      const hasMultimediaChanges =
        JSON.stringify(multimedia.map((m) => m.key).sort()) !==
        JSON.stringify(currentMultimedia?.map((m) => m.key).sort());

      if (hasMultimediaChanges) {
        // Eliminar multimedia anterior
        await this.multimediaService.deleteByEntity(id, "experience");

        // Crear nueva multimedia
        await Promise.all(
          multimedia.map((file) =>
            this.multimediaService.create({
              ...file,
              entityId: id,
              entityType: "experience",
            } as CreateMultimediaDto)
          )
        );
      }
    }

    await this.experiencesRepository.update(id, experienceData);
    await this.usersSkillsService.updateUserSkillsFromExperience(
      experience.userId,
      id
    );

    return this.findOne(id);
  }

  async delete(id: string) {
    const experience = await this.experiencesRepository.findOne(id);
    if (!experience) throw new Error("Experience not found");

    // Eliminar multimedia
    await this.multimediaService.deleteByEntity(id, "experience");

    const deletedExperience = await this.experiencesRepository.delete(id);
    await this.usersSkillsService.updateUserSkillsFromExperience(
      experience.userId,
      id
    );
    return deletedExperience;
  }
}

export { ExperiencesService };
