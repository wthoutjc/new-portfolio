import { SkillsService } from "@/modules/skills/services/skills.service";
import { AppTableProps } from "@/lib/interfaces/table";
import { AppTable } from "@/components/ui/app-table/app-table";

const SKILL_DICT = {
  name: "Nombre",
  description: "Descripción",
  category: "Categoría",
  level: "Nivel",
};

interface Props {
  searchParams?: Promise<{
    search?: string;
    page?: string;
    rowsPerPage?: string;
  }>;
}

const skillsService = new SkillsService();

// Fuerza que la página se renderice de forma dinámica sin caché
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function SystemSkillsPage({ searchParams }: Props) {
  const sp = (await searchParams) || {};

  const search = sp.search || "";
  const page = Number(sp.page || 1);
  const rowsPerPage = Number(sp.rowsPerPage || 20);

  const { data, total } = await skillsService.findAll({
    contains: search,
    page,
    take: rowsPerPage,
  });

  const dataTable: AppTableProps<(typeof data)[0]> = {
    caption: "Habilidades",
    data,
    count: total,
    header: SKILL_DICT,
    title: "Habilidades",
  };

  return <AppTable {...dataTable} />;
}
