import { ExperiencesForm } from "@/components/experiences/experiences-form";
import { Error } from "@/components/ui/error/error";
import { ExperiencesService } from "@/modules/experiences/services/experiences.service";
import { SkillsService } from "@/modules/skills/services/skills.service";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const experiencesService = new ExperiencesService();
const skillsService = new SkillsService();

export default async function SystemExperiencePage({ params }: Props) {
  const id = (await params).id;

  const experience = await experiencesService.findOne(id);
  if (!experience) return <Error message="Experiencia no encontrada" />;

  const transformedExperience = {
    ...experience,
    multimedia: experience.multimedia.map((m) => ({
      ...m,
      deletedAt: m.deletedAt?.toISOString() || null,
      createdAt: m.createdAt.toISOString(),
      updatedAt: m.updatedAt.toISOString(),
    })),
  };

  const { data: skills } = await skillsService.findAll({
    page: 1,
    take: 100,
  });

  return <ExperiencesForm skills={skills} experience={transformedExperience} />;
}
