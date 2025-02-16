"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BREADCRUMB_DATA } from "./breadcrumb-data";

// Capitalize
import { capitalize } from "@/lib/utils/capitalize";

// UUID
import { v4 as uuid } from "uuid";

const AppBreadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathname === "/home" && (
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbPage>Inicio</BreadcrumbPage>
          </BreadcrumbItem>
        )}

        {pathname !== "/home" &&
          paths.map((path, index) => (
            <React.Fragment key={uuid()}>
              {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
              <BreadcrumbItem className="hidden md:block">
                {index + 1 === paths.length ? (
                  <BreadcrumbPage>
                    {BREADCRUMB_DATA[path]
                      ? capitalize(BREADCRUMB_DATA[path])
                      : capitalize(path)}
                  </BreadcrumbPage>
                ) : (
                  <Link href={`/${paths.slice(0, index + 1).join("/")}`}>
                    {BREADCRUMB_DATA[path]
                      ? capitalize(BREADCRUMB_DATA[path])
                      : capitalize(path)}
                  </Link>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export { AppBreadcrumb };
