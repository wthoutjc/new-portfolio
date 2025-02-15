import { ExperiencesRepository } from "../repositories/experiences.repository";
import { FindAllDto } from "@/modules/common/dto/find-all.dto";
import { CreateExperienceDto } from "@/modules/common/dto/create-experience.dto";
import { UpdateExperienceDto } from "@/modules/common/dto/update-experience.dto";

class ExperiencesService {
  constructor(private readonly experiencesRepository: ExperiencesRepository) {}

  findAll(findAllDto: FindAllDto) {
    return this.experiencesRepository.findAll(findAllDto);
  }

  findOne(id: string) {
    return this.experiencesRepository.findOne(id);
  }

  create(createExperienceDto: CreateExperienceDto, userId: string) {
    return this.experiencesRepository.create(createExperienceDto, userId);
  }

  update(id: string, updateExperienceDto: UpdateExperienceDto) {
    return this.experiencesRepository.update(id, updateExperienceDto);
  }

  delete(id: string) {
    return this.experiencesRepository.delete(id);
  }
}

export { ExperiencesService };
