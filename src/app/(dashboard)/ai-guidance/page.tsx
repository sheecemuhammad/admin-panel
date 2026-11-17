import { Typography } from "@/components/ui/typography";

export default function AiGuidancePage() {
  return (
    <div className="flex flex-1 flex-col gap-1 px-6 py-6 md:px-8">
      <Typography as="h1" variant="screenHeading" className="font-semibold">
        AI & Guidance
      </Typography>
      <Typography as="p" variant="body" className="text-muted-foreground">
        AI & Guidance content will go here.
      </Typography>
    </div>
  );
}
