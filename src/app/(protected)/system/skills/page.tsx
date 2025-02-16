import { UserSkillsService } from "@/modules/skills/services/user-skills.service";
import { AppTableProps } from "@/lib/interfaces/table";
import { AppTable } from "@/components/ui/app-table/app-table";
import { auth } from "@/auth";

const USER_SKILL_DICT = {
  "skill.name": "Habilidad",
  level: "Nivel",
  source: "Fuente",
  yearsOfExperience: "Años de experiencia",
};

interface Props {
  searchParams?: Promise<{
    search?: string;
    page?: string;
    rowsPerPage?: string;
  }>;
}

const userSkillsService = new UserSkillsService();

// Fuerza que la página se renderice de forma dinámica sin caché
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function SystemSkillsPage({ searchParams }: Props) {
  const session = await auth();
  const sp = (await searchParams) || {};

  const search = sp.search || "";
  const page = Number(sp.page || 1);
  const rowsPerPage = Number(sp.rowsPerPage || 20);

  const { data, total } = await userSkillsService.findAll(
    {
      contains: search,
      page,
      take: rowsPerPage,
    },
    session?.user?.id || ""
  );

  const dataTable: AppTableProps<(typeof data)[0]> = {
    caption: "Mis Habilidades",
    data,
    count: total,
    header: USER_SKILL_DICT,
    title: "Mis Habilidades",
  };

  return <AppTable {...dataTable} />;
}
