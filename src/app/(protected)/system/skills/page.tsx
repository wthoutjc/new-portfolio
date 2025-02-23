import { UserSkillsService } from "@/modules/skills/services/user-skills.service";
import { SkillsService } from "@/modules/skills/services/skills.service";
import { AppTableProps } from "@/lib/interfaces/table";
import { AppTable } from "@/components/ui/app-table/app-table";
import { auth } from "@/auth";

// Componentes
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const USER_SKILL_DICT = {
  "skill.name": "Skill",
  level: "Level",
  source: "Source",
  yearsOfExperience: "Years of Experience",
};

const SKILL_DICT = {
  name: "Skill",
  icon: "Icon",
};

interface Props {
  searchParams?: Promise<{
    search?: string;
    page?: string;
    rowsPerPage?: string;
  }>;
}

const userSkillsService = new UserSkillsService();
const skillsService = new SkillsService();
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

  const { data: skills } = await skillsService.findAll({
    contains: search,
    page,
    take: rowsPerPage,
  });

  const userSkillsDataTable: AppTableProps<(typeof data)[0]> = {
    caption: "Mis Habilidades",
    data,
    count: total,
    header: USER_SKILL_DICT,
    title: "Mis Habilidades",
  };

  const skillsDataTable: AppTableProps<(typeof skills)[0]> = {
    caption: "Habilidades",
    data: skills,
    count: skills.length,
    header: SKILL_DICT,
    title: "Habilidades",
  };

  return (
    <Tabs defaultValue="skills" className="w-full">
      <TabsList className="grid w-full grid-cols-2 rounded-none">
        <TabsTrigger value="skills" defaultChecked>
          Habilidades
        </TabsTrigger>
        <TabsTrigger value="user-skills">Mis Habilidades</TabsTrigger>
      </TabsList>

      <TabsContent value="skills" className="mt-0">
        <AppTable {...skillsDataTable} />
      </TabsContent>

      <TabsContent value="user-skills" className="mt-0">
        <AppTable {...userSkillsDataTable} />
      </TabsContent>
    </Tabs>
  );
}
