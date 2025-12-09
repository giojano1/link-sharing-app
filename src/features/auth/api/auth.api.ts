import { ApiError } from "@/lib/api-error";
import type {
  ApiResponse,
  RegisterFormType,
  RegisterResponse,
  LoginFormType,
  LoginResponse,
} from "../types/auth-api.types";

export async function registerUser(
  data: RegisterFormType
): Promise<ApiResponse<RegisterResponse>> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
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

export async function loginUser(
  data: LoginFormType
): Promise<ApiResponse<LoginResponse>> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
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
