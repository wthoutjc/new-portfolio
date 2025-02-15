import { AppTable } from "@/components/ui/app-table/app-table";
import { AppTableProps } from "@/lib/interfaces/table";
import { ExperiencesService } from "@/modules/experiences/services/experiences.service";

const EXPERIENCE_DICT = {
  title: "Cargo",
  company: "Empresa",
  location: "Ubicación",
  locationType: "Tipo de ubicación",
  startDate: "Fecha de inicio",
  endDate: "Fecha de fin",
};

interface Props {
  searchParams?: Promise<{
    search?: string;
    page?: string;
    rowsPerPage?: string;
  }>;
}

const experiencesService = new ExperiencesService();

// Fuerza que la página se renderice de forma dinámica sin caché
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function SystemPage({ searchParams }: Props) {
  const sp = (await searchParams) || {};

  const search = sp.search || "";
  const page = Number(sp.page || 1);
  const rowsPerPage = Number(sp.rowsPerPage || 20);

  const { data, total } = await experiencesService.findAll({
    contains: search,
    page,
    take: rowsPerPage,
  });

  const dataTable: AppTableProps<(typeof data)[0]> = {
    caption: "Experiencias",
    data,
    count: total,
    header: EXPERIENCE_DICT,
    title: "Experiencias",
  };

  return <AppTable {...dataTable} />;
}
