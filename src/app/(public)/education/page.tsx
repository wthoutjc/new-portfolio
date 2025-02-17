import EducationTimeline from "@/components/timeline/education-timeline";
import { DEFAULT_USER } from "@/lib/constants/user.constant";
import { EducationsService } from "@/modules/educations/services/educations.service";
import { UsersService } from "@/modules/users/services/users.service";
import { Error } from "@/components/ui/error/error";

const educationService = new EducationsService();
const usersService = new UsersService();

export default async function EducationPage() {
  const user = await usersService.findOne(DEFAULT_USER);
  if (!user) {
    return <Error message="No se encontró el usuario" />;
  }

  const educations = await educationService.findEducationsByUserId(user.id);
  if (!educations.length) {
    return <Error message="No se encontró la educación del usuario" />;
  }

  return <EducationTimeline educations={educations} />;
}
