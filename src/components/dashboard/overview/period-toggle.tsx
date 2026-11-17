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
        "h-9 rounded-full bg-[#EFEFED] p-1 shadow-none ring-0",
        className
      )}
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          className={cn(
            "h-7 rounded-full px-3.5 font-sans text-[13px] font-medium text-[#8B8F97] shadow-none",
            "hover:text-foreground hover:bg-transparent",
            "aria-pressed:text-foreground aria-pressed:bg-white aria-pressed:font-semibold",
            "aria-pressed:shadow-[0px_1px_3px_0px_rgba(16,24,40,0.12)]",
            "data-[state=on]:text-foreground data-[state=on]:bg-white data-[state=on]:font-semibold",
            "data-[state=on]:shadow-[0px_1px_3px_0px_rgba(16,24,40,0.12)]"
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
