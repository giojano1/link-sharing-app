import { ApiError } from "@/lib/api-error";
import type {
  ApiResponse,
  UpdateProfileFormType,
  UpdateProfileResponse,
} from "../types/profile-api.types";

export async function updateUserProfile(
  data: UpdateProfileFormType
): Promise<ApiResponse<UpdateProfileResponse>> {
  const response = await fetch("/api/user/profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new ApiError(result.error, response.status);
  }

  return result;
}
