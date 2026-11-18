"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

import { DeactivateAccountDialog } from "@/components/dashboard/users/deactivate-account-dialog";
import { UserStatusBadge } from "@/components/dashboard/users/user-status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  userAvatarToneClasses,
  userOnboardingLabels,
  type UserRecord,
} from "@/lib/users-data";
import { cn } from "@/lib/utils";

type UserDetailsDialogProps = {
  user: UserRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function DetailRow({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="grid grid-cols-[148px_minmax(0,1fr)] items-baseline gap-x-6 py-1.5">
      <span className="font-sans text-[13px] leading-5 font-normal text-[#667085]">
        {label}
      </span>
      <span
        className={cn(
          "font-sans text-[13px] leading-5 font-semibold text-[#101828]",
          valueClassName
        )}
      >
        {value}
      </span>
    </div>
  );
}

function ActivityCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[12px] bg-[#F8F9FB] px-3.5 py-3">
      <p className="text-[12px] leading-4 font-medium text-[#667085]">
        {label}
      </p>
      <p className="mt-1.5 text-[20px] leading-6 font-semibold tracking-[-0.3px] text-[#101828]">
        {value}
      </p>
    </div>
  );
}

function UserDetailsDialog({
  user,
  open,
  onOpenChange,
}: UserDetailsDialogProps) {
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const isActiveToday = user?.lastActive === "Today";
  const canDeactivate =
    user?.status !== "inactive" && user?.status !== "deletion-requested";

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          showCloseButton
          className={cn(
            "fixed top-4 right-4 bottom-auto left-4 z-50 flex flex-col sm:left-auto",
            "w-auto max-w-[calc(100vw-2rem)] translate-x-0 translate-y-0 sm:w-[400px] sm:max-w-[400px]",
            "max-h-[calc(100svh-2rem)] gap-0 overflow-hidden rounded-[16px] border border-[#E4E7EB] bg-white p-0",
            "shadow-[0px_20px_48px_rgba(16,24,40,0.16)] ring-0"
          )}
        >
          {user ? (
            <>
              <DialogHeader className="shrink-0 gap-0 border-b border-[#E4E7EB] px-5 py-4 pr-12 text-left">
                <DialogTitle className="font-sans text-[16px] leading-6 font-semibold tracking-[-0.2px] text-[#101828]">
                  User details
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Account details and recent activity for {user.name}.
                </DialogDescription>
              </DialogHeader>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3.5">
                    <Avatar size="lg" className="size-12 shrink-0">
                      <AvatarFallback
                        className={cn(
                          "text-[14px] font-semibold",
                          userAvatarToneClasses[user.avatarTone]
                        )}
                      >
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[16px] leading-6 font-semibold tracking-[-0.2px] text-[#101828]">
                        {user.name}
                      </p>
                      <p className="mt-0.5 truncate text-[13px] leading-5 text-[#667085]">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <UserStatusBadge status={user.status} />
                    <Badge
                      variant="secondary"
                      className="h-auto rounded-full border-0 bg-[#F2F3F5] px-2.5 py-1 text-[12px] font-medium text-[#344054]"
                    >
                      {user.accountCode}
                    </Badge>
                  </div>
                </div>

                <section className="mt-5">
                  <h3 className="font-sans text-[14px] leading-5 font-semibold text-[#101828]">
                    Profile basics
                  </h3>
                  <div className="mt-3 flex flex-col gap-1">
                    <DetailRow
                      label="Account created"
                      value={user.registeredAt}
                    />
                    <DetailRow
                      label="Onboarding"
                      value={userOnboardingLabels[user.onboarding]}
                    />
                    <DetailRow
                      label="Last active"
                      value={user.lastActive}
                      valueClassName={
                        isActiveToday ? "font-medium text-[#1570EF]" : undefined
                      }
                    />
                    <DetailRow
                      label="Sign-in method"
                      value={user.signInMethod}
                    />
                    <DetailRow label="Country" value={user.country} />
                    <DetailRow
                      label="Church linked"
                      value={user.churchLinked ? "Yes" : "No"}
                    />
                  </div>
                </section>

                <section className="mt-5">
                  <h3 className="font-sans text-[13px] leading-5 font-semibold text-[#101828]">
                    Activity · last 30 days
                  </h3>
                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    <ActivityCard
                      label="Journal entries"
                      value={user.activity.journalEntries}
                    />
                    <ActivityCard
                      label="Prayers logged"
                      value={user.activity.prayersLogged}
                    />
                    <ActivityCard
                      label="Bible sessions"
                      value={user.activity.bibleSessions}
                    />
                    <ActivityCard
                      label="AI conversations"
                      value={user.activity.aiConversations}
                    />
                  </div>
                </section>

                <div className="mt-4 flex items-start gap-2.5 rounded-[12px] bg-[#EFF8FF] px-3.5 py-3">
                  <Lock className="mt-0.5 size-4 shrink-0 text-[#1570EF]" />
                  <p className="text-[12px] leading-4 font-medium text-[#175CD3]">
                    Journal entries and AI conversations stay private. Counts
                    only — never content.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 justify-end border-t border-[#E4E7EB] px-5 py-3.5">
                <Button
                  type="button"
                  variant="outline"
                  className="h-9 rounded-[10px] border-[#E4E7EB] bg-white px-3.5 text-[13px] font-medium text-[#344054] shadow-none"
                  onClick={() => {
                    if (canDeactivate) {
                      setDeactivateOpen(true);
                    }
                  }}
                >
                  {canDeactivate ? "Deactivate Account" : "Activate account"}
                </Button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      <DeactivateAccountDialog
        user={user}
        open={deactivateOpen}
        onOpenChange={setDeactivateOpen}
      />
    </>
  );
}

export { UserDetailsDialog };
export type { UserDetailsDialogProps };
