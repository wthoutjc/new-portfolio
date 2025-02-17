import SkillsTimeline from "@/components/timeline/skills-timeline";
import { UserSkillsService } from "@/modules/skills/services/user-skills.service";
import { UsersService } from "@/modules/users/services/users.service";
import { DEFAULT_USER } from "@/lib/constants/user.constant";
import { Error } from "@/components/ui/error/error";

const userSkillsService = new UserSkillsService();
const usersService = new UsersService();

export default async function SkillsPage() {
  const user = await usersService.findOne(DEFAULT_USER);

  if (!user) {
    return <Error message="No hay usuarios registrados" />;
  }

  const { data: userSkills } = await userSkillsService.findAll(
    {
      page: 1,
      take: 100,
    },
    user.id
  );

  if (!userSkills.length) {
    return <Error message="No hay habilidades registradas" />;
  }

  return <SkillsTimeline userSkills={userSkills} />;
}
