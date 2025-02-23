import { Prisma } from "@prisma/client";
import { db } from "@/common/database/database";
import { FindAllDto } from "@/modules/common/dto/find-all.dto";
import { CreateEducationDto } from "@/modules/educations/dto/create-education.dto";
import { UpdateEducationDto } from "@/modules/educations/dto/update-education.dto";

class EducationsRepository {
  private readonly dbService: typeof db;

  constructor() {
    this.dbService = db;
  }

  findEducationsByUserId(userId: string) {
    return this.dbService.educations.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      orderBy: {
        startDate: "desc",
      },
    });
  }

  findAll(findAllDto: FindAllDto) {
    const { contains, page, take } = findAllDto;

    const where: Prisma.EducationsWhereInput = {
      deletedAt: null,
    };

    if (contains) {
      where.OR = [
        { title: { contains } },
        { institution: { contains } },
        { educationType: { contains } },
      ];
    }

    return this.dbService.$transaction(async (tx) => {
      const data = await tx.educations.findMany({
        where,
        select: {
          id: true,
          title: true,
          institution: true,
          educationType: true,
          startDate: true,
          endDate: true,
        },
        skip: (page - 1) * take,
        take,
        orderBy: {
          startDate: "desc",
        },
      });

      const total = await tx.educations.count({
        where,
      });

      return {
        data,
        total,
      };
    });
  }

  findOne(id: string) {
    return this.dbService.educations.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  create(createEducationDto: CreateEducationDto, userId: string) {
    const data: Prisma.EducationsCreateInput = {
      ...createEducationDto,
      user: { connect: { id: userId } },
    };

    return this.dbService.educations.create({
      data,
    });
  }

  update(id: string, updateEducationDto: UpdateEducationDto) {
    const data: Prisma.EducationsUpdateInput = {
      ...updateEducationDto,
    };

    return this.dbService.educations.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return this.dbService.educations.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export { EducationsRepository };
