import { SkillsService } from "@/modules/skills/services/skills.service";
import { UserSkillsService } from "@/modules/skills/services/user-skills.service";
import { Error } from "@/components/ui/error/error";
import { SkillsForm } from "@/components/skills/skills-form";
import { UserSkillsForm } from "@/components/skills/user-skills-form";
import { EducationsService } from "@/modules/educations/services/educations.service";
import { ExperiencesService } from "@/modules/experiences/services/experiences.service";

interface Props {
  params: Promise<{
    id: string;
  }>;
}
const skillService = new SkillsService();
const userSkillsService = new UserSkillsService();
const experiencesService = new ExperiencesService();
const educationsService = new EducationsService();

export default async function SkillPage({ params }: Props) {
  const id = (await params).id;

  const skill = await skillService.findOne(id);
  if (!skill) {
    const [{ data: skills }, { data: experiences }, { data: educations }] =
      await Promise.all([
        skillService.findAll({ page: 1, take: 10 }),
        experiencesService.findAll({ page: 1, take: 10 }),
        educationsService.findAll({ page: 1, take: 10 }),
      ]);

    const userSkill = await userSkillsService.findOne(id);
    if (!userSkill) {
      return <Error message="Habilidad no encontrada" />;
    }

    return (
      <UserSkillsForm
        userSkill={userSkill}
        skills={skills}
        experiences={experiences}
        educations={educations}
      />
    );
  }

  return <SkillsForm skill={skill} />;
}
