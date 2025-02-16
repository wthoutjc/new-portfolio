"use client";
import { useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import dayjs from "dayjs";

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
import { AppTableActions } from "./app-table-actions";
import { AppTableHead } from "./app-table-head";
import { AppTableToolbar } from "./app-table-toolbar";
import { Checkbox } from "../checkbox";
import { Error } from "../error/error";

// Interfaces
import {
  AppTableHeadProps,
  AppTableProps,
  AppTableToolbarProps,
  TableFilter,
} from "@/lib/interfaces/table";

// Icons
import { Search } from "lucide-react";

// Theme
import { useThemeConfig } from "@/lib/hooks/use-theme-config";
import { AppTableSkeleton } from "./app-table-skeleton";
import { getTableStyles } from "@/lib/utils/theme.utils";

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

  const { themeConfig } = useThemeConfig();
  const tableStyles = themeConfig ? getTableStyles(themeConfig) : null;

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

  if (!themeConfig || !tableStyles) {
    return <AppTableSkeleton />;
  }

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
      <Table className={tableStyles.table.base}>
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
                className={tableStyles.row.styles({
                  isSelected: checked,
                  index: i,
                })}
                style={
                  checked
                    ? tableStyles.customStyles.selectedRow
                    : i % 2 === 0
                    ? tableStyles.customStyles.alternateRow
                    : undefined
                }
                tabIndex={-1}
                onDoubleClick={() =>
                  router.push(`${pathname}/${(row as any)[firstKey]}`)
                }
                onClick={(event) => handleClick(event, (row as any)[firstKey])}
              >
                <TableCell className={tableStyles.cell.base}>
                  <Checkbox checked={checked} />
                </TableCell>

                {keys.slice(1).map((key) => (
                  <TableCell key={key} className={tableStyles.cell.base}>
                    {(() => {
                      const cellValue = (row as Record<string, any>)[key];
                      if (cellValue == null) return "-";
                      if (cellValue instanceof Date) {
                        return dayjs(cellValue).format("DD-MM-YYYY HH:mm");
                      }
                      if (
                        typeof cellValue === "string" &&
                        !isNaN(Date.parse(cellValue))
                      ) {
                        return dayjs(cellValue).format("DD-MM-YYYY HH:mm");
                      }
                      return cellValue.toString();
                    })()}
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
