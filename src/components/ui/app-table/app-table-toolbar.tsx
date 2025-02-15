"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Interfaces
import { AppTableToolbarProps } from "@/lib/interfaces/table";

// Components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../button";

// Icons
import { ICONS, LABEL_ICONS } from "@/lib/constants/actions.constant";
import { PermissionStates } from "@/lib/enums/permissions.enum";
import { Plus } from "lucide-react";

const AppTableToolbar = ({
  numSelected,
  title,
  selected,
}: AppTableToolbarProps) => {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center p-3 bg-primary">
      {numSelected > 0 ? (
        <p className="text-white text-sm">
          {numSelected > 1 ? `${numSelected} seleccionados` : "1 seleccionado"}
        </p>
      ) : (
        <p className="text-white text-sm font-bold">{title}</p>
      )}

      <div className="flex">
        <div className="flex space-x-2">
          {[
            {
              name: "create",
              url: "/system",
            },
          ]
            .filter((p) => p.name !== PermissionStates.CREATE)
            .map((p, i) => (
              <TooltipProvider key={i}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={`${p.url}/${selected}?${p.name}=1`}>
                      <Button
                        key={p.name}
                        size="icon"
                        className="h-9 w-9 rounded-full"
                        variant="secondary"
                      >
                        {ICONS[p.name as PermissionStates]}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{LABEL_ICONS[p.name as PermissionStates]}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
        </div>

        <Link href={`${pathname}/create`}>
          <Button size="sm" variant="outline" className="ml-3 self-end">
            <Plus size={16} />
            Crear
          </Button>
        </Link>
      </div>
    </div>
  );
};

export { AppTableToolbar };
