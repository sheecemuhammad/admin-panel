import { Typography } from "@/components/ui/typography";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-1 px-6 py-6 md:px-8">
      <Typography as="h1" variant="screenHeading" className="font-semibold">
        Settings
      </Typography>
      <Typography as="p" variant="body" className="text-muted-foreground">
        Settings content will go here.
      </Typography>
    </div>
  );
}
