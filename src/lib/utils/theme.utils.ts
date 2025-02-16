import { ThemeConfig } from "../interfaces/ui";
import { cn } from "../utils";

export const getTableStyles = (themeConfig: ThemeConfig) => {
  return {
    table: {
      base: cn("w-full border-collapse", "transition-colors duration-200"),
      dark: "dark:border-gray-700",
    },
    row: {
      base: cn("transition-colors duration-200", "hover:bg-muted/50"),
      selected: cn("bg-primary/5", "hover:bg-primary/10"),
      alternate: (index: number) =>
        cn(index % 2 === 0 ? "bg-background" : "bg-muted/30"),
      styles: (props: { isSelected: boolean; index: number }) =>
        cn(
          "transition-colors duration-200",
          props.isSelected && "bg-primary/5 hover:bg-primary/10",
          !props.isSelected && props.index % 2 === 0 && "bg-background",
          !props.isSelected && props.index % 2 !== 0 && "bg-muted/30"
        ),
    },
    cell: {
      base: cn(
        "p-4",
        "transition-colors duration-200",
        "border-b",
        "border-border"
      ),
    },
    header: {
      base: cn(
        "h-12",
        "px-4",
        "text-left",
        "align-middle",
        "font-medium",
        "text-muted-foreground",
        "transition-colors duration-200"
      ),
    },
    customStyles: {
      selectedRow: {
        backgroundColor: `${themeConfig.primary}10`,
        "&:hover": {
          backgroundColor: `${themeConfig.primary}20`,
        },
      },
      alternateRow: {
        backgroundColor: `${themeConfig.background}`,
      },
      headerCell: {
        color: themeConfig.secondary,
      },
    },
  };
};
