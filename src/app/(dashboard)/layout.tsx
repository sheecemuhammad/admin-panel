import type { CSSProperties } from "react";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const dashboardSidebarStyle = {
  "--sidebar": "#000000",
  "--sidebar-foreground": "#FFFFFF",
  "--sidebar-primary": "#FFFFFF",
  "--sidebar-primary-foreground": "#000000",
  "--sidebar-accent": "#262A30",
  "--sidebar-accent-foreground": "#FFFFFF",
  "--sidebar-border": "#2e2e2e",
  "--sidebar-ring": "#FFFFFF",
  "--sidebar-width": "16.5rem",
} as CSSProperties;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider style={dashboardSidebarStyle} className="bg-black">
      <AppSidebar />
      <SidebarInset className="m-2 ml-2 h-[calc(100svh-1rem)] max-h-[calc(100svh-1rem)] min-h-0 flex-1 overflow-hidden rounded-[16px] bg-[#F7F6F2] md:my-3 md:mr-3 md:mb-3 md:ml-2 md:h-[calc(100svh-1.5rem)] md:max-h-[calc(100svh-1.5rem)] md:rounded-[24px]">
        <header className="border-border/60 flex h-12 shrink-0 items-center gap-2 border-b px-4 md:hidden">
          <SidebarTrigger />
          <span className="text-sm font-medium">Admin GUIDED</span>
        </header>
        <div className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
