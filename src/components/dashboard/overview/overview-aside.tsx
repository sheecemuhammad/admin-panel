import { ContentByModuleCard } from "@/components/dashboard/overview/content-by-module-card";
import { ContentTasksCard } from "@/components/dashboard/overview/content-tasks-card";
import { SystemStatusCard } from "@/components/dashboard/overview/system-status-card";
import {
  contentByModule,
  contentByModuleSummary,
  contentTasks,
  systemStatusItems,
  systemStatusSummary,
} from "@/lib/overview-data";
import { cn } from "@/lib/utils";

type OverviewAsideProps = {
  className?: string;
};

function OverviewAside({ className }: OverviewAsideProps) {
  return (
    <aside
      className={cn(
        "flex w-full shrink-0 flex-col gap-5 xl:w-[320px]",
        className
      )}
    >
      <ContentTasksCard items={contentTasks} />
      <ContentByModuleCard
        items={contentByModule}
        published={contentByModuleSummary.published}
        drafts={contentByModuleSummary.drafts}
      />
      <SystemStatusCard
        items={systemStatusItems}
        summary={systemStatusSummary}
      />
    </aside>
  );
}

export { OverviewAside };
export type { OverviewAsideProps };
