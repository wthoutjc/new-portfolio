import { UsersSkillsRepository } from "../repositories/users-skills.repository";

class UsersSkillsService {
  private readonly usersSkillsRepository: UsersSkillsRepository;

  constructor() {
    this.usersSkillsRepository = new UsersSkillsRepository();
  }

  updateUserSkillsFromExperience(userId: string, experienceId: string) {
    return this.usersSkillsRepository.updateUserSkillsFromExperience(
      userId,
      experienceId
    );
  }
}

export { UsersSkillsService };
