import { UserSkillsRepository } from "../repositories/user-skills.repository";
import { FindAllDto } from "@/modules/common/dto/find-all.dto";
import { CreateUserSkillDto } from "../dto/create-user-skill.dto";
import { UpdateUserSkillDto } from "../dto/update-user-skill.dto";

class UserSkillsService {
  private readonly userSkillsRepository: UserSkillsRepository;

  constructor() {
    this.userSkillsRepository = new UserSkillsRepository();
  }

  findAll(findAllDto: FindAllDto, userId: string) {
    return this.userSkillsRepository.findAll(findAllDto, userId);
  }

  findOne(id: string) {
    return this.userSkillsRepository.findOne(id);
  }

  create(createUserSkillDto: CreateUserSkillDto) {
    return this.userSkillsRepository.create(createUserSkillDto);
  }

  update(id: string, updateUserSkillDto: UpdateUserSkillDto) {
    return this.userSkillsRepository.update(id, updateUserSkillDto);
  }

  delete(id: string) {
    return this.userSkillsRepository.delete(id);
  }
}

export { UserSkillsService };
