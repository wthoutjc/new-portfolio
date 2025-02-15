import { db } from "@/common/database/database";
import { AppTable } from "@/components/ui/app-table/app-table";
import { AppTableProps } from "@/lib/interfaces/table";
import { ExperiencesRepository } from "@/modules/experiences/repositories/experiences.repository";
import { ExperiencesService } from "@/modules/experiences/services/experiences.service";

const EXPERIENCE_DICT = {
  id: "title",
  label: "Título",
};

interface Props {
  searchParams?: {
    search?: string;
    page?: string;
    rowsPerPage?: string;
  };
}

export default async function SystemPage({ searchParams }: Props) {
  const search = searchParams?.search || "";
  const page = Number(searchParams?.page || 1);
  const rowsPerPage = Number(searchParams?.rowsPerPage || 20);

  const { data, total } = await new ExperiencesService(
    new ExperiencesRepository(db)
  ).findAll({
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
