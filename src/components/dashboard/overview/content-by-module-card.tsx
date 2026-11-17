import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ModuleContentStat } from "@/lib/overview-data";
import { cn } from "@/lib/utils";

type ContentByModuleCardProps = {
  items: ModuleContentStat[];
  published: number;
  drafts: number;
  className?: string;
};

function ContentByModuleCard({
  items,
  published,
  drafts,
  className,
}: ContentByModuleCardProps) {
  const maxCount = Math.max(...items.map((item) => item.count), 1);

  return (
    <Card
      className={cn(
        "ring-border/60 rounded-2xl bg-white shadow-none",
        className
      )}
    >
      <CardHeader className="border-0">
        <CardTitle className="font-sans text-[16px] font-semibold">
          Content by module
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-3.5">
          {items.map((item) => {
            const width = `${Math.round((item.count / maxCount) * 100)}%`;

            return (
              <li key={item.id} className="space-y-1.5">
                <div className="flex items-center justify-between gap-3 text-[13px]">
                  <span className="text-foreground font-medium">
                    {item.label}
                  </span>
                  <span className="text-muted-foreground tabular-nums">
                    {item.count.toLocaleString("en-US")}
                  </span>
                </div>
                <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                  <div
                    className="bg-foreground h-full rounded-full"
                    style={{ width }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <p className="text-muted-foreground text-[12px] leading-relaxed">
          {published.toLocaleString("en-US")} published and{" "}
          {drafts.toLocaleString("en-US")} drafts across all modules
        </p>
      </CardContent>
    </Card>
  );
}

export { ContentByModuleCard };
export type { ContentByModuleCardProps };
