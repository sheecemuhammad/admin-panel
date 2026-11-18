import type { DummyJsonUsersResponse } from "@/lib/users/dummy-json-types";
import { mapDummyJsonUser } from "@/lib/users/map-user";
import type { UserRecord } from "@/lib/users-data";

export class UsersFetchError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "UsersFetchError";
    this.status = status;
  }
}

type FetchUsersParams = {
  q?: string;
  limit: number;
  skip: number;
  signal?: AbortSignal;
};

type FetchUsersResult = {
  rows: UserRecord[];
  total: number;
};

async function fetchUsers({
  q,
  limit,
  skip,
  signal,
}: FetchUsersParams): Promise<FetchUsersResult> {
  const query = q?.trim() ?? "";
  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });

  if (query.length > 0) {
    params.set("q", query);
  }

  // Same-origin BFF — DummyJSON is unreachable directly from some browsers (CORS/network).
  const response = await fetch(`/api/users?${params.toString()}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    throw new UsersFetchError(
      `Failed to fetch users (${response.status})`,
      response.status
    );
  }

  const data = (await response.json()) as DummyJsonUsersResponse;

  return {
    rows: (data.users ?? []).map(mapDummyJsonUser),
    total: data.total ?? 0,
  };
}

export { fetchUsers };
export type { FetchUsersParams, FetchUsersResult };
