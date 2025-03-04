"use server";
import { db } from "@/common/database/database";
import { Prisma } from "@prisma/client";
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
      where.OR = [
        { title: { contains } },
        { company: { contains } },
        { location: { contains } },
        { locationType: { contains } },
      ];
    }

    return this.dbService.$transaction(async (tx) => {
      const data = await tx.experiences.findMany({
        where,
        select: {
          id: true,
          title: true,
          company: true,
          location: true,
          locationType: true,
          startDate: true,
          endDate: true,
        },
        skip: (page - 1) * take,
        take,
        orderBy: {
          startDate: "desc",
        },
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
        experienceSkills: {
          include: {
            skill: true,
          },
        },
      },
    });
  }

  create(createExperienceDto: CreateExperienceDto, userId: string) {
    const data: Prisma.ExperiencesCreateInput = {
      ...createExperienceDto,
      user: { connect: { id: userId } },
      experienceSkills: {
        create: (createExperienceDto.experienceSkills ?? []).map(
          (skillDto) => ({
            skill: { connect: { id: skillDto.skillId } },
          })
        ),
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
        deleteMany: {},
        ...(updateExperienceDto.experienceSkills?.length
          ? {
              create: updateExperienceDto.experienceSkills.map((skillDto) => ({
                skill: { connect: { id: skillDto.skillId } },
              })),
            }
          : {}),
      },
    };

    return this.dbService.experiences.update({
      where: { id },
      data,
      include: {
        experienceSkills: true,
      },
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
