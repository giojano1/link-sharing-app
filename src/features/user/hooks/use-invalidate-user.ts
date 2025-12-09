"use client";

import { useQueryClient } from "@tanstack/react-query";
import { USER_QUERY_KEY } from "./use-current-user";

/**
 * Hook to invalidate user query cache
 * Use this after profile updates, avatar uploads, etc.
 */
export function useInvalidateUser() {
  const queryClient = useQueryClient();

  return {
    invalidateUser: () => {
      return queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY,
      });
    },
    refetchUser: () => {
      return queryClient.refetchQueries({
        queryKey: USER_QUERY_KEY,
      });
    },
  };
}
