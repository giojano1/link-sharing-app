import type { ApiErrorDetails } from "@/lib/api-error";

// Re-export form types from schemas
export type { UpdateProfileFormType } from "../schemas";

// API Response wrapper types
export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorDetails;
}

// Update profile response
export interface UpdateProfileResponse {
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
}
