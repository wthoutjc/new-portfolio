import { Prisma } from "@prisma/client";
import { db } from "@/common/database/database";
import { FindAllDto } from "@/modules/common/dto/find-all.dto";
import { CreateSkillDto } from "@/modules/skills/dto/create-skill.dto";
import { UpdateSkillDto } from "@/modules/skills/dto/update-skill.dto";

class SkillsRepository {
  private readonly dbService: typeof db;

  constructor() {
    this.dbService = db;
  }

  findAll(findAllDto: FindAllDto) {
    const { contains, page, take } = findAllDto;

    const where: Prisma.SkillsWhereInput = {
      deletedAt: null,
    };

    if (contains) {
      where.name = { contains };
    }

    return this.dbService.$transaction(async (tx) => {
      const data = await tx.skills.findMany({
        where,
        skip: (page - 1) * take,
        take,
      });

      const total = await tx.skills.count({
        where,
      });

      return {
        data,
        total,
      };
    });
  }

  findOne(id: string) {
    return this.dbService.skills.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  create(createSkillDto: CreateSkillDto) {
    return this.dbService.skills.create({
      data: createSkillDto,
    });
  }

  update(id: string, updateSkillDto: UpdateSkillDto) {
    return this.dbService.skills.update({
      where: { id },
      data: updateSkillDto,
    });
  }

  delete(id: string) {
    return this.dbService.skills.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export { SkillsRepository };
