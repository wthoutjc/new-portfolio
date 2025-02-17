import { SkillsService } from "@/modules/skills/services/skills.service";
import { ExperiencesForm } from "@/components/experiences/experiences-form";

const skillsService = new SkillsService();

export default async function SystemCreatePage() {
  const { data: skills } = await skillsService.findAll({
    page: 1,
    take: 100,
  });

  return <ExperiencesForm skills={skills} />;
}
