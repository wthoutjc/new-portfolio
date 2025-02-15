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
          <Link href={"/system"}>
            <Image
              src="https://res.cloudinary.com/ddmeptk5c/image/upload/f_auto,q_auto/v1/portfolio/wonlwuluroldfu03zcml"
              width={120}
              height={30}
              className="rounded-t-lg w-auto h-auto"
              priority
              alt="Cámara de Comercio de Bogotá"
            />
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain />
      </SidebarContent>

      <SidebarFooter>
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
