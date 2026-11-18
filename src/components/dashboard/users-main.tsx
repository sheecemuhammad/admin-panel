"use client";

import { useEffect, useMemo, useState } from "react";
import { Upload } from "lucide-react";

import { DashboardPageHeader } from "@/components/dashboard/overview/dashboard-page-header";
import { StatCard } from "@/components/dashboard/users/stat-card";
import { UserDetailsDialog } from "@/components/dashboard/users/user-details-dialog";
import { UsersFilters } from "@/components/dashboard/users/users-filters";
import { UsersTable } from "@/components/dashboard/users/users-table";
import { Button } from "@/components/ui/button";
import { fetchUsers } from "@/lib/users/fetch-users";
import {
  usersStats,
  type UserAccountStatus,
  type UserOnboardingStatus,
  type UserRecord,
} from "@/lib/users-data";

const PAGE_SIZE = 10;

function UsersMain() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [onboarding, setOnboarding] = useState("all");
  const [registered, setRegistered] = useState("any");
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Load the full directory once; search / filters / pagination stay client-side.
  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    void (async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchUsers({
          limit: 0,
          skip: 0,
          signal: controller.signal,
        });

        if (cancelled) return;

        setAllUsers(result.rows);
      } catch (fetchError) {
        if (cancelled) return;
        if (fetchError instanceof Error && fetchError.name === "AbortError") {
          return;
        }

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Failed to load users."
        );
        setAllUsers([]);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return allUsers.filter((user) => {
      const matchesSearch =
        query.length === 0 ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);

      const matchesStatus =
        status === "all" || user.status === (status as UserAccountStatus);

      const matchesOnboarding =
        onboarding === "all" ||
        user.onboarding === (onboarding as UserOnboardingStatus);

      // Registered date filter has no DummyJSON equivalent yet.
      void registered;

      return matchesSearch && matchesStatus && matchesOnboarding;
    });
  }, [allUsers, search, status, onboarding, registered]);

  const filteredTotal = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(filteredTotal / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = filteredTotal === 0 ? 0 : (currentPage - 1) * PAGE_SIZE;
  const showingFrom = filteredTotal === 0 ? 0 : pageStart + 1;
  const showingTo = Math.min(pageStart + PAGE_SIZE, filteredTotal);
  const visibleRows = filteredUsers.slice(pageStart, pageStart + PAGE_SIZE);

  function updateFilter<T extends string>(
    setter: (value: T) => void,
    value: string | null,
    fallback: T
  ) {
    setter((value as T | null) ?? fallback);
    setPage(1);
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <DashboardPageHeader
        title="Users"
        subtitle="Account-level information only. Private journals and AI conversations are never shown."
        actions={
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9 gap-1.5 rounded-[10px] border-[#E4E7EB] bg-white px-3.5 font-sans text-[13px] font-medium text-[#344054] shadow-none"
          >
            <Upload className="size-4" />
            Export CSV
          </Button>
        }
      />

      <div className="flex flex-col gap-5 px-4 py-4 sm:px-5 sm:py-5 md:px-8 md:py-7">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          {usersStats.map((stat) => (
            <StatCard
              key={stat.id}
              label={stat.label}
              value={
                stat.id === "registered"
                  ? allUsers.length.toLocaleString("en-US")
                  : stat.value
              }
              description={stat.description}
            />
          ))}
        </div>

        <UsersFilters
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          status={status}
          onStatusChange={(value) => updateFilter(setStatus, value, "all")}
          onboarding={onboarding}
          onOnboardingChange={(value) =>
            updateFilter(setOnboarding, value, "all")
          }
          registered={registered}
          onRegisteredChange={(value) =>
            updateFilter(setRegistered, value, "any")
          }
        />

        <div className="flex flex-col gap-3">
          {error ? (
            <div className="rounded-2xl border border-[#FECDCA] bg-[#FEF3F2] px-5 py-4 text-[13px] font-medium text-[#B42318]">
              {error}
            </div>
          ) : null}

          {loading ? (
            <div className="rounded-2xl border border-[#E4E7EB] bg-white px-5 py-10 text-center text-[13px] text-[#667085]">
              Loading users…
            </div>
          ) : (
            <UsersTable
              rows={visibleRows}
              onViewProfile={(user) => {
                setSelectedUser(user);
                setDetailsOpen(true);
              }}
            />
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted-foreground text-[13px]">
              Showing {showingFrom}-{showingTo} of{" "}
              {filteredTotal.toLocaleString("en-US")}
            </p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 rounded-lg px-3"
                disabled={loading || currentPage <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              >
                Previous
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 rounded-lg px-3"
                disabled={loading || currentPage >= totalPages}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      <UserDetailsDialog
        user={selectedUser}
        open={detailsOpen}
        onOpenChange={(open) => {
          setDetailsOpen(open);
          if (!open) {
            setSelectedUser(null);
          }
        }}
      />
    </div>
  );
}

export { UsersMain };
