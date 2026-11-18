export type UserAccountStatus = "active" | "inactive" | "deletion-requested";

export type UserOnboardingStatus = "completed" | "in-progress" | "not-started";

export type UserAvatarTone =
  "teal" | "indigo" | "rose" | "amber" | "violet" | "sky";

export type UsersStat = {
  id: string;
  label: string;
  value: string;
  description: string;
};

export type UserActivityStats = {
  journalEntries: number;
  prayersLogged: number;
  bibleSessions: number;
  aiConversations: number;
};

export type UserSignInMethod = "Apple" | "Google" | "Email";

export type UserRecord = {
  id: string;
  accountCode: string;
  name: string;
  email: string;
  initials: string;
  avatarTone: UserAvatarTone;
  registeredAt: string;
  onboarding: UserOnboardingStatus;
  lastActive: string;
  status: UserAccountStatus;
  signInMethod: UserSignInMethod;
  country: string;
  churchLinked: boolean;
  activity: UserActivityStats;
};

export const usersStats: UsersStat[] = [
  {
    id: "registered",
    label: "Registered",
    value: "48,215",
    description: "All accounts",
  },
  {
    id: "active-30d",
    label: "Active · 30 days",
    value: "21,377",
    description: "44.3% of registered",
  },
  {
    id: "onboarding-incomplete",
    label: "Onboarding incomplete",
    value: "3,902",
    description: "Started but not finished",
  },
  {
    id: "deletion-requests",
    label: "Deletion requests",
    value: "2",
    description: "Due within 30 days",
  },
];

export const userStatusLabels: Record<UserAccountStatus, string> = {
  active: "Active",
  inactive: "Inactive",
  "deletion-requested": "Deletion requested",
};

export const userOnboardingLabels: Record<UserOnboardingStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  "not-started": "Not started",
};

export const userAvatarToneClasses: Record<UserAvatarTone, string> = {
  teal: "bg-[#CCFBF1] text-[#0F766E]",
  indigo: "bg-[#E0E7FF] text-[#4338CA]",
  rose: "bg-[#FFE4E6] text-[#BE123C]",
  amber: "bg-[#FEF3C7] text-[#B45309]",
  violet: "bg-[#EDE9FE] text-[#6D28D9]",
  sky: "bg-[#E0F2FE] text-[#0369A1]",
};
