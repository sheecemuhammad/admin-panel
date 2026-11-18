import type { DummyJsonUser } from "@/lib/users/dummy-json-types";
import type {
  UserAccountStatus,
  UserActivityStats,
  UserAvatarTone,
  UserOnboardingStatus,
  UserRecord,
  UserSignInMethod,
} from "@/lib/users-data";

const AVATAR_TONES: UserAvatarTone[] = [
  "teal",
  "indigo",
  "rose",
  "amber",
  "violet",
  "sky",
];

const STATUSES: UserAccountStatus[] = [
  "active",
  "active",
  "active",
  "inactive",
  "deletion-requested",
];

const ONBOARDING: UserOnboardingStatus[] = [
  "completed",
  "completed",
  "in-progress",
  "not-started",
];

const LAST_ACTIVE = [
  "Today",
  "Yesterday",
  "2 days ago",
  "5 days ago",
  "12 days ago",
] as const;

const SIGN_IN_METHODS: UserSignInMethod[] = ["Apple", "Google", "Email"];

function pickStable<T>(values: readonly T[], seed: number): T {
  return values[Math.abs(seed) % values.length]!;
}

function formatBirthDate(birthDate?: string): string {
  if (!birthDate) return "—";

  const parsed = new Date(birthDate);
  if (Number.isNaN(parsed.getTime())) return birthDate;

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function initialsFromName(firstName: string, lastName: string): string {
  const first = firstName.trim().charAt(0);
  const last = lastName.trim().charAt(0);
  return `${first}${last}`.toUpperCase() || "?";
}

function deriveActivity(seed: number): UserActivityStats {
  return {
    journalEntries: seed % 20,
    prayersLogged: (seed * 3) % 45,
    bibleSessions: (seed * 5) % 15,
    aiConversations: (seed * 7) % 30,
  };
}

function mapDummyJsonUser(user: DummyJsonUser): UserRecord {
  const seed = user.id;
  const firstName = user.firstName?.trim() || "User";
  const lastName = user.lastName?.trim() || "";

  return {
    id: String(user.id),
    accountCode: `U-${String(user.id).padStart(5, "0")}`,
    name: [firstName, lastName].filter(Boolean).join(" "),
    email: user.email,
    initials: initialsFromName(firstName, lastName),
    avatarTone: pickStable(AVATAR_TONES, seed),
    registeredAt: formatBirthDate(user.birthDate),
    onboarding: pickStable(ONBOARDING, seed),
    lastActive: pickStable(LAST_ACTIVE, seed),
    status: pickStable(STATUSES, seed),
    signInMethod: pickStable(SIGN_IN_METHODS, seed),
    country: user.address?.country || "—",
    churchLinked: seed % 2 === 0,
    activity: deriveActivity(seed),
  };
}

export { mapDummyJsonUser };
