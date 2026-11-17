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
        "flex flex-col gap-3 rounded-2xl bg-white px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-3",
        className
      )}
    >
      <div className="min-w-0">
        <h1 className="text-foreground font-sans text-[16px] leading-[23.26px] font-semibold tracking-[-0.18px]">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-muted-foreground font-sans text-[13px] leading-[17.41px] font-normal tracking-normal">
            {subtitle}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          {actions}
        </div>
      ) : null}
    </div>
  );
}

export { DashboardPageHeader };
export type { DashboardPageHeaderProps };
