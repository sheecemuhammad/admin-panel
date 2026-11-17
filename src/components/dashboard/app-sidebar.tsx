"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, LogOut } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { dashboardNavItems } from "@/lib/dashboard-nav";

function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-none">
      <SidebarHeader className="gap-3 px-3 py-4">
        <div className="flex items-center justify-between gap-2 group-data-[collapsible=icon]:justify-center">
          <Link
            href="/overview"
            className="flex min-w-0 items-center gap-2.5 group-data-[collapsible=icon]:gap-0"
          >
            <Image
              src="/brand/dashboard-logo.svg"
              alt=""
              width={32}
              height={32}
              className="size-8 shrink-0 object-contain"
            />
            <Image
              src="/brand/dashboard-logo-2.svg"
              alt="Admin GUIDED"
              width={136}
              height={40}
              className="h-8 w-auto shrink-0 object-contain object-left group-data-[collapsible=icon]:hidden"
            />
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground group-data-[collapsible=icon]:hidden"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {dashboardNavItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      render={<Link href={item.href} />}
                      className="hover:bg-sidebar-accent data-active:bg-sidebar-accent! h-10 w-full max-w-[240px] gap-2.5 rounded-[10px] px-3 font-sans text-[14px] leading-[18.76px] font-medium text-[#B4B9C1] hover:text-white data-active:leading-[18.24px] data-active:font-medium data-active:text-white!"
                    >
                      <Icon className="size-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-2 px-3 pb-4">
        <div className="bg-sidebar-accent flex items-center gap-3 rounded-[10px] p-2.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0">
          <Avatar size="default" className="size-9 after:border-transparent">
            <AvatarFallback className="bg-[#E8DFD0] text-[12px] font-semibold text-[#3D3429]">
              GM
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-[14px] leading-tight font-medium text-white">
              Grace Mensah
            </p>
            <p className="truncate text-[12px] leading-tight text-[#B4B9C1]">
              grace@guided.app
            </p>
          </div>
        </div>
        <SidebarMenu className="group-data-[collapsible=icon]:items-center">
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign out"
              render={<Link href="/login" />}
              className="hover:bg-sidebar-accent h-10 rounded-[10px] px-3 text-[14px] leading-[18.76px] font-medium text-[#B4B9C1] hover:text-white"
            >
              <LogOut className="size-4" />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export { AppSidebar };
