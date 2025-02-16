import { EducationsRepository } from "../repositories/educations.repository";
import { FindAllDto } from "@/modules/common/dto/find-all.dto";
import { CreateEducationDto } from "../dto/create-education.dto";
import { UpdateEducationDto } from "../dto/update-education.dto";

class EducationsService {
  private readonly educationsRepository: EducationsRepository;

  constructor() {
    this.educationsRepository = new EducationsRepository();
  }

  findAll(findAllDto: FindAllDto) {
    return this.educationsRepository.findAll(findAllDto);
  }

  findOne(id: string) {
    return this.educationsRepository.findOne(id);
  }

  create(createEducationDto: CreateEducationDto, userId: string) {
    return this.educationsRepository.create(createEducationDto, userId);
  }

  update(id: string, updateEducationDto: UpdateEducationDto) {
    return this.educationsRepository.update(id, updateEducationDto);
  }

  delete(id: string) {
    return this.educationsRepository.delete(id);
  }
}

export { EducationsService };
