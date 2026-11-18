"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { OverviewPeriod } from "@/lib/overview-data";
import { cn } from "@/lib/utils";

const DEFAULT_OPTIONS: { value: OverviewPeriod; label: string }[] = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
];

type PeriodToggleProps = {
  value: OverviewPeriod;
  onValueChange: (value: OverviewPeriod) => void;
  options?: { value: OverviewPeriod; label: string }[];
  className?: string;
};

function PeriodToggle({
  value,
  onValueChange,
  options = DEFAULT_OPTIONS,
  className,
}: PeriodToggleProps) {
  return (
    <ToggleGroup
      value={[value]}
      onValueChange={(next) => {
        const selected = next[0] as OverviewPeriod | undefined;
        if (selected) onValueChange(selected);
      }}
      variant="default"
      size="sm"
      spacing={0}
      className={cn(
        "h-[36px] w-[212px] gap-0 rounded-[12px]! bg-[#F2F3F5] p-[2.5px] shadow-none ring-0",
        className
      )}
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          className={cn(
            "h-[30px] min-w-0 flex-1 rounded-[12px]! px-0 font-sans text-[13px] leading-none font-medium text-[#8B8F97] shadow-none",
            "hover:bg-transparent hover:text-[#101828]",
            "group-data-[spacing=0]/toggle-group:rounded-[12px]!",
            "aria-pressed:bg-[#FFFFFF] aria-pressed:font-semibold aria-pressed:text-[#101828]",
            "aria-pressed:shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10)]",
            "data-[state=on]:bg-[#FFFFFF] data-[state=on]:font-semibold data-[state=on]:text-[#101828]",
            "data-[state=on]:shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10)]",
            "group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-[12px]!",
            "group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-[12px]!"
          )}
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export { PeriodToggle };
export type { PeriodToggleProps };
