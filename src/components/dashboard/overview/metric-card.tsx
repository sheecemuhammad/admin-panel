"use client";

import { Bar, BarChart } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import type { MetricAccent } from "@/lib/overview-data";
import { cn } from "@/lib/utils";

const accentStyles: Record<MetricAccent, { bar: string; delta: string }> = {
  blue: { bar: "#3B82F6", delta: "text-blue-600" },
  green: { bar: "#22A06B", delta: "text-emerald-600" },
  amber: { bar: "#C4872A", delta: "text-amber-700" },
  purple: { bar: "#7C6AF2", delta: "text-violet-600" },
};

type MetricCardProps = {
  label: string;
  value: string;
  delta: string;
  accent?: MetricAccent;
  sparkline: number[];
  className?: string;
};

function MetricCard({
  label,
  value,
  delta,
  accent = "blue",
  sparkline,
  className,
}: MetricCardProps) {
  const styles = accentStyles[accent];
  const chartData = sparkline.map((v, i) => ({ i, v }));
  const chartConfig = {
    v: { label, color: styles.bar },
  } satisfies ChartConfig;

  return (
    <Card
      size="sm"
      className={cn(
        "ring-border/60 gap-3 rounded-2xl bg-white py-4 shadow-none",
        className
      )}
    >
      <CardHeader className="gap-1 px-4">
        <p className="text-muted-foreground text-[13px] font-medium">{label}</p>
        <p className="text-foreground text-[28px] leading-none font-semibold tracking-tight">
          {value}
        </p>
      </CardHeader>
      <CardContent className="space-y-2 px-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-10 w-full"
          initialDimension={{ width: 160, height: 40 }}
        >
          <BarChart
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <Bar dataKey="v" fill="var(--color-v)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ChartContainer>
        <p className={cn("text-[12px] font-medium", styles.delta)}>{delta}</p>
      </CardContent>
    </Card>
  );
}

export { MetricCard };
export type { MetricCardProps };
