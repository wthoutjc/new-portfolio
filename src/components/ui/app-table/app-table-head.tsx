"use client";

// Components
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "../checkbox";

// Interfaces
import { AppTableHeadProps } from "@/lib/interfaces/table";

const AppTableHead = ({
  columns,
  numSelected,
  onSelectAllClick,
  rowCount,
  readonly,
}: AppTableHeadProps) => {
  return (
    <TableHeader className="bg-red-500">
      <TableRow>
        <TableHead>
          <Checkbox
            className="border-white"
            disabled={(numSelected > 0 && numSelected < rowCount) || readonly}
            checked={rowCount > 0 && numSelected === rowCount}
            onCheckedChange={onSelectAllClick}
          />
        </TableHead>
        {columns.slice(1).map((column, index) => (
          <TableHead className="text-white" key={index}>
            {column}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export { AppTableHead };
