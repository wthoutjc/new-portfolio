import { UserSkillsForm } from "@/components/skills/user-skills-form";
import { SkillsService } from "@/modules/skills/services/skills.service";
import { ExperiencesService } from "@/modules/experiences/services/experiences.service";
import { EducationsService } from "@/modules/educations/services/educations.service";

const skillsService = new SkillsService();
const experiencesService = new ExperiencesService();
const educationsService = new EducationsService();

export default async function SystemSkillsCreatePage() {
  const [{ data: skills }, { data: experiences }, { data: educations }] =
    await Promise.all([
      skillsService.findAll({ page: 1, take: 100 }),
      experiencesService.findAll({ page: 1, take: 100 }),
      educationsService.findAll({ page: 1, take: 100 }),
    ]);

  return (
    <UserSkillsForm
      skills={skills}
      experiences={experiences}
      educations={educations}
    />
  );
}
