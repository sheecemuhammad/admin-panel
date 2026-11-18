import { Badge } from "@/components/ui/badge";
import type { OverviewModule } from "@/lib/overview-data";
import { cn } from "@/lib/utils";

const moduleStyles: Record<OverviewModule, { badge: string; dot: string }> = {
  "Journey & Goals": {
    badge: "bg-sky-100 text-sky-800",
    dot: "bg-sky-800",
  },
  "AI & Guidance": {
    badge: "bg-sky-100 text-sky-800",
    dot: "bg-sky-800",
  },
  Settings: {
    badge: "bg-sky-100 text-sky-800",
    dot: "bg-sky-800",
  },
  "Scripture & Bible": {
    badge: "bg-sky-100 text-sky-800",
    dot: "bg-sky-800",
  },
  Journaling: {
    badge: "bg-sky-100 text-sky-800",
    dot: "bg-sky-800",
  },
  Users: {
    badge: "bg-sky-100 text-sky-800",
    dot: "bg-sky-800",
  },
  "Church Management": {
    badge: "bg-sky-100 text-sky-800",
    dot: "bg-sky-800",
  },
};

type ModuleBadgeProps = {
  module: OverviewModule;
  className?: string;
};

function ModuleBadge({ module, className }: ModuleBadgeProps) {
  const styles = moduleStyles[module];

  return (
    <Badge
      variant="secondary"
      className={cn(
        "h-auto gap-1.5 rounded-full border-0 px-2.5 py-1 text-[12px] font-medium",
        styles.badge,
        className
      )}
    >
      <span className={cn("size-1.5 shrink-0 rounded-full", styles.dot)} />
      {module}
    </Badge>
  );
}

export { ModuleBadge };
export type { ModuleBadgeProps };
