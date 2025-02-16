import { cookies } from "next/headers";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar/app-sidebar";

import { Separator } from "@radix-ui/react-separator";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb/app-breadcrumb";
import { auth } from "@/auth";

// Services
import { redirect } from "next/navigation";

// Auth
import AuthProvider from "@/components/auth/session-provider";
import { AlertDialog } from "@/components/ui/alert-dialog/alert-dialog";

const ProtectedLayoutPage = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookieStore = await cookies();
  const defaultOpen =
    cookieStore.get("sidebar:state")?.value === "true" || true;

  const session = await auth();
  if (!session) redirect("/auth/logout");

  return (
    <AuthProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <header className="pl-2 flex h-8 mt-2 shrink-0 items-center gap-1 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" />
            <AppBreadcrumb />
          </header>

          {children}
        </SidebarInset>
        <AlertDialog />
      </SidebarProvider>
    </AuthProvider>
  );
};

export default ProtectedLayoutPage;
