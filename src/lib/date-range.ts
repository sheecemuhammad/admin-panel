import {
  differenceInCalendarDays,
  endOfDay,
  endOfMonth,
  format,
  isSameDay,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import type { DateRange } from "react-day-picker";

type DatePreset =
  | "today"
  | "yesterday"
  | "last7"
  | "last30"
  | "thisMonth"
  | "lastMonth"
  | "custom";

type AppliedDateRange = {
  from: Date;
  to: Date;
  compare: boolean;
  preset: DatePreset;
};

const DATE_PRESETS: { id: DatePreset; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "last7", label: "Last 7 days" },
  { id: "last30", label: "Last 30 days" },
  { id: "thisMonth", label: "This month" },
  { id: "lastMonth", label: "Last month" },
  { id: "custom", label: "Custom" },
];

function getPresetRange(preset: DatePreset, today = new Date()): DateRange {
  const end = endOfDay(today);
  switch (preset) {
    case "today":
      return { from: startOfDay(today), to: end };
    case "yesterday": {
      const day = subDays(today, 1);
      return { from: startOfDay(day), to: endOfDay(day) };
    }
    case "last7":
      return { from: startOfDay(subDays(today, 6)), to: end };
    case "last30":
      return { from: startOfDay(subDays(today, 29)), to: end };
    case "thisMonth":
      return { from: startOfMonth(today), to: end };
    case "lastMonth": {
      const previous = subMonths(today, 1);
      return { from: startOfMonth(previous), to: endOfMonth(previous) };
    }
    case "custom":
    default:
      return { from: startOfDay(subDays(today, 29)), to: end };
  }
}

function detectPreset(
  range: DateRange | undefined,
  today = new Date()
): DatePreset {
  if (!range?.from || !range.to) return "custom";

  for (const preset of DATE_PRESETS) {
    if (preset.id === "custom") continue;
    const candidate = getPresetRange(preset.id, today);
    if (
      candidate.from &&
      candidate.to &&
      isSameDay(range.from, candidate.from) &&
      isSameDay(range.to, candidate.to)
    ) {
      return preset.id;
    }
  }

  return "custom";
}

function getPreviousPeriod(from: Date, to: Date) {
  const days = differenceInCalendarDays(to, from) + 1;
  const previousTo = endOfDay(subDays(from, 1));
  const previousFrom = startOfDay(subDays(previousTo, days - 1));
  return { from: previousFrom, to: previousTo };
}

function formatShortDate(date: Date) {
  return format(date, "MMM d, yyyy");
}

function formatRangeLabel(from: Date, to: Date) {
  const sameYear = from.getFullYear() === to.getFullYear();
  if (sameYear) {
    return `${format(from, "MMM d")} – ${format(to, "MMM d, yyyy")}`;
  }
  return `${format(from, "MMM d, yyyy")} – ${format(to, "MMM d, yyyy")}`;
}

export {
  DATE_PRESETS,
  detectPreset,
  formatRangeLabel,
  formatShortDate,
  getPresetRange,
  getPreviousPeriod,
};
export type { AppliedDateRange, DatePreset };
