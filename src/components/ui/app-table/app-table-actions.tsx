"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Interfaces
import { TableFilter } from "@/lib/interfaces/table";

// Icons
import { Eraser } from "lucide-react";
import { Button } from "../button";

interface Props {
  filters: TableFilter[];
}

const WAIT_INTERVAL = 500;

const AppTableActions = ({ filters }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((label: string, term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) params.set(label, term);
    else params.delete(label);
    replace(`${pathname}?${params.toString()}`);
  }, WAIT_INTERVAL);

  return (
    <div className="p-2 w-full">
      {filters?.map((filter, index) => {
        const { select, items, type, placeholder, autoComplete, label } =
          filter;

        const labelValue = searchParams.get(label) || "";

        return (
          <div key={index}>
            {select && items && items.length > 0 ? (
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {items.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <div className="flex relative items-center">
                <Input
                  className="w-full"
                  type={type}
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  onChange={(e) => handleSearch(label, e.target.value)}
                />
                <div className="flex absolute w-full justify-end box-border pr-3">
                  {labelValue.length > 0 ? (
                    <Button
                      size="icon"
                      onClick={() => handleSearch(label, "")}
                      variant="ghost"
                    >
                      <Eraser className="w-4 h-4" />
                    </Button>
                  ) : (
                    <filter.icon className="w-4 h-4" />
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export { AppTableActions };
