import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SystemStatusItem } from "@/lib/overview-data";
import { cn } from "@/lib/utils";

type SystemStatusCardProps = {
  items: SystemStatusItem[];
  summary: string;
  className?: string;
};

const statusStyles = {
  operational: "bg-emerald-50 text-emerald-700",
  degraded: "bg-orange-50 text-orange-700",
} as const;

const statusLabels = {
  operational: "Operational",
  degraded: "Degraded",
} as const;

function SystemStatusCard({
  items,
  summary,
  className,
}: SystemStatusCardProps) {
  return (
    <Card
      className={cn(
        "ring-border/60 rounded-2xl bg-white shadow-none",
        className
      )}
    >
      <CardHeader className="border-0">
        <CardTitle className="font-sans text-[16px] font-semibold">
          System status
        </CardTitle>
        <CardAction>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground text-[13px] font-medium transition-colors"
          >
            Refresh
          </button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3"
            >
              <span className="text-foreground text-[13px] font-medium">
                {item.label}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium",
                  statusStyles[item.status]
                )}
              >
                <span className="size-1.5 rounded-full bg-current" />
                {statusLabels[item.status]}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground text-[12px] leading-relaxed">
          {summary}
        </p>
      </CardContent>
    </Card>
  );
}

export { SystemStatusCard };
export type { SystemStatusCardProps };
