import { isUUID } from "@/lib/utils/is-uuid";
import { Prisma } from "@prisma/client";
import { db } from "@/common/database/database";

export class UsersRepository {
  private readonly dbService: typeof db;
  constructor() {
    this.dbService = db;
  }

  findOne(unique: string) {
    const where: Prisma.UsersWhereInput = {
      ...(isUUID(unique) ? { id: unique } : { email: unique }),
      deletedAt: null,
    };

    return this.dbService.users.findFirst({
      where,
      include: {
        experiences: {
          where: {
            deletedAt: null,
          },
          include: {
            experienceSkills: true,
          },
          orderBy: [
            {
              currentlyWorking: "desc",
            },
            {
              endDate: "asc",
            },
            {
              startDate: "desc",
            },
          ],
        },
      },
    });
  }

  findAll() {
    return this.dbService.users.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        email: true,
      },
    });
  }
}
