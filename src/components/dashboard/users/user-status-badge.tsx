import { Badge } from "@/components/ui/badge";
import { userStatusLabels, type UserAccountStatus } from "@/lib/users-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<UserAccountStatus, { badge: string; dot: string }> =
  {
    active: {
      badge: "bg-[#ECFDF3] text-[#027A48]",
      dot: "bg-[#12B76A]",
    },
    inactive: {
      badge: "bg-[#FEF3F2] text-[#B42318]",
      dot: "bg-[#F04438]",
    },
    "deletion-requested": {
      badge: "bg-[#FFFAEB] text-[#B54708]",
      dot: "bg-[#F79009]",
    },
  };

type UserStatusBadgeProps = {
  status: UserAccountStatus;
  className?: string;
};

function UserStatusBadge({ status, className }: UserStatusBadgeProps) {
  const styles = statusStyles[status];

  return (
    <Badge
      variant="secondary"
      className={cn(
        "h-auto gap-1.5 rounded-full border-0 px-2.5 py-1 text-[12px] font-medium",
        styles.badge,
        className
      )}
    >
      <span className={cn("size-1.5 shrink-0 rounded-full", styles.dot)} />
      {userStatusLabels[status]}
    </Badge>
  );
}

export { UserStatusBadge };
export type { UserStatusBadgeProps };
