"use client";

import { MoreHorizontal } from "lucide-react";

import { UserStatusBadge } from "@/components/dashboard/users/user-status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  userAvatarToneClasses,
  userOnboardingLabels,
  type UserRecord,
} from "@/lib/users-data";
import { cn } from "@/lib/utils";

type UsersTableProps = {
  users: UserRecord[];
  onViewProfile?: (user: UserRecord) => void;
  className?: string;
};

const actionItemClassName =
  "rounded-lg px-3 py-2 text-[13px] font-medium text-[#344054] focus:bg-[#F2F3F5] focus:text-[#101828] data-highlighted:bg-[#F2F3F5] data-highlighted:text-[#101828]";

function UsersTable({ users, onViewProfile, className }: UsersTableProps) {
  return (
    <Card
      className={cn(
        "ring-border/60 gap-0 overflow-hidden rounded-2xl bg-white py-0 shadow-none",
        className
      )}
    >
      <CardContent className="p-0">
        <Table className="min-w-[960px] table-fixed">
          <colgroup>
            <col className="w-[26%]" />
            <col className="w-[15%]" />
            <col className="w-[15%]" />
            <col className="w-[15%]" />
            <col className="w-[18%]" />
            <col className="w-[11%]" />
          </colgroup>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-muted-foreground px-5 text-[12px] font-medium">
                User
              </TableHead>
              <TableHead className="text-muted-foreground px-5 text-[12px] font-medium">
                Registered
              </TableHead>
              <TableHead className="text-muted-foreground px-5 text-[12px] font-medium">
                Onboarding
              </TableHead>
              <TableHead className="text-muted-foreground px-5 text-[12px] font-medium">
                Last active
              </TableHead>
              <TableHead className="text-muted-foreground px-5 text-[12px] font-medium">
                Status
              </TableHead>
              <TableHead className="text-muted-foreground px-5 text-right text-[12px] font-medium">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/40">
                <TableCell className="px-5 py-3.5">
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
                </TableCell>
                <TableCell className="text-muted-foreground px-5 py-3.5 text-[13px] whitespace-nowrap">
                  {user.registeredAt}
                </TableCell>
                <TableCell className="text-muted-foreground px-5 py-3.5 text-[13px] whitespace-nowrap">
                  {userOnboardingLabels[user.onboarding]}
                </TableCell>
                <TableCell className="text-muted-foreground px-5 py-3.5 text-[13px] whitespace-nowrap">
                  {user.lastActive}
                </TableCell>
                <TableCell className="px-5 py-3.5 whitespace-nowrap">
                  <UserStatusBadge status={user.status} />
                </TableCell>
                <TableCell className="px-5 py-3.5 text-right whitespace-nowrap">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export { UsersTable };
export type { UsersTableProps };
