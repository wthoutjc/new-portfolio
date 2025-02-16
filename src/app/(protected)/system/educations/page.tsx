import { EducationsService } from "@/modules/educations/services/educations.service";
import { AppTableProps } from "@/lib/interfaces/table";
import { AppTable } from "@/components/ui/app-table/app-table";

const EDUCATION_DICT = {
  title: "Título",
  institution: "Institución",
  educationType: "Tipo de educación",
  startDate: "Fecha de inicio",
  endDate: "Fecha de finalización",
};

interface Props {
  searchParams?: Promise<{
    search?: string;
    page?: string;
    rowsPerPage?: string;
  }>;
}

const educationService = new EducationsService();

// Fuerza que la página se renderice de forma dinámica sin caché
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function EducationsPage({ searchParams }: Props) {
  const sp = (await searchParams) || {};

  const search = sp.search || "";
  const page = Number(sp.page || 1);
  const rowsPerPage = Number(sp.rowsPerPage || 20);

  const { data, total } = await educationService.findAll({
    contains: search,
    page,
    take: rowsPerPage,
  });

  const dataTable: AppTableProps<(typeof data)[0]> = {
    caption: "Educación",
    data,
    count: total,
    header: EDUCATION_DICT,
    title: "Educación",
  };

  return <AppTable {...dataTable} />;
}
