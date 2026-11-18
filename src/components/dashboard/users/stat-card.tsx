import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string;
  description: string;
  className?: string;
};

function StatCard({ label, value, description, className }: StatCardProps) {
  return (
    <Card
      size="sm"
      className={cn(
        "ring-border/60 gap-2 rounded-2xl bg-white py-4 shadow-none",
        className
      )}
    >
      <CardHeader className="gap-2 px-4">
        <p className="text-muted-foreground text-[12px] font-medium">{label}</p>
        <p className="text-foreground text-[22px] leading-none font-semibold tracking-tight">
          {value}
        </p>
      </CardHeader>
      <CardContent className="px-4">
        <p className="text-muted-foreground text-[12px]">{description}</p>
      </CardContent>
    </Card>
  );
}

export { StatCard };
export type { StatCardProps };
