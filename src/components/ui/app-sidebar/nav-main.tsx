" use client";
import Link from "next/link";

// Components
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

// Icons
import { ChevronRight, CodeXml } from "lucide-react";
import { Module } from "@/lib/interfaces/module";

export function NavMain() {
  const modules: Module[] = [
    {
      id: "portfolio",
      name: "Gestion de portafolio",
      url: null,
      is_active: true,
      icon: CodeXml,
      items: [
        {
          id: "portfolio-experiences",
          name: "Experiencias",
          url: "/system",
          module_id: "portfolio",
        },
        {
          id: "portfolio-projects",
          name: "Educación",
          url: "/system/educations",
          module_id: "portfolio",
        },
        {
          id: "portfolio-skills",
          name: "Habilidades",
          url: "/system/skills",
          module_id: "portfolio",
        },
      ],
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Administración</SidebarGroupLabel>
      <SidebarMenu>
        {modules.map((module) => (
          <Collapsible
            key={module.name}
            asChild
            defaultOpen={module.is_active}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={module.name}>
                  {module.icon && <module.icon />}
                  <span>{module.name}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {module.items?.map((item) => (
                    <SidebarMenuSubItem key={item.name}>
                      <SidebarMenuSubButton asChild>
                        <Link href={item.url}>
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
