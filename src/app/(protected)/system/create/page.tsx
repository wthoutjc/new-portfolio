import { db } from "@/common/database/database";
import { SkillsRepository } from "@/modules/skills/repositories/skills.repository";
import { SkillsService } from "@/modules/skills/services/skills.service";

import { ExperiencesForm } from "@/components/experiences/experiences-form";

export default async function SystemCreatePage() {
  const skillsRepository = new SkillsRepository(db);
  const skillsService = new SkillsService(skillsRepository);

  const { data: skills } = await skillsService.findAll({
    page: 1,
    take: 10,
  });

  return <ExperiencesForm skills={skills} />;
}
