import { EducationsService } from "@/modules/educations/services/educations.service";
import { EducationsForm } from "@/components/educations/educations-form";
import { Error } from "@/components/ui/error/error";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EducationPage({ params }: Props) {
  const id = (await params).id;

  const educationService = new EducationsService();
  const education = await educationService.findOne(id);

  if (!education) return <Error message="Educación no encontrada" />;
  return <EducationsForm education={education} />;
}
