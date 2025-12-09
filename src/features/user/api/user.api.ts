import { ApiError } from "@/lib/api-error";
import type {
  ApiResponse,
  UserProfileResponse,
} from "../types/user.types";

export async function getCurrentUser(): Promise<
  ApiResponse<UserProfileResponse>
> {
  const response = await fetch("/api/user/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // Ensure fresh data on navigation
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new ApiError(result.error, response.status);
  }

  return result;
}
