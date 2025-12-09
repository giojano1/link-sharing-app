import { QueryClient } from "@tanstack/react-query";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Fresh data for auth operations
        staleTime: 0,
        // Cache data for 5 minutes
        gcTime: 1000 * 60 * 5,
        // Retry once for network issues
        retry: 1,
        // Avoid unnecessary refetches
        refetchOnWindowFocus: false,
        refetchOnMount: true,
      },
      mutations: {
        // Don't retry mutations (e.g., registration shouldn't be retried automatically)
        retry: false,
        networkMode: "online",
      },
    },
  });
}
