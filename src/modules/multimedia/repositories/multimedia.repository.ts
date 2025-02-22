"use server";

import { db } from "@/common/database/database";
import { CreateMultimediaDto } from "../dto/create-multimedia.dto";

class MultimediaRepository {
  private readonly dbService: typeof db;

  constructor() {
    this.dbService = db;
  }

  async create(createMultimediaDto: CreateMultimediaDto) {
    return this.dbService.multimedia.create({
      data: createMultimediaDto,
    });
  }

  async findByEntity(entityId: string, entityType: string) {
    return this.dbService.multimedia.findMany({
      where: {
        entityId,
        entityType,
        deletedAt: null,
      },
    });
  }

  async deleteByEntity(entityId: string, entityType: string) {
    const now = new Date();
    return this.dbService.multimedia.updateMany({
      where: {
        entityId,
        entityType,
        deletedAt: null,
      },
      data: {
        deletedAt: now,
      },
    });
  }
}

export { MultimediaRepository };
