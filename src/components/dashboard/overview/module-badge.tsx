import { Badge } from "@/components/ui/badge";
import type { OverviewModule } from "@/lib/overview-data";
import { cn } from "@/lib/utils";

const moduleStyles: Record<OverviewModule, string> = {
  "Journey & Goals": "bg-sky-100 text-sky-800",
  "AI & Guidance": "bg-indigo-100 text-indigo-800",
  Settings: "bg-zinc-100 text-zinc-700",
  "Scripture & Bible": "bg-amber-100 text-amber-900",
  Journaling: "bg-rose-100 text-rose-800",
  Users: "bg-emerald-100 text-emerald-800",
  "Church Management": "bg-violet-100 text-violet-800",
};

type ModuleBadgeProps = {
  module: OverviewModule;
  className?: string;
};

function ModuleBadge({ module, className }: ModuleBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "h-auto rounded-full border-0 px-2.5 py-1 text-[12px] font-medium",
        moduleStyles[module],
        className
      )}
    >
      {module}
    </Badge>
  );
}

export { ModuleBadge };
export type { ModuleBadgeProps };
