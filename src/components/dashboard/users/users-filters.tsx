"use client";

import type { ReactNode } from "react";
import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const STATUS_ITEMS = {
  all: "All statuses",
  active: "Active",
  inactive: "Inactive",
  "deletion-requested": "Deletion requested",
} as const;

const ONBOARDING_ITEMS = {
  all: "All stages",
  completed: "Completed",
  "in-progress": "In progress",
  "not-started": "Not started",
} as const;

const REGISTERED_ITEMS = {
  any: "Any time",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
} as const;

type UsersFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string | null) => void;
  onboarding: string;
  onOnboardingChange: (value: string | null) => void;
  registered: string;
  onRegisteredChange: (value: string | null) => void;
  className?: string;
};

const labelClassName =
  "font-sans text-[12px] leading-4 font-medium text-[#344054]";

const controlClassName =
  "h-10! w-full min-w-0 rounded-[8px]! border border-[#E4E7EB] bg-white shadow-none";

const selectTriggerClassName = cn(
  controlClassName,
  "justify-between px-3 text-[13px]! font-medium text-[#344054] data-[size=default]:h-10!"
);

const selectContentClassName =
  "rounded-[12px] border border-[#E4E7EB] bg-white p-1.5 shadow-[0px_12px_32px_rgba(16,24,40,0.12)] ring-0";

const selectItemClassName =
  "rounded-lg py-2 pr-8 pl-3 text-[13px] font-medium text-[#344054] focus:bg-[#F2F3F5] focus:text-[#101828] data-highlighted:bg-[#F2F3F5] data-highlighted:text-[#101828] data-[selected]:bg-[#F2F3F5]";

function FilterField({
  label,
  htmlFor,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <Label htmlFor={htmlFor} className={labelClassName}>
        {label}
      </Label>
      {children}
    </div>
  );
}

function FilterSelect({
  value,
  onValueChange,
  items,
  label,
}: {
  value: string;
  onValueChange: (value: string | null) => void;
  items: Record<string, string>;
  label: string;
}) {
  return (
    <Select value={value} onValueChange={onValueChange} items={items}>
      <SelectTrigger className={selectTriggerClassName}>
        <SelectValue>{label}</SelectValue>
      </SelectTrigger>
      <SelectContent
        align="start"
        side="bottom"
        sideOffset={6}
        alignItemWithTrigger={false}
        className={selectContentClassName}
      >
        {Object.entries(items).map(([itemValue, itemLabel]) => (
          <SelectItem
            key={itemValue}
            value={itemValue}
            className={selectItemClassName}
          >
            {itemLabel}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function UsersFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  onboarding,
  onOnboardingChange,
  registered,
  onRegisteredChange,
  className,
}: UsersFiltersProps) {
  const statusLabel =
    STATUS_ITEMS[status as keyof typeof STATUS_ITEMS] ?? "All statuses";
  const onboardingLabel =
    ONBOARDING_ITEMS[onboarding as keyof typeof ONBOARDING_ITEMS] ??
    "All stages";
  const registeredLabel =
    REGISTERED_ITEMS[registered as keyof typeof REGISTERED_ITEMS] ?? "Any time";

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-[minmax(0,1.55fr)_repeat(3,minmax(0,1fr))]",
        className
      )}
    >
      <FilterField
        label="Search"
        htmlFor="users-search"
        className="sm:col-span-2 xl:col-span-1"
      >
        <InputGroup className={controlClassName}>
          <InputGroupAddon align="inline-start" className="pl-3 text-[#98A2B3]">
            <Search className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            id="users-search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name or email"
            className="h-10! text-[13px]! font-medium text-[#344054] placeholder:text-[#98A2B3] md:text-[13px]!"
          />
        </InputGroup>
      </FilterField>

      <FilterField label="Status">
        <FilterSelect
          value={status}
          onValueChange={onStatusChange}
          items={STATUS_ITEMS}
          label={statusLabel}
        />
      </FilterField>

      <FilterField label="Onboarding">
        <FilterSelect
          value={onboarding}
          onValueChange={onOnboardingChange}
          items={ONBOARDING_ITEMS}
          label={onboardingLabel}
        />
      </FilterField>

      <FilterField label="Registered">
        <FilterSelect
          value={registered}
          onValueChange={onRegisteredChange}
          items={REGISTERED_ITEMS}
          label={registeredLabel}
        />
      </FilterField>
    </div>
  );
}

export { UsersFilters };
export type { UsersFiltersProps };
