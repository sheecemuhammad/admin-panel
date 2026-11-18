"use client";

import { useState } from "react";
import {
  addMonths,
  differenceInCalendarDays,
  endOfDay,
  format,
  startOfDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMdUp } from "@/hooks/use-mobile";
import {
  DATE_PRESETS,
  detectPreset,
  formatRangeLabel,
  formatShortDate,
  getPresetRange,
  getPreviousPeriod,
  type AppliedDateRange,
  type DatePreset,
} from "@/lib/date-range";
import { cn } from "@/lib/utils";

type DateRangePickerProps = {
  value?: AppliedDateRange;
  onApply?: (value: AppliedDateRange) => void;
  className?: string;
  triggerClassName?: string;
  /** Optional CSS selector used to right-align the popover (defaults to header actions). */
  anchorSelector?: string;
};

type DateRangeFilterChipProps = {
  value: AppliedDateRange;
  onClear: () => void;
  className?: string;
};

type DraftState = {
  range: DateRange | undefined;
  preset: DatePreset;
  compare: boolean;
  month: Date | undefined;
};

function draftFromValue(value: AppliedDateRange): DraftState {
  return {
    range: { from: value.from, to: value.to },
    preset: value.preset,
    compare: value.compare,
    month: startOfMonth(value.from),
  };
}

function draftFromPreset(
  preset: DatePreset = "last30",
  today = new Date()
): DraftState {
  const range = getPresetRange(preset, today);
  return {
    range,
    preset,
    compare: true,
    month: range.from ? startOfMonth(range.from) : startOfMonth(today),
  };
}

function DateRangeFilterChip({
  value,
  onClear,
  className,
}: DateRangeFilterChipProps) {
  return (
    <div
      className={cn(
        "inline-flex h-9 max-w-[min(100%,220px)] items-center gap-1.5 rounded-full bg-[#E8F0FE] px-2.5 text-[#1D4ED8] sm:max-w-full",
        className
      )}
    >
      <CalendarDays className="size-3.5 shrink-0" />
      <span className="truncate font-sans text-[12px] font-medium sm:text-[13px]">
        {formatRangeLabel(value.from, value.to)}
      </span>
      <button
        type="button"
        aria-label="Clear date filter"
        onClick={onClear}
        className="inline-flex size-5 shrink-0 items-center justify-center rounded-full text-[#1D4ED8] transition-colors hover:bg-[#D6E4FD]"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}

function DateRangePicker({
  value,
  onApply,
  className,
  triggerClassName,
  anchorSelector = "[data-dashboard-header-actions]",
}: DateRangePickerProps) {
  const isMdUp = useIsMdUp();
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<DatePreset>(value?.preset ?? "last30");
  const [range, setRange] = useState<DateRange | undefined>(() =>
    value ? { from: value.from, to: value.to } : undefined
  );
  const [compare, setCompare] = useState(value?.compare ?? true);
  const [month, setMonth] = useState<Date | undefined>(() =>
    value?.from ? startOfMonth(value.from) : undefined
  );
  const [draft, setDraft] = useState<DraftState>(() =>
    value
      ? draftFromValue(value)
      : {
          range: undefined,
          preset: "last30",
          compare: true,
          month: undefined,
        }
  );

  const selectedDays =
    range?.from && range?.to
      ? differenceInCalendarDays(range.to, range.from) + 1
      : 0;

  const previousPeriod =
    range?.from && range?.to ? getPreviousPeriod(range.from, range.to) : null;

  function resetDraftFromApplied() {
    const next = value ? draftFromValue(value) : draftFromPreset("last30");
    setRange(next.range);
    setPreset(next.preset);
    setCompare(next.compare);
    setMonth(next.month);
    setDraft(next);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      resetDraftFromApplied();
    }
    setOpen(nextOpen);
  }

  function applyPreset(nextPreset: DatePreset) {
    if (nextPreset === "custom") {
      setPreset("custom");
      return;
    }

    const next = draftFromPreset(nextPreset);
    setPreset(next.preset);
    setRange(next.range);
    setMonth(next.month);
  }

  function handleSelect(nextRange: DateRange | undefined) {
    setRange(nextRange);
    setPreset(detectPreset(nextRange));
  }

  function handleCancel() {
    setRange(draft.range);
    setPreset(draft.preset);
    setCompare(draft.compare);
    setMonth(draft.month);
    setOpen(false);
  }

  function handleApply() {
    if (!range?.from || !range?.to) return;

    const applied: AppliedDateRange = {
      from: startOfDay(range.from),
      to: endOfDay(range.to),
      compare,
      preset,
    };

    setDraft(draftFromValue(applied));
    onApply?.(applied);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label="Open calendar"
            className={cn(
              "border-border/50 text-foreground size-9 rounded-[12px] bg-white shadow-[0px_1px_6px_0px_#1018281F]",
              "transition-colors hover:border-[#D0D5DD] hover:bg-[#F2F3F5] hover:text-[#101828]",
              "aria-expanded:border-[#D0D5DD] aria-expanded:bg-[#F2F3F5]",
              triggerClassName
            )}
          />
        }
      >
        <CalendarDays className="size-4" />
      </PopoverTrigger>

      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={8}
        positionMethod="fixed"
        collisionPadding={16}
        collisionAvoidance={{
          side: "flip",
          align: "shift",
          fallbackAxisSide: "none",
        }}
        anchor={() => document.querySelector(anchorSelector)}
        className={cn(
          "max-h-[calc(100svh-2rem)] w-auto max-w-[calc(100vw-2rem)] gap-0 overflow-y-auto rounded-2xl p-0 shadow-[0px_12px_40px_0px_rgba(16,24,40,0.14)] ring-1 ring-[#E4E7EB]",
          className
        )}
      >
        <div className="flex flex-col md:flex-row">
          <aside className="border-border/70 w-full shrink-0 border-b p-3 md:w-[168px] md:border-r md:border-b-0">
            <ul className="no-scrollbar flex flex-row gap-1 overflow-x-auto md:flex-col md:gap-0.5 md:overflow-visible">
              {DATE_PRESETS.map((item) => (
                <li key={item.id} className="shrink-0 md:w-full">
                  <button
                    type="button"
                    onClick={() => applyPreset(item.id)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-left font-sans text-[12px] font-medium whitespace-nowrap transition-colors md:w-full md:rounded-lg md:px-3 md:py-2 md:text-[13px] md:whitespace-normal",
                      preset === item.id
                        ? "bg-[#F2F3F5] text-[#101828]"
                        : "text-[#667085] hover:bg-[#F7F6F2] hover:text-[#101828]"
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center justify-between gap-3 border-b border-[#E4E7EB] px-4 py-3">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <div className="border-border/70 text-foreground min-w-0 flex-1 truncate rounded-lg border bg-white px-3 py-2 text-[13px] font-medium">
                  {range?.from ? formatShortDate(range.from) : "Start date"}
                </div>
                <span className="text-muted-foreground text-[13px]">–</span>
                <div className="border-border/70 text-foreground min-w-0 flex-1 truncate rounded-lg border bg-white px-3 py-2 text-[13px] font-medium">
                  {range?.to ? formatShortDate(range.to) : "End date"}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Previous month"
                  className="size-8"
                  onClick={() =>
                    setMonth((current) => subMonths(current ?? new Date(), 1))
                  }
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Next month"
                  className="size-8"
                  onClick={() =>
                    setMonth((current) => addMonths(current ?? new Date(), 1))
                  }
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>

            <div className="px-3 pt-2 pb-1">
              <Calendar
                mode="range"
                numberOfMonths={isMdUp ? 2 : 1}
                month={month}
                onMonthChange={setMonth}
                selected={range}
                onSelect={handleSelect}
                showOutsideDays
                className={cn(
                  "bg-transparent p-0 [--cell-size:2rem] sm:[--cell-size:2.25rem]",
                  "[&_[data-range-middle=true]]:bg-[#E8F0FE] [&_[data-range-middle=true]]:text-[#101828]",
                  "[&_[data-range-start=true]]:bg-[#101828] [&_[data-range-start=true]]:text-white",
                  "[&_[data-range-end=true]]:bg-[#101828] [&_[data-range-end=true]]:text-white",
                  "[&_[data-selected-single=true]]:bg-[#101828] [&_[data-selected-single=true]]:text-white"
                )}
                classNames={{
                  months: "relative flex flex-col gap-4 md:flex-row md:gap-6",
                  month_caption: "flex h-8 w-full items-center justify-center",
                  caption_label: "text-[13px] font-semibold text-[#101828]",
                  nav: "hidden",
                  weekdays: "flex w-full",
                  weekday:
                    "flex-1 text-[11px] font-medium text-[#8B8F97] select-none",
                  range_start: "bg-[#E8F0FE] rounded-l-full",
                  range_middle: "bg-[#E8F0FE] rounded-none",
                  range_end: "bg-[#E8F0FE] rounded-r-full",
                }}
              />
            </div>

            <div className="border-t border-[#E4E7EB] px-4 py-3">
              <label className="flex cursor-pointer items-start gap-2.5 sm:items-center">
                <Checkbox
                  checked={compare}
                  onCheckedChange={(checked) => setCompare(checked === true)}
                  className="mt-0.5 data-checked:border-[#2563EB] data-checked:bg-[#2563EB] sm:mt-0"
                />
                <span className="font-sans text-[13px] leading-snug text-[#344054]">
                  Compare with previous period
                  {previousPeriod
                    ? ` (${format(previousPeriod.from, "MMM d")} – ${format(previousPeriod.to, "MMM d")})`
                    : null}
                </span>
              </label>
            </div>

            <div className="flex flex-col gap-3 border-t border-[#E4E7EB] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-muted-foreground text-[13px]">
                {selectedDays > 0
                  ? `${selectedDays} day${selectedDays === 1 ? "" : "s"} selected`
                  : "Select a date range"}
              </p>
              <div className="flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-lg px-3"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  className="h-8 rounded-lg px-3"
                  disabled={!range?.from || !range?.to}
                  onClick={handleApply}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { DateRangePicker, DateRangeFilterChip, formatRangeLabel };
export type {
  AppliedDateRange,
  DateRangePickerProps,
  DateRangeFilterChipProps,
  DatePreset,
};
