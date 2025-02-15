import Link from "next/link";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUserSkeleton } from "./nav-user-skeleton";
import { Skeleton } from "../skeleton";

const AppSidebarSkeleton = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex items-start">
        <Link href={"/home"}>
          <Image
            src="https://res.cloudinary.com/ddmeptk5c/image/upload/f_auto,q_auto/v1/portfolio/wonlwuluroldfu03zcml"
            width={120}
            height={30}
            className="rounded-t-lg w-auto h-auto"
            priority
            alt="Login background"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <Skeleton className="h-12 w-full" />
      </SidebarContent>

      <SidebarFooter>
        <NavUserSkeleton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export { AppSidebarSkeleton };
