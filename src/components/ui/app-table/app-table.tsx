"use client";
import { useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

// Components
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import AppTablePagination from "./app-table-pagination";

// Interfaces
import {
  AppTableHeadProps,
  AppTableProps,
  AppTableToolbarProps,
  TableFilter,
} from "@/lib/interfaces/table";
import { AppTableActions } from "./app-table-actions";

// Icons
import { Search } from "lucide-react";
import { Error } from "../error/error";
import { AppTableHead } from "./app-table-head";
import { AppTableToolbar } from "./app-table-toolbar";
import { Checkbox } from "../checkbox";

const AppTable = ({
  caption,
  data,
  count,
  header,
  title,
  readonly = false,
}: AppTableProps<unknown>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rowsPerPage = parseInt(searchParams.get("rowsPerPage") || "10", 10);
  const totalPages = Math.ceil(count / rowsPerPage);

  const [selected, setSelected] = useState<readonly string[]>([]);

  const keys = data.length > 0 ? Object.keys(data[0] as any) : [];
  const values = Object.values(data);

  const clientFilters: TableFilter[] = [
    {
      autoComplete: "off",
      defaultValue: "",
      icon: Search,
      label: "search",
      placeholder: "Buscar...",
      width: 1,
      select: false,
      type: "text",
    },
  ];

  const onSelectAllClick = (checked: boolean) => {
    if (checked) {
      const newSelected = (data as object[]).map(
        (n) => (n as any)[Object.keys(n)[0]]
      );
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const tableHeadData: AppTableHeadProps = {
    onSelectAllClick,
    columns: keys.map((key) => header[key]),
    numSelected: selected.length,
    rowCount: data.length,
    readonly,
  };

  const tableToolbarData: AppTableToolbarProps = {
    numSelected: selected.length,
    selected: selected[0],
    title,
  };

  const handleClick = (_: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  if (!data.length) {
    return (
      <div className="flex flex-col">
        <AppTableActions filters={clientFilters} />
        <AppTableToolbar {...tableToolbarData} />
        <Error message="No hay datos para mostrar" />
      </div>
    );
  }

  return (
    <div className="bg-muted">
      <AppTableActions filters={clientFilters} />
      <AppTableToolbar {...tableToolbarData} />
      <Table>
        {caption && <TableCaption className="mb-4">{caption}</TableCaption>}
        <AppTableHead {...tableHeadData} />
        <TableBody>
          {values.map((row, i) => {
            const rowEntries = Object.entries(row as any);
            const firstKey = rowEntries[0][0];
            const checked = isSelected((row as any)[firstKey]);

            return (
              <TableRow
                key={(row as any)[firstKey] || i}
                className={`${checked ? "selected" : ""} ${
                  readonly ? "cursor-pointer" : ""
                }
                ${i % 2 === 0 ? "bg-white" : ""} ${
                  i === values.length - 1 ? "rounded-b-lg" : ""
                } ${i === 0 ? "rounded-t-lg" : ""} ${
                  i === values.length - 1 && i === 0 ? "rounded-lg" : ""
                }
                ${checked ? "bg-blue-100" : ""}
                `}
                tabIndex={-1}
                onDoubleClick={() =>
                  router.push(`${pathname}/${(row as any)[firstKey]}?read=1`)
                }
                onClick={(event) => handleClick(event, (row as any)[firstKey])}
              >
                <TableCell>
                  <Checkbox checked={checked} />
                </TableCell>

                {keys.slice(1).map((key) => (
                  <TableCell key={key}>
                    {(row as Record<string, any>)[key]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
        {count > 0 && totalPages !== 1 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={keys.length}>
                <AppTablePagination count={count} />
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
};

export { AppTable };
