import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Church,
  Flag,
  LayoutGrid,
  PenLine,
  Settings,
  Sparkles,
  UserPlus,
} from "lucide-react";

export type DashboardNavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export const dashboardNavItems: DashboardNavItem[] = [
  {
    title: "Overview",
    href: "/overview",
    icon: LayoutGrid,
  },
  {
    title: "Users",
    href: "/users",
    icon: UserPlus,
  },
  {
    title: "Scripture & Bible",
    href: "/scripture",
    icon: BookOpen,
  },
  {
    title: "AI & Guidance",
    href: "/ai-guidance",
    icon: Sparkles,
  },
  {
    title: "Journaling",
    href: "/journaling",
    icon: PenLine,
  },
  {
    title: "Journey & Goals",
    href: "/journey",
    icon: Flag,
  },
  {
    title: "Church Management",
    href: "/church",
    icon: Church,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
