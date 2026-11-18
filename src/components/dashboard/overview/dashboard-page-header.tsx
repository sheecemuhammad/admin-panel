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
        "flex h-[68px] w-full shrink-0 items-center justify-between gap-4 border-b border-[#E4E7EB] bg-[#FFFFFF] px-5 md:px-8",
        className
      )}
    >
      <div className="min-w-0 shrink">
        <h1 className="font-sans text-[16px] leading-[23.26px] font-semibold tracking-[-0.18px] text-[#101828]">
          {title}
        </h1>
        {subtitle ? (
          <p className="truncate font-sans text-[13px] leading-[17.41px] font-normal tracking-[0px] text-[#667085]">
            {subtitle}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}

export { DashboardPageHeader };
export type { DashboardPageHeaderProps };
