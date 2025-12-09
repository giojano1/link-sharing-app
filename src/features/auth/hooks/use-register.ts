"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { UseFormSetError } from "react-hook-form";
import { ApiError } from "@/lib/api-error";
import { registerUser } from "../api/auth.api";
import type { RegisterFormType } from "../types/auth-api.types";
import { Routes } from "@/constants/routes";

interface UseRegisterOptions {
  setError: UseFormSetError<RegisterFormType>;
}

export function useRegister({ setError }: UseRegisterOptions) {
  const router = useRouter();

  return useMutation({
    mutationKey: ["register"],
    mutationFn: registerUser,
    onSuccess: () => {
      // Redirect to dashboard on successful registration
      router.push(Routes.DASHBOARD);
    },
    onError: (error: ApiError) => {
      // Map API errors to React Hook Form field errors
      if (error.fields) {
        Object.entries(error.fields).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            setError(field as keyof RegisterFormType, {
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
