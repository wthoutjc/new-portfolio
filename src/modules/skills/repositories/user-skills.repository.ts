import { db } from "@/common/database/database";
import { Prisma } from "@prisma/client";
import { FindAllDto } from "@/modules/common/dto/find-all.dto";
import { CreateUserSkillDto } from "../dto/create-user-skill.dto";
import { UpdateUserSkillDto } from "../dto/update-user-skill.dto";
import { UserSkill } from "@/lib/interfaces/skill";
import { SkillLevel, SkillSource } from "@prisma/client";

class UserSkillsRepository {
  private readonly dbService: typeof db;

  constructor() {
    this.dbService = db;
  }

  private mapToUserSkill(data: any): UserSkill {
    return {
      ...data,
      level: data.level as SkillLevel,
      source: data.source as SkillSource,
    };
  }

  async findAll(findAllDto: FindAllDto, userId: string) {
    const { contains, page, take } = findAllDto;

    const where: Prisma.UsersSkillsWhereInput = {
      userId,
      deletedAt: null,
    };

    if (contains) {
      where.skill = {
        name: { contains },
      };
    }

    const result = await this.dbService.$transaction(async (tx) => {
      const data = await tx.usersSkills.findMany({
        where,
        select: {
          id: true,
          userId: true,
          skillId: true,
          level: true,
          source: true,
          yearsOfExperience: true,
          sourceId: true,
          deletedAt: true,
          createdAt: true,
          updatedAt: true,
          skill: {
            select: {
              id: true,
              name: true,
              icon: true,
              description: true,
            },
          },
        },
        skip: (page - 1) * take,
        take,
      });

      const total = await tx.usersSkills.count({
        where,
      });

      return {
        data: data.map(this.mapToUserSkill),
        total,
      };
    });

    return result;
  }

  async findOne(id: string) {
    const result = await this.dbService.usersSkills.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        skill: true,
      },
    });

    return result ? this.mapToUserSkill(result) : null;
  }

  create(createUserSkillDto: CreateUserSkillDto) {
    return this.dbService.usersSkills.create({
      data: createUserSkillDto,
      include: {
        skill: true,
      },
    });
  }

  update(id: string, updateUserSkillDto: UpdateUserSkillDto) {
    return this.dbService.usersSkills.update({
      where: { id },
      data: updateUserSkillDto,
      include: {
        skill: true,
      },
    });
  }

  delete(id: string) {
    return this.dbService.usersSkills.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export { UserSkillsRepository };
