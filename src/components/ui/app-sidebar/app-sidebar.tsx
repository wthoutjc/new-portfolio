"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// Components
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { User } from "@/lib/interfaces/auth";
import { AppSidebarSkeleton } from "./app-sidebar-skeleton";
import { NavUser } from "./nav-user";
import { NavUserSkeleton } from "./nav-user-skeleton";
import { ModeToggle } from "../toggle-theme/toggle-theme";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const [loading, setLoading] = useState(false);
  const { status, data: session } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false);
    }
  }, [status]);

  if (loading) return <AppSidebarSkeleton />;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <ul>
            <li className="dark:flex w-32 opacity-80 hover:opacity-100 ease-out duration-300 hidden">
              <Link href={"/system"}>
                <Image
                  className="object-cover"
                  src="https://res.cloudinary.com/ddmeptk5c/image/upload/f_auto,q_auto/v1/portfolio/nrmlj5wmeop1rcqp5hdp"
                  alt="ionjc"
                  width={250}
                  height={250}
                />
              </Link>
            </li>
            <li className="flex w-32 opacity-80 hover:opacity-100 ease-out duration-300 dark:hidden">
              <Link href={"/system"}>
                <Image
                  className="object-cover"
                  src="https://res.cloudinary.com/ddmeptk5c/image/upload/f_auto,q_auto/v1/portfolio/wonlwuluroldfu03zcml"
                  alt="ionjc"
                  width={250}
                  height={250}
                />
              </Link>
            </li>
          </ul>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain />
      </SidebarContent>

      <SidebarFooter className="flex flex-row items-center justify-between">
        <ModeToggle />
        {session && session.user && status === "authenticated" && (
          <NavUser user={session.user as User} />
        )}
        {status === "loading" && <NavUserSkeleton />}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export { AppSidebar };
