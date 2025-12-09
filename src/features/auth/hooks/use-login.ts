"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { UseFormSetError } from "react-hook-form";
import { signIn } from "next-auth/react";
import { ApiError } from "@/lib/api-error";
import { loginUser } from "../api/auth.api";
import type { LoginFormType } from "../types/auth-api.types";
import { Routes } from "@/constants/routes";

interface UseLoginOptions {
  setError: UseFormSetError<LoginFormType>;
}

export function useLogin({ setError }: UseLoginOptions) {
  const router = useRouter();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginFormType) => {
      // First, validate credentials via API
      const result = await loginUser(data);

      // Then, establish session via NextAuth
      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResult?.error) {
        throw new ApiError(
          {
            message: "Failed to establish session",
            code: "SESSION_ERROR",
          },
          500
        );
      }

      return result;
    },
    onSuccess: () => {
      // Redirect to dashboard on successful login
      router.push(Routes.DASHBOARD);
      router.refresh(); // Refresh to update session state
    },
    onError: (error: ApiError) => {
      // Map API errors to React Hook Form field errors
      if (error.fields) {
        Object.entries(error.fields).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            setError(field as keyof LoginFormType, {
              message: messages[0],
            });
          }
        });
      } else {
        // Set a general error if no field-specific errors
        setError("root", {
          message: error.message || "Something went wrong",
        });
      }
    },
  });
}
