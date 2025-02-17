import { UsersRepository } from "../repositories/users.repository";

export class UsersService {
  private readonly usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  findOne(unique: string) {
    return this.usersRepository.findOne(unique);
  }

  findAll() {
    return this.usersRepository.findAll();
  }
}
