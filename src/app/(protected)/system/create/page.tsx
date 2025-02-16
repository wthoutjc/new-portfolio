import { SkillsService } from "@/modules/skills/services/skills.service";

import { ExperiencesForm } from "@/components/experiences/experiences-form";

export default async function SystemCreatePage() {
  const skillsService = new SkillsService();

  const { data: skills } = await skillsService.findAll({
    page: 1,
    take: 10,
  });

  return <ExperiencesForm skills={skills} />;
}
