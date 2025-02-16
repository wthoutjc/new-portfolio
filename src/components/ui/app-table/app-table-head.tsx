"use client";

// Components
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "../checkbox";

// Interfaces
import { AppTableHeadProps } from "@/lib/interfaces/table";

// Theme
import { useThemeConfig } from "@/lib/hooks/use-theme-config";
import { getTableStyles } from "@/lib/utils/theme.utils";

export const AppTableHead = ({
  onSelectAllClick,
  columns,
  numSelected,
  rowCount,
}: AppTableHeadProps) => {
  const { themeConfig } = useThemeConfig();
  const tableStyles = themeConfig ? getTableStyles(themeConfig) : null;

  if (!tableStyles) return null;

  return (
    <TableHeader>
      <TableRow>
        <TableHead className={tableStyles.header.base}>
          <Checkbox
            checked={rowCount > 0 && numSelected === rowCount}
            onCheckedChange={onSelectAllClick}
          />
        </TableHead>
        {columns.slice(1).map((column, index) => (
          <TableHead
            key={index}
            className={tableStyles.header.base}
            style={tableStyles.customStyles.headerCell}
          >
            {column}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};
