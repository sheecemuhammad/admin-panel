"use client";

import { useState } from "react";
import { AlertTriangle, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { UserRecord } from "@/lib/users-data";
import { cn } from "@/lib/utils";

const DEACTIVATE_REASONS = {
  "user-request": "User requested deactivation",
  "policy-violation": "Policy violation",
  "suspicious-activity": "Suspicious activity",
  "inactive-account": "Inactive account",
  other: "Other",
} as const;

type DeactivateReason = keyof typeof DEACTIVATE_REASONS;

type DeactivateAccountDialogProps = {
  user: UserRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: (payload: {
    user: UserRecord;
    reason: DeactivateReason;
    note: string;
  }) => void;
};

function possessiveName(name: string) {
  return name.endsWith("s") ? `${name}’` : `${name}’s`;
}

function DeactivateAccountDialog({
  user,
  open,
  onOpenChange,
  onConfirm,
}: DeactivateAccountDialogProps) {
  const [reason, setReason] = useState<string>("");
  const [note, setNote] = useState("");
  const [showReasonError, setShowReasonError] = useState(false);

  function resetForm() {
    setReason("");
    setNote("");
    setShowReasonError(false);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      resetForm();
    }
    onOpenChange(nextOpen);
  }

  function handleConfirm() {
    if (!user) return;
    if (!reason) {
      setShowReasonError(true);
      return;
    }

    onConfirm?.({
      user,
      reason: reason as DeactivateReason,
      note: note.trim(),
    });
    resetForm();
    onOpenChange(false);
  }

  const reasonLabel =
    reason && reason in DEACTIVATE_REASONS
      ? DEACTIVATE_REASONS[reason as DeactivateReason]
      : "Select a reason";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton
        className={cn(
          "fixed top-1/2 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-[480px] -translate-x-1/2 -translate-y-1/2 flex-col",
          "gap-0 overflow-hidden rounded-[16px] border border-[#E4E7EB] bg-white p-0",
          "shadow-[0px_20px_48px_rgba(16,24,40,0.18)] ring-0 sm:max-w-[480px]"
        )}
      >
        {user ? (
          <>
            <DialogHeader className="gap-3 px-5 pt-5 pr-12 pb-0 text-left">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#FEF3F2]">
                <AlertTriangle className="size-5 text-[#D92D20]" />
              </div>
              <div className="space-y-1.5">
                <DialogTitle className="font-sans text-[18px] leading-7 font-semibold tracking-[-0.2px] text-[#101828]">
                  Deactivate {possessiveName(user.name)} account?
                </DialogTitle>
                <DialogDescription className="font-sans text-[13px] leading-5 text-[#667085]">
                  They’ll be signed out on all devices and can’t sign in until
                  reactivated. Their private content is kept and stays
                  inaccessible to admins.
                </DialogDescription>
              </div>
            </DialogHeader>

            <div className="flex flex-col gap-4 px-5 py-5">
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="deactivate-reason"
                  className="font-sans text-[13px] font-semibold text-[#101828]"
                >
                  Reason (required)
                </Label>
                <Select
                  value={reason || null}
                  onValueChange={(value) => {
                    setReason(value ?? "");
                    if (value) setShowReasonError(false);
                  }}
                  items={DEACTIVATE_REASONS}
                >
                  <SelectTrigger
                    id="deactivate-reason"
                    aria-invalid={showReasonError || undefined}
                    className={cn(
                      "h-10! w-full min-w-0 justify-between rounded-[8px]! border bg-white px-3 text-[13px]! font-medium shadow-none data-[size=default]:h-10!",
                      showReasonError
                        ? "border-[#F04438] text-[#101828] focus-visible:border-[#F04438] focus-visible:ring-[#F04438]/20"
                        : "border-[#E4E7EB] text-[#344054]",
                      !reason && "text-[#98A2B3]"
                    )}
                  >
                    <SelectValue placeholder="Select a reason">
                      {reasonLabel}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent
                    align="start"
                    side="bottom"
                    sideOffset={6}
                    alignItemWithTrigger={false}
                    className="rounded-[12px] border border-[#E4E7EB] bg-white p-1.5 shadow-[0px_12px_32px_rgba(16,24,40,0.12)] ring-0"
                  >
                    {Object.entries(DEACTIVATE_REASONS).map(
                      ([itemValue, itemLabel]) => (
                        <SelectItem
                          key={itemValue}
                          value={itemValue}
                          className="rounded-lg py-2 pr-8 pl-3 text-[13px] font-medium text-[#344054] focus:bg-[#F2F3F5] focus:text-[#101828] data-highlighted:bg-[#F2F3F5] data-highlighted:text-[#101828] data-[selected]:bg-[#F2F3F5]"
                        >
                          {itemLabel}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                {showReasonError ? (
                  <p className="flex items-center gap-1.5 font-sans text-[12px] leading-4 font-medium text-[#D92D20]">
                    <TriangleAlert className="size-3.5 shrink-0" />
                    Choose a reason to continue.
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="deactivate-note"
                  className="font-sans text-[13px] font-semibold text-[#101828]"
                >
                  Internal note (optional)
                </Label>
                <Textarea
                  id="deactivate-note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Add context for other admins…"
                  className="min-h-[96px] resize-none rounded-[8px] border-[#E4E7EB] bg-white px-3 py-2.5 text-[13px] text-[#344054] shadow-none placeholder:text-[#98A2B3] md:text-[13px]"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-[#E4E7EB] px-5 py-3.5 sm:flex-row sm:justify-end">
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="outline"
                    className="h-9 rounded-[10px] border-[#E4E7EB] bg-white px-3.5 text-[13px] font-medium text-[#344054] shadow-none"
                  />
                }
              >
                Cancel
              </DialogClose>
              <Button
                type="button"
                onClick={handleConfirm}
                className="h-9 rounded-[10px] border-transparent bg-[#B42318] px-3.5 text-[13px] font-medium text-white shadow-none hover:bg-[#912018]"
              >
                Deactivate Account
              </Button>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

export { DeactivateAccountDialog };
export type { DeactivateAccountDialogProps, DeactivateReason };
