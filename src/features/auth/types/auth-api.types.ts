import type { ApiErrorDetails } from "@/lib/api-error";

// Re-export RegisterFormType from schemas
export type { RegisterFormType } from "../schemas";

// API Response wrapper types
export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorDetails;
}

// Registration-specific types
export interface RegisterResponse {
  user: {
    id: string;
    email: string;
  };
  session: boolean;
}
