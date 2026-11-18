import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ModuleBadge } from "@/components/dashboard/overview/module-badge";
import type { ActivityItem } from "@/lib/overview-data";
import { cn } from "@/lib/utils";

type RecentActivityCardProps = {
  items: ActivityItem[];
  className?: string;
};

function RecentActivityCard({ items, className }: RecentActivityCardProps) {
  return (
    <Card
      className={cn(
        "ring-border/60 rounded-2xl bg-white shadow-none",
        className
      )}
    >
      <CardHeader className="border-0">
        <CardTitle className="font-sans text-[16px] font-semibold">
          Recent admin activity
        </CardTitle>
        <CardDescription className="text-[13px]">
          Latest changes across Guided modules
        </CardDescription>
        <CardAction>
          <Button type="button" variant="outline" size="sm" className="h-8">
            View audit log
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0 pb-2">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-muted-foreground px-6 text-[12px]">
                Change
              </TableHead>
              <TableHead className="text-muted-foreground px-4 text-[12px]">
                Module
              </TableHead>
              <TableHead className="text-muted-foreground px-6 text-right text-[12px]">
                When
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/40">
                <TableCell className="text-muted-foreground max-w-[360px] px-6 py-3.5 text-[13px]">
                  {item.change.map((part, index) =>
                    part.emphasis ? (
                      <span
                        key={index}
                        className="text-foreground font-semibold"
                      >
                        {part.text}
                      </span>
                    ) : (
                      <span key={index}>{part.text}</span>
                    )
                  )}
                </TableCell>
                <TableCell className="px-4 py-3.5">
                  <ModuleBadge module={item.module} />
                </TableCell>
                <TableCell className="text-muted-foreground px-6 py-3.5 text-right text-[13px] whitespace-nowrap">
                  {item.when}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export { RecentActivityCard };
export type { RecentActivityCardProps };
