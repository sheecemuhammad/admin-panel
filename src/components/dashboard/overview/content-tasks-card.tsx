import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContentTask } from "@/lib/overview-data";
import { cn } from "@/lib/utils";

type ContentTasksCardProps = {
  items: ContentTask[];
  className?: string;
};

function ContentTasksCard({ items, className }: ContentTasksCardProps) {
  return (
    <Card
      className={cn(
        "ring-border/60 rounded-2xl bg-white shadow-none",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-3 border-0 pb-0">
        <CardTitle className="font-sans text-[16px] font-semibold">
          Content & Tasks
        </CardTitle>
        <span className="bg-muted text-muted-foreground inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium">
          <span className="bg-foreground/50 mr-1.5 size-1.5 rounded-full" />
          {items.length} items
        </span>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 pt-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border-border/70 rounded-xl border bg-white p-3.5"
          >
            <p className="text-foreground text-[14px] font-semibold">
              {item.title}
            </p>
            <p className="text-muted-foreground mt-1 text-[12px]">
              {item.subtitle}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3 h-8 w-full bg-white"
            >
              {item.actionLabel}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export { ContentTasksCard };
export type { ContentTasksCardProps };
