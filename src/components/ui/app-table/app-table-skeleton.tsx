"use client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AppTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Array.from({ length: 3 }).map((_, index) => (
            <TableHead key={index}>
              <Skeleton className="h-8 w-full" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-8 w-full" />
            </TableCell>

            <TableCell>
              <Skeleton className="h-8 w-full" />
            </TableCell>

            <TableCell>
              <Skeleton className="h-8 w-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          {Array.from({ length: 3 }).map((_, index) => (
            <TableCell key={index}>
              <Skeleton className="h-8 w-full" />
            </TableCell>
          ))}
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export { AppTableSkeleton };
