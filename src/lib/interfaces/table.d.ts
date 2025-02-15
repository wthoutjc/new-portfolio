export interface AppTableProps<T> {
  caption?: string;
  title: string;
  data: readonly T[];
  header: { [key: string]: string };
  count: number;
  readonly?: boolean;
}

export type TableFilterType =
  | "text"
  | "number"
  | "date"
  | "select"
  | "checkbox"
  | "radio"
  | "custom";

interface TableFilterItem {
  value: string;
  label: string;
}

export interface TableFilter {
  width: number;
  placeholder: string;
  type: TableFilterType;
  autoComplete: string;
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  select: boolean;
  label: string;
  defaultValue: string;
  items?: TableFilterItem[];
}

export interface AppTableHeadProps {
  columns: readonly string[];
  onSelectAllClick: (event: FormEventHandler<HTMLButtonElement>) => void;
  numSelected: number;
  rowCount: number;
  readonly?: boolean;
}

export interface AppTableToolbarProps {
  numSelected: number;
  title: string;
  selected: string;
}
