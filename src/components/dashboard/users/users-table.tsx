"use client";

import { MoreHorizontal } from "lucide-react";

import { UserStatusBadge } from "@/components/dashboard/users/user-status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  userAvatarToneClasses,
  userOnboardingLabels,
  type UserRecord,
} from "@/lib/users-data";
import { cn } from "@/lib/utils";

type UsersTableProps = {
  rows: UserRecord[];
  onViewProfile?: (user: UserRecord) => void;
  className?: string;
};

const actionItemClassName =
  "rounded-lg px-3 py-2 text-[13px] font-medium text-[#344054] focus:bg-[#F2F3F5] focus:text-[#101828] data-highlighted:bg-[#F2F3F5] data-highlighted:text-[#101828]";

function getUsersTableColumns(
  onViewProfile?: (user: UserRecord) => void
): DataTableColumn<UserRecord>[] {
  return [
    {
      id: "user",
      header: "User",
      width: "26%",
      cell: (user) => (
        <div className="flex min-w-0 items-center gap-3">
          <Avatar size="default" className="size-9 shrink-0">
            <AvatarFallback
              className={cn(
                "text-[12px] font-semibold",
                userAvatarToneClasses[user.avatarTone]
              )}
            >
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-foreground truncate text-[13px] font-semibold">
              {user.name}
            </p>
            <p className="text-muted-foreground truncate text-[12px]">
              {user.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "registered",
      header: "Registered",
      width: "15%",
      cellClassName: "text-muted-foreground text-[13px] whitespace-nowrap",
      cell: (user) => user.registeredAt,
    },
    {
      id: "onboarding",
      header: "Onboarding",
      width: "15%",
      cellClassName: "text-muted-foreground text-[13px] whitespace-nowrap",
      cell: (user) => userOnboardingLabels[user.onboarding],
    },
    {
      id: "last-active",
      header: "Last active",
      width: "15%",
      cellClassName: "text-muted-foreground text-[13px] whitespace-nowrap",
      cell: (user) => user.lastActive,
    },
    {
      id: "status",
      header: "Status",
      width: "18%",
      cellClassName: "whitespace-nowrap",
      cell: (user) => <UserStatusBadge status={user.status} />,
    },
    {
      id: "actions",
      header: "Actions",
      width: "11%",
      align: "right",
      cellClassName: "whitespace-nowrap",
      cell: (user) => (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Actions for ${user.name}`}
                className="size-8 text-[#667085] data-popup-open:bg-[#F2F3F5]"
              />
            }
          >
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            side="bottom"
            sideOffset={6}
            className="w-44 min-w-44 rounded-[12px] border border-[#E4E7EB] bg-white p-1.5 shadow-[0px_12px_32px_rgba(16,24,40,0.12)] ring-0"
          >
            <DropdownMenuItem
              className={actionItemClassName}
              onClick={() => onViewProfile?.(user)}
            >
              View profile
            </DropdownMenuItem>
            <DropdownMenuItem className={actionItemClassName}>
              Edit user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}

function UsersTable({ rows, onViewProfile, className }: UsersTableProps) {
  return (
    <DataTable
      columns={getUsersTableColumns(onViewProfile)}
      rows={rows}
      getRowId={(user) => user.id}
      className={className}
      emptyMessage="No users match these filters."
    />
  );
}

export { UsersTable };
export type { UsersTableProps };
