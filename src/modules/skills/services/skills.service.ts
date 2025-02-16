import { SkillsRepository } from "../repositories/skills.repository";
import { FindAllDto } from "@/modules/common/dto/find-all.dto";
import { CreateSkillDto } from "../dto/create-skill.dto";
import { UpdateSkillDto } from "../dto/update-skill.dto";

class SkillsService {
  private readonly skillsRepository: SkillsRepository;

  constructor() {
    this.skillsRepository = new SkillsRepository();
  }

  findAll(findAllDto: FindAllDto) {
    return this.skillsRepository.findAll(findAllDto);
  }

  findOne(id: string) {
    return this.skillsRepository.findOne(id);
  }

  async create(createSkillDto: CreateSkillDto) {
    return this.skillsRepository.create(createSkillDto);
  }

  update(id: string, updateSkillDto: UpdateSkillDto) {
    return this.skillsRepository.update(id, updateSkillDto);
  }

  delete(id: string) {
    return this.skillsRepository.delete(id);
  }
}

export { SkillsService };
