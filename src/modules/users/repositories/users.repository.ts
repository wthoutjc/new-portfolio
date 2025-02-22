import { isUUID } from "@/lib/utils/is-uuid";
import { Prisma } from "@prisma/client";
import { db } from "@/common/database/database";

type UserWithRelations = {
  id: string;
  email: string;
  password: string;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  experiences: Array<{
    id: string;
    title: string;
    employmentType: string | null;
    company: string;
    location: string | null;
    locationType: string | null;
    startDate: Date;
    endDate: Date | null;
    currentlyWorking: boolean;
    description: string | null;
    multimedia: Array<{
      url: string;
      key: string;
      name: string;
      type: string;
      size: number;
    }>;
    experienceSkills: Array<{
      experienceId: string;
      skillId: string;
      skill: {
        id: string;
        name: string;
        icon: string | null;
        description: string | null;
      };
    }>;
  }>;
};

export class UsersRepository {
  private readonly dbService: typeof db;
  constructor() {
    this.dbService = db;
  }

  async findOne(unique: string): Promise<UserWithRelations | null> {
    const where: Prisma.UsersWhereInput = {
      ...(isUUID(unique) ? { id: unique } : { email: unique }),
      deletedAt: null,
    };

    const user = await this.dbService.users.findFirst({
      where,
      select: {
        id: true,
        email: true,
        password: true,
        deletedAt: true,
        createdAt: true,
        updatedAt: true,
        experiences: {
          where: {
            deletedAt: null,
          },
          select: {
            id: true,
            title: true,
            employmentType: true,
            company: true,
            location: true,
            locationType: true,
            startDate: true,
            endDate: true,
            currentlyWorking: true,
            description: true,
            experienceSkills: {
              select: {
                experienceId: true,
                skillId: true,
                skill: {
                  select: {
                    id: true,
                    name: true,
                    icon: true,
                    description: true,
                  },
                },
              },
            },
          },
          orderBy: [
            {
              currentlyWorking: "desc",
            },
            {
              startDate: "desc",
            },
            {
              endDate: "asc",
            },
          ],
        },
      },
    });

    if (!user) return null;

    // Obtener multimedia para cada experiencia
    const experiencesWithMultimedia = await Promise.all(
      user.experiences.map(async (experience) => {
        const multimedia = await this.dbService.multimedia.findMany({
          where: {
            entityId: experience.id,
            entityType: "experience",
            deletedAt: null,
          },
          select: {
            url: true,
            key: true,
            name: true,
            type: true,
            size: true,
          },
        });

        return {
          ...experience,
          multimedia,
        };
      })
    );

    return {
      ...user,
      experiences: experiencesWithMultimedia,
    } as UserWithRelations;
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
