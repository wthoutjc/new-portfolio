import Timeline from "@/components/timeline/experience-timeline";
import { Error } from "@/components/ui/error/error";
import { DEFAULT_USER } from "@/lib/constants/user.constant";
import { UsersService } from "@/modules/users/services/users.service";

const usersService = new UsersService();

export default async function Home() {
  const user = await usersService.findOne(DEFAULT_USER);

  if (!user || !user.experiences.length) {
    return (
      <Error message="No se encontró el usuario o no tiene experiencias" />
    );
  }

  return <Timeline experiences={user.experiences} />;
}
