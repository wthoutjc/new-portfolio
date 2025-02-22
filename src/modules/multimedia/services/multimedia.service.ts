"use server";

import { S3Service } from "@/modules/s3/services/s3.service";
import { MultimediaRepository } from "../repositories/multimedia.repository";
import { CreateMultimediaDto } from "../dto/create-multimedia.dto";

class MultimediaService {
  private readonly multimediaRepository: MultimediaRepository;
  private readonly s3Service: S3Service;

  constructor() {
    this.multimediaRepository = new MultimediaRepository();
    this.s3Service = new S3Service();
  }

  async create(createMultimediaDto: CreateMultimediaDto) {
    return this.multimediaRepository.create(createMultimediaDto);
  }

  async findByEntity(entityId: string, entityType: string) {
    return this.multimediaRepository.findByEntity(entityId, entityType);
  }

  async deleteByEntity(entityId: string, entityType: string) {
    const files = await this.findByEntity(entityId, entityType);

    // Eliminar archivos de S3
    for (const file of files) {
      await this.s3Service.deleteFile(file.key);
    }

    // Marcar como eliminados en la base de datos
    return this.multimediaRepository.deleteByEntity(entityId, entityType);
  }
}

export { MultimediaService };
