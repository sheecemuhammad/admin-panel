export type OverviewPeriod = "7d" | "30d" | "90d";

export type MetricAccent = "blue" | "green" | "amber" | "purple";

export type OverviewMetric = {
  id: string;
  label: string;
  value: string;
  delta: string;
  accent: MetricAccent;
  sparkline: number[];
};

export type ActiveUsersPoint = {
  date: string;
  label: string;
  dailyActive: number;
  previousPeriod: number;
};

export type OverviewModule =
  | "Journey & Goals"
  | "AI & Guidance"
  | "Settings"
  | "Scripture & Bible"
  | "Journaling"
  | "Users"
  | "Church Management";

export type ActivityChangePart = {
  text: string;
  emphasis?: boolean;
};

export type ActivityItem = {
  id: string;
  change: ActivityChangePart[];
  module: OverviewModule;
  when: string;
};

export const overviewMetrics: OverviewMetric[] = [
  {
    id: "registered-users",
    label: "Registered users",
    value: "48,215",
    delta: "+1,284 new",
    accent: "blue",
    sparkline: [12, 18, 14, 22, 19, 26, 24, 28, 25, 30, 27, 32],
  },
  {
    id: "active-users",
    label: "Active users",
    value: "21,377",
    delta: "44.3% of registered",
    accent: "green",
    sparkline: [20, 16, 22, 18, 24, 21, 27, 23, 29, 26, 31, 28],
  },
  {
    id: "content-items",
    label: "Content items",
    value: "3,418",
    delta: "96 published this month",
    accent: "amber",
    sparkline: [8, 10, 9, 14, 12, 16, 15, 18, 17, 20, 19, 22],
  },
  {
    id: "ai-service",
    label: "AI service",
    value: "99.96%",
    delta: "Uptime, p95 1.8 s",
    accent: "purple",
    sparkline: [30, 29, 31, 30, 32, 31, 30, 32, 31, 32, 31, 32],
  },
];

export const activeUsersSeries: ActiveUsersPoint[] = [
  {
    date: "2025-10-06",
    label: "Oct 6",
    dailyActive: 9800,
    previousPeriod: 8600,
  },
  {
    date: "2025-10-07",
    label: "Oct 7",
    dailyActive: 10200,
    previousPeriod: 9100,
  },
  {
    date: "2025-10-08",
    label: "Oct 8",
    dailyActive: 11100,
    previousPeriod: 9400,
  },
  {
    date: "2025-10-09",
    label: "Oct 9",
    dailyActive: 10800,
    previousPeriod: 9700,
  },
  {
    date: "2025-10-10",
    label: "Oct 10",
    dailyActive: 11800,
    previousPeriod: 10100,
  },
  {
    date: "2025-10-11",
    label: "Oct 11",
    dailyActive: 12100,
    previousPeriod: 10400,
  },
  {
    date: "2025-10-12",
    label: "Oct 12",
    dailyActive: 11500,
    previousPeriod: 9900,
  },
  {
    date: "2025-10-13",
    label: "Oct 13",
    dailyActive: 12400,
    previousPeriod: 10800,
  },
  {
    date: "2025-10-14",
    label: "Oct 14",
    dailyActive: 11900,
    previousPeriod: 10500,
  },
  {
    date: "2025-10-15",
    label: "Oct 15",
    dailyActive: 12800,
    previousPeriod: 11000,
  },
  {
    date: "2025-10-16",
    label: "Oct 16",
    dailyActive: 12600,
    previousPeriod: 11200,
  },
  {
    date: "2025-10-17",
    label: "Oct 17",
    dailyActive: 13200,
    previousPeriod: 11400,
  },
  {
    date: "2025-10-18",
    label: "Oct 18",
    dailyActive: 12900,
    previousPeriod: 11600,
  },
  {
    date: "2025-10-19",
    label: "Oct 19",
    dailyActive: 13500,
    previousPeriod: 11800,
  },
  {
    date: "2025-10-20",
    label: "Oct 20",
    dailyActive: 13100,
    previousPeriod: 11500,
  },
  {
    date: "2025-10-21",
    label: "Oct 21",
    dailyActive: 12700,
    previousPeriod: 11300,
  },
  {
    date: "2025-10-22",
    label: "Oct 22",
    dailyActive: 13400,
    previousPeriod: 11700,
  },
  {
    date: "2025-10-23",
    label: "Oct 23",
    dailyActive: 13600,
    previousPeriod: 11900,
  },
  {
    date: "2025-10-24",
    label: "Oct 24",
    dailyActive: 13000,
    previousPeriod: 11600,
  },
  {
    date: "2025-10-25",
    label: "Oct 25",
    dailyActive: 12800,
    previousPeriod: 11400,
  },
  {
    date: "2025-10-26",
    label: "Oct 26",
    dailyActive: 13300,
    previousPeriod: 11700,
  },
  {
    date: "2025-10-27",
    label: "Oct 27",
    dailyActive: 13412,
    previousPeriod: 11908,
  },
  {
    date: "2025-10-28",
    label: "Oct 28",
    dailyActive: 13100,
    previousPeriod: 11600,
  },
  {
    date: "2025-10-29",
    label: "Oct 29",
    dailyActive: 13700,
    previousPeriod: 12000,
  },
  {
    date: "2025-10-30",
    label: "Oct 30",
    dailyActive: 13900,
    previousPeriod: 12200,
  },
  {
    date: "2025-10-31",
    label: "Oct 31",
    dailyActive: 13600,
    previousPeriod: 12100,
  },
  {
    date: "2025-11-01",
    label: "Nov 1",
    dailyActive: 13600,
    previousPeriod: 12100,
  },
  {
    date: "2025-11-02",
    label: "Nov 2",
    dailyActive: 13400,
    previousPeriod: 11900,
  },
  {
    date: "2025-11-03",
    label: "Nov 3",
    dailyActive: 13700,
    previousPeriod: 12200,
  },
  {
    date: "2025-11-04",
    label: "Today",
    dailyActive: 13900,
    previousPeriod: 12300,
  },
];

export const recentActivity: ActivityItem[] = [
  {
    id: "1",
    change: [
      { text: "Published " },
      { text: "‘Peace in Anxiety’", emphasis: true },
      { text: " journey template" },
    ],
    module: "Journey & Goals",
    when: "12 min ago",
  },
  {
    id: "2",
    change: [
      { text: "Activated " },
      { text: "Scripture Guidance prompt v14", emphasis: true },
    ],
    module: "AI & Guidance",
    when: "48 min ago",
  },
  {
    id: "3",
    change: [
      { text: "Changed role of " },
      { text: "Samuel Ortiz", emphasis: true },
      { text: " to Moderator" },
    ],
    module: "Users",
    when: "2 hr ago",
  },
  {
    id: "4",
    change: [
      { text: "Enabled push digests for " },
      { text: "church admins", emphasis: true },
    ],
    module: "Settings",
    when: "3 hr ago",
  },
  {
    id: "5",
    change: [
      { text: "Added 24 verses to " },
      { text: "Hope & Healing", emphasis: true },
      { text: " collection" },
    ],
    module: "Scripture & Bible",
    when: "Yesterday",
  },
  {
    id: "6",
    change: [
      { text: "Drafted prompt pack " },
      { text: "‘Gratitude Week’", emphasis: true },
    ],
    module: "Journaling",
    when: "Yesterday",
  },
  {
    id: "7",
    change: [
      { text: "Linked campus profile for " },
      { text: "Grace Community", emphasis: true },
    ],
    module: "Church Management",
    when: "3 days ago",
  },
];

export type ContentTask = {
  id: string;
  title: string;
  subtitle: string;
  actionLabel: string;
};

export type ModuleContentStat = {
  id: string;
  label: string;
  count: number;
};

export type SystemStatusLevel = "operational" | "degraded";

export type SystemStatusItem = {
  id: string;
  label: string;
  status: SystemStatusLevel;
};

export const contentTasks: ContentTask[] = [
  {
    id: "task-1",
    title: "Unpublished Journal Prompt",
    subtitle: "Prompt submitted by Leah Kim",
    actionLabel: "Continue Editing",
  },
  {
    id: "task-2",
    title: "Draft Journey Template",
    subtitle: "Template drafted by Marcus Lee",
    actionLabel: "Edit & Publish",
  },
  {
    id: "task-3",
    title: "Updated Scripture Content",
    subtitle: "Revision pending review from Ava Brooks",
    actionLabel: "Preview & Publish",
  },
];

export const contentByModule: ModuleContentStat[] = [
  { id: "scripture", label: "Scripture & Bible", count: 1872 },
  { id: "journaling", label: "Journaling prompts", count: 642 },
  { id: "journey", label: "Journey & Goals", count: 518 },
  { id: "ai", label: "AI knowledge & prompts", count: 386 },
];

export const contentByModuleSummary = {
  published: 3306,
  drafts: 112,
};

export const systemStatusItems: SystemStatusItem[] = [
  { id: "ai", label: "AI guidance service", status: "operational" },
  { id: "scripture", label: "Scripture recommendation", status: "operational" },
  { id: "push", label: "Push notifications", status: "degraded" },
  { id: "cdn", label: "Content delivery", status: "operational" },
];

export const systemStatusSummary =
  "Last checked 2 minutes ago. Notification delivery is delayed by up to 6 minutes.";
