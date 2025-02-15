import { Prisma } from "@prisma/client";
import { db } from "@/common/database/database";
import { FindAllDto } from "@/modules/common/dto/find-all.dto";
import { CreateExperienceDto } from "@/modules/experiences/dto/create-experience.dto";
import { UpdateExperienceDto } from "@/modules/experiences/dto/update-experience.dto";

class ExperiencesRepository {
  private readonly dbService: typeof db;

  constructor() {
    this.dbService = db;
  }

  findAll(findAllDto: FindAllDto) {
    const { contains, page, take } = findAllDto;

    const where: Prisma.ExperiencesWhereInput = {
      deletedAt: null,
    };

    if (contains) {
      where.title = { contains };
    }

    return this.dbService.$transaction(async (tx) => {
      const data = await tx.experiences.findMany({
        where,
        include: {
          experienceSkills: true,
        },
        skip: (page - 1) * take,
        take,
      });

      const total = await tx.experiences.count({
        where,
      });

      return {
        data,
        total,
      };
    });
  }

  findOne(id: string) {
    return this.dbService.experiences.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        experienceSkills: true,
      },
    });
  }

  create(createExperienceDto: CreateExperienceDto, userId: string) {
    const data: Prisma.ExperiencesCreateInput = {
      ...createExperienceDto,
      multimedia: createExperienceDto.multimedia ?? Prisma.JsonNull,
      user: { connect: { id: userId } },
      experienceSkills: {
        create: (createExperienceDto.experienceSkills ?? []).map((skillId) => ({
          skill: { connect: { id: skillId } },
        })),
      },
    };

    return this.dbService.experiences.create({
      data,
    });
  }

  update(id: string, updateExperienceDto: UpdateExperienceDto) {
    const data: Prisma.ExperiencesUpdateInput = {
      ...updateExperienceDto,
      experienceSkills: {
        connect: updateExperienceDto.experienceSkills?.map((skillDto) => ({
          experienceId_skillId: { experienceId: id, skillId: skillDto.skillId },
        })),
      },
    };

    return this.dbService.experiences.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return this.dbService.experiences.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export { ExperiencesRepository };
