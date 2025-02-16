import { isUUID } from "@/lib/utils/is-uuid";
import { Prisma } from "@prisma/client";
import { db } from "@/common/database/database";

export class UsersRepository {
  private readonly dbService: typeof db;
  constructor() {
    this.dbService = db;
  }

  findOne(unique: string) {
    const where: Prisma.UsersWhereUniqueInput = isUUID(unique)
      ? { id: unique }
      : { email: unique };

    return this.dbService.users.findUnique({
      where,
    });
  }
}
