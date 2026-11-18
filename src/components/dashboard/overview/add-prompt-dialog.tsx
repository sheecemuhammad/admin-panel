"use client";

import { useState, type ReactElement } from "react";
import {
  BookOpen,
  Clock3,
  Flag,
  MessageSquare,
  PenLine,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type PromptUsage =
  | "main-chat"
  | "guided-journaling"
  | "journey-reflections"
  | "bible-reader"
  | "prayer-prompts"
  | "daily-verse";

type PromptUsageOption = {
  id: PromptUsage;
  title: string;
  description: string;
  icon: LucideIcon;
};

const USAGE_OPTIONS: PromptUsageOption[] = [
  {
    id: "main-chat",
    title: "Main chat replies",
    description: "Everyday AI guidance",
    icon: MessageSquare,
  },
  {
    id: "guided-journaling",
    title: "Guided journaling",
    description: "Prompts for journal entries",
    icon: PenLine,
  },
  {
    id: "journey-reflections",
    title: "Journey reflections",
    description: "Check-ins along a journey",
    icon: Flag,
  },
  {
    id: "bible-reader",
    title: "Bible reader",
    description: "Contextual scripture help",
    icon: BookOpen,
  },
  {
    id: "prayer-prompts",
    title: "Prayer prompts",
    description: "Short prayers for moments",
    icon: Sparkles,
  },
  {
    id: "daily-verse",
    title: "Daily verse",
    description: "Opening verse of the day",
    icon: Clock3,
  },
];

type AddPromptDialogProps = {
  trigger: ReactElement;
};

function AddPromptDialog({ trigger }: AddPromptDialogProps) {
  const [open, setOpen] = useState(false);
  const [promptName, setPromptName] = useState("");
  const [usage, setUsage] = useState<PromptUsage>("prayer-prompts");

  function resetForm() {
    setPromptName("");
    setUsage("prayer-prompts");
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      resetForm();
    }
  }

  function handleSave() {
    setOpen(false);
    resetForm();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger} />

      <DialogContent
        showCloseButton
        className={cn(
          "fixed top-4 right-4 bottom-auto left-4 z-50 sm:left-auto",
          "w-auto max-w-[calc(100vw-2rem)] sm:w-[min(520px,calc(100vw-2rem))] sm:max-w-[520px]",
          "translate-x-0 translate-y-0",
          "max-h-[calc(100svh-2rem)] gap-0 overflow-y-auto rounded-2xl p-0",
          "sm:max-w-[520px]"
        )}
      >
        <DialogHeader className="gap-0.5 px-4 pt-3.5 pr-11 pb-2 text-left">
          <p className="font-sans text-[11px] font-medium text-[#8B8F97]">
            Step 1 of 4
          </p>
          <DialogTitle className="font-sans text-[16px] leading-tight font-semibold tracking-[-0.2px] text-[#101828]">
            Add a prompt
          </DialogTitle>
          <DialogDescription className="font-sans text-[12px] leading-snug text-[#667085]">
            Name it and choose where it’s used. You’ll write and test it next.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 px-4 py-3">
          <div className="space-y-1.5">
            <Label
              htmlFor="prompt-name"
              className="font-sans text-[13px] font-semibold text-[#101828]"
            >
              Prompt name
            </Label>
            <Input
              id="prompt-name"
              value={promptName}
              onChange={(event) => setPromptName(event.target.value)}
              placeholder="e.g. Evening check-in"
              className="h-9 rounded-xl border-[#E4E7EB] bg-white px-3 text-[14px]"
            />
            <p className="font-sans text-[11px] text-[#8B8F97] italic">
              Shown to admins only. Users never see this name.
            </p>
          </div>

          <div className="space-y-2">
            <Label className="font-sans text-[13px] font-semibold text-[#101828]">
              Where will it be used?
            </Label>

            <RadioGroup
              value={usage}
              onValueChange={(value) => setUsage(value as PromptUsage)}
              className="grid grid-cols-1 gap-2 sm:grid-cols-2"
            >
              {USAGE_OPTIONS.map((option) => {
                const Icon = option.icon;
                const selected = usage === option.id;

                return (
                  <label
                    key={option.id}
                    className={cn(
                      "flex min-w-0 cursor-pointer items-center gap-2 rounded-xl border bg-white p-2 transition-colors",
                      selected
                        ? "border-[#101828] ring-1 ring-[#101828]"
                        : "border-[#E4E7EB] hover:border-[#D0D5DD]"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex size-7 shrink-0 items-center justify-center rounded-md",
                        selected
                          ? "bg-[#101828] text-white"
                          : "bg-[#F2F3F5] text-[#667085]"
                      )}
                    >
                      <Icon className="size-3.5" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-sans text-[12px] font-semibold text-[#101828]">
                        {option.title}
                      </span>
                      <span className="mt-0.5 block truncate font-sans text-[11px] leading-tight text-[#667085]">
                        {option.description}
                      </span>
                    </span>

                    <RadioGroupItem
                      value={option.id}
                      className={cn(
                        "size-4 shrink-0",
                        selected &&
                          "border-[#101828] data-checked:border-[#101828] data-checked:bg-[#101828]"
                      )}
                    />
                  </label>
                );
              })}
            </RadioGroup>
          </div>
        </div>

        <DialogFooter className="m-0 gap-2 border-t border-[#E4E7EB] bg-white px-4 py-2.5 sm:justify-end">
          <DialogClose
            render={
              <Button type="button" variant="outline" className="h-8 px-3" />
            }
          >
            Cancel
          </DialogClose>
          <Button
            type="button"
            className="h-8 rounded-lg px-3.5"
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { AddPromptDialog };
export type { AddPromptDialogProps, PromptUsage };
