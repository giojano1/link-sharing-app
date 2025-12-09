import type { ApiErrorDetails } from "@/lib/api-error";

// Re-export form types from schemas
export type { RegisterFormType, LoginFormType } from "../schemas";

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

// Login-specific types
export interface LoginResponse {
  user: {
    id: string;
    email: string;
  };
  session: boolean;
}
