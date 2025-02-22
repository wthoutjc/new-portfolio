"use server";
import { ExperiencesRepository } from "../repositories/experiences.repository";
import { FindAllDto } from "@/modules/common/dto/find-all.dto";
import { CreateExperienceDto } from "@/modules/experiences/dto/create-experience.dto";
import { UpdateExperienceDto } from "@/modules/experiences/dto/update-experience.dto";
import { UsersSkillsService } from "@/modules/users/services/users-skills.service";

class ExperiencesService {
  private readonly experiencesRepository: ExperiencesRepository;
  private readonly usersSkillsService: UsersSkillsService;

  constructor() {
    this.experiencesRepository = new ExperiencesRepository();
    this.usersSkillsService = new UsersSkillsService();
  }

  findAll(findAllDto: FindAllDto) {
    return this.experiencesRepository.findAll(findAllDto);
  }

  findOne(id: string) {
    return this.experiencesRepository.findOne(id);
  }

  async create(createExperienceDto: CreateExperienceDto, userId: string) {
    const experience = await this.experiencesRepository.create(
      createExperienceDto,
      userId
    );
    await this.usersSkillsService.updateUserSkillsFromExperience(
      userId,
      experience.id
    );
    return experience;
  }

  async update(id: string, updateExperienceDto: UpdateExperienceDto) {
    const experience = await this.experiencesRepository.findOne(id);
    if (!experience) throw new Error("Experience not found");

    const updatedExperience = await this.experiencesRepository.update(
      id,
      updateExperienceDto
    );
    await this.usersSkillsService.updateUserSkillsFromExperience(
      experience.userId,
      id
    );
    return updatedExperience;
  }

  async delete(id: string) {
    const experience = await this.experiencesRepository.findOne(id);
    if (!experience) throw new Error("Experience not found");

    const deletedExperience = await this.experiencesRepository.delete(id);
    await this.usersSkillsService.updateUserSkillsFromExperience(
      experience.userId,
      id
    );
    return deletedExperience;
  }
}

export { ExperiencesService };
