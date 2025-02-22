import { EducationsRepository } from "../repositories/educations.repository";
import { FindAllDto } from "@/modules/common/dto/find-all.dto";
import { CreateEducationDto } from "../dto/create-education.dto";
import { UpdateEducationDto } from "../dto/update-education.dto";
import { MultimediaService } from "@/modules/multimedia/services/multimedia.service";
import { CreateMultimediaDto } from "@/modules/multimedia/dto/create-multimedia.dto";

class EducationsService {
  private readonly educationsRepository: EducationsRepository;
  private readonly multimediaService: MultimediaService;

  constructor() {
    this.educationsRepository = new EducationsRepository();
    this.multimediaService = new MultimediaService();
  }

  findAll(findAllDto: FindAllDto) {
    return this.educationsRepository.findAll(findAllDto);
  }

  findEducationsByUserId(userId: string) {
    return this.educationsRepository.findEducationsByUserId(userId);
  }

  async findOne(id: string) {
    const education = await this.educationsRepository.findOne(id);
    if (!education) return null;

    const multimedia = await this.multimediaService.findByEntity(
      id,
      "education"
    );
    return { ...education, multimedia };
  }

  async create(createEducationDto: CreateEducationDto, userId: string) {
    const { multimedia, ...educationData } = createEducationDto;

    const education = await this.educationsRepository.create(
      educationData,
      userId
    );

    if (multimedia?.length) {
      await Promise.all(
        multimedia.map(async (file) => {
          // Remover el prefijo temporal de la clave si existe
          const key = file.key.startsWith("temp-")
            ? file.key.replace("temp-", "")
            : file.key;

          return this.multimediaService.create({
            ...file,
            key,
            entityId: education.id,
            entityType: "education",
          } as CreateMultimediaDto);
        })
      );
    }

    return this.findOne(education.id);
  }

  async update(id: string, updateEducationDto: UpdateEducationDto) {
    const education = await this.educationsRepository.findOne(id);
    if (!education) throw new Error("Education not found");

    const { multimedia, ...educationData } = updateEducationDto;

    // Obtener multimedia actual
    const currentMultimedia = await this.multimediaService.findByEntity(
      id,
      "education"
    );

    // Caso 1: Se están eliminando todos los archivos
    if (currentMultimedia?.length && !multimedia?.length) {
      await this.multimediaService.deleteByEntity(id, "education");
    }
    // Caso 2: Hay cambios en los archivos existentes
    else if (multimedia?.length) {
      // Verificar si hay cambios reales en multimedia
      const hasMultimediaChanges =
        JSON.stringify(multimedia.map((m) => m.key).sort()) !==
        JSON.stringify(currentMultimedia?.map((m) => m.key).sort());

      if (hasMultimediaChanges) {
        // Eliminar multimedia anterior
        await this.multimediaService.deleteByEntity(id, "education");

        // Crear nueva multimedia
        await Promise.all(
          multimedia.map((file) =>
            this.multimediaService.create({
              ...file,
              entityId: id,
              entityType: "education",
            } as CreateMultimediaDto)
          )
        );
      }
    }

    await this.educationsRepository.update(id, educationData);
    return this.findOne(id);
  }

  async delete(id: string) {
    const education = await this.educationsRepository.findOne(id);
    if (!education) throw new Error("Education not found");

    // Eliminar multimedia
    await this.multimediaService.deleteByEntity(id, "education");

    return this.educationsRepository.delete(id);
  }
}

export { EducationsService };
