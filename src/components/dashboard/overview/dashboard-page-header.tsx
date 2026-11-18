import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type DashboardPageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
};

function DashboardPageHeader({
  title,
  subtitle,
  actions,
  className,
}: DashboardPageHeaderProps) {
  return (
    <div
      className={cn(
        "flex w-full shrink-0 flex-col gap-3 border-b border-[#E4E7EB] bg-[#FFFFFF] px-5 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-6 md:px-8 md:py-5",
        className
      )}
    >
      <div className="min-w-0 flex-1">
        <h1 className="font-sans text-[16px] leading-[23.26px] font-semibold tracking-[-0.18px] text-[#101828]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-0.5 font-sans text-[13px] leading-[18px] font-normal text-[#667085]">
            {subtitle}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div
          data-dashboard-header-actions
          className="flex shrink-0 flex-wrap items-center gap-2"
        >
          {actions}
        </div>
      ) : null}
    </div>
  );
}

export { DashboardPageHeader };
export type { DashboardPageHeaderProps };
