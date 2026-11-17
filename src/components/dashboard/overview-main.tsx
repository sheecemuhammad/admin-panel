"use client";

import { useState } from "react";
import { CalendarDays, Plus } from "lucide-react";

import { ActiveUsersCard } from "@/components/dashboard/overview/active-users-card";
import { DashboardPageHeader } from "@/components/dashboard/overview/dashboard-page-header";
import { MetricCard } from "@/components/dashboard/overview/metric-card";
import { OverviewAside } from "@/components/dashboard/overview/overview-aside";
import { PeriodToggle } from "@/components/dashboard/overview/period-toggle";
import { RecentActivityCard } from "@/components/dashboard/overview/recent-activity-card";
import { Button } from "@/components/ui/button";
import {
  activeUsersSeries,
  overviewMetrics,
  recentActivity,
  type OverviewPeriod,
} from "@/lib/overview-data";

const periodLabels: Record<OverviewPeriod, string> = {
  "7d": "Last 7 days vs previous 7",
  "30d": "Last 30 days vs previous 30",
  "90d": "Last 90 days vs previous 90",
};

function OverviewMain() {
  const [period, setPeriod] = useState<OverviewPeriod>("30d");

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <DashboardPageHeader
        title="Overview"
        subtitle="Wednesday, November 4. Good afternoon, Grace"
        actions={
          <>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label="Open calendar"
              className="border-border/50 text-foreground size-9 rounded-[12px] bg-white shadow-[0px_1px_6px_0px_#1018281F] hover:bg-white"
            >
              <CalendarDays className="size-4" />
            </Button>
            <PeriodToggle value={period} onValueChange={setPeriod} />
            <Button
              type="button"
              size="sm"
              className="h-9 gap-1.5 rounded-full px-3.5"
            >
              <Plus className="size-4" />
              Add prompt
            </Button>
          </>
        }
      />

      <div className="flex flex-col gap-4 xl:flex-row xl:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <section className="space-y-3">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="text-foreground text-[16px] font-semibold tracking-tight">
                Summary
              </h2>
              <p className="text-muted-foreground text-[13px]">
                {periodLabels[period]}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {overviewMetrics.map((metric) => (
                <MetricCard
                  key={metric.id}
                  label={metric.label}
                  value={metric.value}
                  delta={metric.delta}
                  accent={metric.accent}
                  sparkline={metric.sparkline}
                />
              ))}
            </div>
          </section>

          <ActiveUsersCard data={activeUsersSeries} />
          <RecentActivityCard items={recentActivity} />
        </div>

        <OverviewAside />
      </div>
    </div>
  );
}

export { OverviewMain };
