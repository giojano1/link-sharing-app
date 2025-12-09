"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/user.api";
import type { UserProfile } from "../types/user.types";
import { ApiError } from "@/lib/api-error";

export const USER_QUERY_KEY = ["user", "current"] as const;

interface UseCurrentUserOptions {
  // Allow passing initial data from server
  initialData?: UserProfile;
  // Control when query runs
  enabled?: boolean;
}

export function useCurrentUser(options?: UseCurrentUserOptions) {
  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: async () => {
      const response = await getCurrentUser();
      return response.data.user;
    },
    // Use initial data from server if available
    initialData: options?.initialData,
    // Keep data fresh for 1 minute (user profile doesn't change often)
    staleTime: 1000 * 60, // 1 minute
    // Cache for 5 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
    // Retry once on failure
    retry: 1,
    // Don't refetch on window focus (profile data is relatively stable)
    refetchOnWindowFocus: false,
    // Refetch on mount if stale
    refetchOnMount: true,
    // Control query execution
    enabled: options?.enabled,
  });
}

// Helper hook for easy access to user data
export function useUser() {
  const { data, isLoading, error } = useCurrentUser();

  return {
    user: data,
    isLoading,
    error: error as ApiError | null,
    isAuthenticated: !!data,
  };
}
