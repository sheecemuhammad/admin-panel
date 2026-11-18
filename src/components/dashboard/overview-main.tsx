"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { AddPromptDialog } from "@/components/dashboard/overview/add-prompt-dialog";
import { ActiveUsersCard } from "@/components/dashboard/overview/active-users-card";
import { DashboardPageHeader } from "@/components/dashboard/overview/dashboard-page-header";
import {
  DateRangeFilterChip,
  DateRangePicker,
} from "@/components/dashboard/overview/date-range-picker";
import { MetricCard } from "@/components/dashboard/overview/metric-card";
import { OverviewAside } from "@/components/dashboard/overview/overview-aside";
import { PeriodToggle } from "@/components/dashboard/overview/period-toggle";
import { RecentActivityCard } from "@/components/dashboard/overview/recent-activity-card";
import { Button } from "@/components/ui/button";
import type { AppliedDateRange } from "@/lib/date-range";
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
  const [dateRange, setDateRange] = useState<AppliedDateRange | undefined>();

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <DashboardPageHeader
        title="Overview"
        subtitle="Wednesday, November 4. Good afternoon, Grace"
        actions={
          <>
            {dateRange ? (
              <DateRangeFilterChip
                value={dateRange}
                onClear={() => setDateRange(undefined)}
              />
            ) : null}
            <DateRangePicker value={dateRange} onApply={setDateRange} />
            <PeriodToggle value={period} onValueChange={setPeriod} />
            <AddPromptDialog
              trigger={
                <Button
                  type="button"
                  size="sm"
                  aria-label="Add prompt"
                  className="h-9 gap-1.5 rounded-full px-2.5 sm:px-3.5"
                >
                  <Plus className="size-4" />
                  <span className="hidden sm:inline">Add prompt</span>
                </Button>
              }
            />
          </>
        }
      />

      <div className="flex flex-col gap-5 px-4 py-4 sm:px-5 sm:py-5 md:px-8 md:py-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <section className="space-y-3.5">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <h2 className="text-foreground font-sans text-[16px] font-semibold tracking-tight">
                  Summary
                </h2>
                <p className="text-muted-foreground text-[12px] sm:text-[13px]">
                  {periodLabels[period]}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
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
    </div>
  );
}

export { OverviewMain };
