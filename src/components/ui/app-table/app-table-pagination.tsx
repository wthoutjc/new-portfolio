"use client";
import { ChangeEvent } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

// Components
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  count: number;
}

const AppTablePagination = ({ count }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const rowsPerPage = parseInt(searchParams.get("rowsPerPage") || "10", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const totalPages = Math.ceil(count / rowsPerPage);

  const handleParams = (
    label: string,
    term: string,
    params: URLSearchParams
  ) => {
    if (term) params.set(label, term);
    else params.delete(label);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      const params = new URLSearchParams(searchParams);
      handleParams("page", newPage.toString(), params);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    handleParams("rowsPerPage", event.target.value, params);
    handleParams("page", "1", params); // Reset page to 1 when rows per page changes

    replace(`${pathname}?${params.toString()}`);
  };

  const getPaginationItems = () => {
    const pagesToShow = 2; // Number of pages to show before and after the current page
    const items = [];

    // Always show the first page
    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          href="#"
          onClick={() => handlePageChange(1)}
          isActive={page === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Show ellipsis if the current page is further than pagesToShow + 2 from the start
    if (page > pagesToShow + 2) {
      items.push(<PaginationEllipsis key="start-ellipsis" />);
    }

    // Pages around the current page
    for (
      let i = Math.max(2, page - pagesToShow);
      i <= Math.min(totalPages - 1, page + pagesToShow);
      i++
    ) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={() => handlePageChange(i)}
            isActive={page === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Show ellipsis if the current page is further than pagesToShow + 2 from the end
    if (page < totalPages - pagesToShow - 1) {
      items.push(<PaginationEllipsis key="end-ellipsis" />);
    }

    // Always show the last page if it's more than one page away
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            onClick={() => handlePageChange(totalPages)}
            isActive={page === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="flex items-center">
      {/* Selector for rows per page */}
      <div className="flex w-full mb-4 items-center">
        <label htmlFor="rowsPerPage" className="mr-2 text-sm">
          Filas por página:
        </label>
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="border rounded px-2 py-1"
        >
          {[10, 20, 30, 50].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Component */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {page > 1 && (
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(page - 1)}
              />
            )}
          </PaginationItem>

          {getPaginationItems()}

          <PaginationItem>
            {page < totalPages && (
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(page + 1)}
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AppTablePagination;
