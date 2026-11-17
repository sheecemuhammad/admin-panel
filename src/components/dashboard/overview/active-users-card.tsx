"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import type { ActiveUsersPoint } from "@/lib/overview-data";
import { cn } from "@/lib/utils";

const chartConfig = {
  dailyActive: {
    label: "Daily active",
    color: "#2563EB",
  },
  previousPeriod: {
    label: "Previous period",
    color: "#93C5FD",
  },
} satisfies ChartConfig;

type ActiveUsersCardProps = {
  data: ActiveUsersPoint[];
  className?: string;
};

function formatCount(value: number) {
  return value.toLocaleString("en-US");
}

function ActiveUsersTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ dataKey?: string | number; value?: number | string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  const daily = Number(
    payload.find((p) => p.dataKey === "dailyActive")?.value ?? 0
  );
  const previous = Number(
    payload.find((p) => p.dataKey === "previousPeriod")?.value ?? 0
  );
  const change = previous === 0 ? 0 : ((daily - previous) / previous) * 100;
  const point = payload[0] as { payload?: ActiveUsersPoint } | undefined;
  const dateLabel = point?.payload?.date
    ? new Date(`${point.payload.date}T12:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : label;

  return (
    <div className="min-w-[180px] rounded-xl bg-neutral-950 px-3.5 py-3 text-white shadow-lg">
      <p className="text-[13px] font-medium">{dateLabel}</p>
      <div className="mt-2 space-y-1.5 text-[12px]">
        <div className="flex items-center justify-between gap-4">
          <span className="text-white/70">Daily active</span>
          <span className="font-medium tabular-nums">{formatCount(daily)}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-white/70">Previous period</span>
          <span className="font-medium tabular-nums">
            {formatCount(previous)}
          </span>
        </div>
        <p
          className={cn(
            "pt-1 text-[12px] font-semibold",
            change >= 0 ? "text-emerald-400" : "text-rose-400"
          )}
        >
          {change >= 0 ? "+" : ""}
          {change.toFixed(1)}%
        </p>
      </div>
    </div>
  );
}

function ActiveUsersCard({ data, className }: ActiveUsersCardProps) {
  const tickIndexes = new Set([
    0,
    Math.floor(data.length / 2),
    data.length - 1,
  ]);

  return (
    <Card
      className={cn(
        "ring-border/60 rounded-2xl bg-white shadow-none",
        className
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-4 border-0">
        <div className="space-y-1">
          <CardTitle className="font-sans text-[16px] font-semibold">
            Active users
          </CardTitle>
          <CardDescription className="text-[13px]">
            Daily active vs previous period
          </CardDescription>
        </div>
        <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-[12px]">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[#2563EB]" />
            Daily active
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-[2px] bg-[#93C5FD]" />
            Previous period
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[260px] w-full"
          initialDimension={{ width: 640, height: 260 }}
        >
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            barCategoryGap="18%"
            barGap={2}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
              tickFormatter={(value, index) =>
                tickIndexes.has(index) ? String(value) : ""
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={40}
              tickFormatter={(value) =>
                Number(value) >= 1000
                  ? `${Math.round(Number(value) / 1000)}k`
                  : String(value)
              }
            />
            <ChartTooltip
              cursor={{ fill: "rgba(15, 23, 42, 0.04)" }}
              content={<ActiveUsersTooltip />}
            />
            <Bar
              dataKey="dailyActive"
              fill="var(--color-dailyActive)"
              radius={[3, 3, 0, 0]}
              maxBarSize={14}
            />
            <Bar
              dataKey="previousPeriod"
              fill="var(--color-previousPeriod)"
              radius={[3, 3, 0, 0]}
              maxBarSize={14}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export { ActiveUsersCard };
export type { ActiveUsersCardProps };
