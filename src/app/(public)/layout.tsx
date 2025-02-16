import { AppNavbar } from "@/components/ui/app-navbar/app-navbar";
import { SideMe } from "@/components/ui/side-me/side-me";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col max-w-full min-h-screen">
      <AppNavbar />
      <div className="flex flex-[1_0_auto] justify-center">
        <div className="flex flex-col max-w-7xl w-full md:flex-row">
          <SideMe />
          <div
            className="flex flex-col p-3 md:pt-3 md:p-0 w-full md:w-3/4"
            id="content"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
