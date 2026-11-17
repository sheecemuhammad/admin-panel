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
      <SidebarInset className="my-3 mr-3 mb-3 ml-0 h-[calc(100svh-1.5rem)] max-h-[calc(100svh-1.5rem)] min-h-0 flex-1 overflow-hidden rounded-[24px] bg-[#F7F6F2] md:ml-2">
        <header className="border-border/60 flex h-12 shrink-0 items-center gap-2 border-b px-4 md:hidden">
          <SidebarTrigger />
          <span className="text-sm font-medium">Admin GUIDED</span>
        </header>
        <div className="flex min-h-0 flex-1 flex-col overflow-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
