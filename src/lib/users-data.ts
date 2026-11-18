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

export const usersDirectory: UserRecord[] = [
  {
    id: "u-ava",
    accountCode: "U-48215",
    name: "Ava Brooks",
    email: "abrooks@guided.app",
    initials: "AB",
    avatarTone: "teal",
    registeredAt: "Nov 2, 2026",
    onboarding: "completed",
    lastActive: "Today",
    status: "active",
    signInMethod: "Apple",
    country: "United States",
    churchLinked: true,
    activity: {
      journalEntries: 18,
      prayersLogged: 42,
      bibleSessions: 11,
      aiConversations: 27,
    },
  },
  {
    id: "u-marcus",
    accountCode: "U-48102",
    name: "Marcus Lee",
    email: "mlee@guided.app",
    initials: "ML",
    avatarTone: "indigo",
    registeredAt: "Oct 28, 2026",
    onboarding: "completed",
    lastActive: "Yesterday",
    status: "active",
    signInMethod: "Google",
    country: "Canada",
    churchLinked: true,
    activity: {
      journalEntries: 9,
      prayersLogged: 21,
      bibleSessions: 7,
      aiConversations: 14,
    },
  },
  {
    id: "u-leah",
    accountCode: "U-47988",
    name: "Leah Kim",
    email: "lkim@guided.app",
    initials: "LK",
    avatarTone: "rose",
    registeredAt: "Oct 21, 2026",
    onboarding: "in-progress",
    lastActive: "2 days ago",
    status: "active",
    signInMethod: "Email",
    country: "South Korea",
    churchLinked: false,
    activity: {
      journalEntries: 3,
      prayersLogged: 5,
      bibleSessions: 2,
      aiConversations: 8,
    },
  },
  {
    id: "u-samuel",
    accountCode: "U-47641",
    name: "Samuel Ortiz",
    email: "sortiz@guided.app",
    initials: "SO",
    avatarTone: "amber",
    registeredAt: "Oct 12, 2026",
    onboarding: "completed",
    lastActive: "5 days ago",
    status: "inactive",
    signInMethod: "Apple",
    country: "Mexico",
    churchLinked: true,
    activity: {
      journalEntries: 1,
      prayersLogged: 0,
      bibleSessions: 1,
      aiConversations: 2,
    },
  },
  {
    id: "u-nora",
    accountCode: "U-47210",
    name: "Nora Patel",
    email: "npatel@guided.app",
    initials: "NP",
    avatarTone: "violet",
    registeredAt: "Sep 30, 2026",
    onboarding: "not-started",
    lastActive: "12 days ago",
    status: "inactive",
    signInMethod: "Google",
    country: "United Kingdom",
    churchLinked: false,
    activity: {
      journalEntries: 0,
      prayersLogged: 0,
      bibleSessions: 0,
      aiConversations: 1,
    },
  },
  {
    id: "u-jordan",
    accountCode: "U-46855",
    name: "Jordan Blake",
    email: "jblake@guided.app",
    initials: "JB",
    avatarTone: "sky",
    registeredAt: "Sep 18, 2026",
    onboarding: "completed",
    lastActive: "Today",
    status: "deletion-requested",
    signInMethod: "Email",
    country: "United States",
    churchLinked: false,
    activity: {
      journalEntries: 12,
      prayersLogged: 16,
      bibleSessions: 4,
      aiConversations: 19,
    },
  },
];

export const usersTotalCount = 48215;

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
