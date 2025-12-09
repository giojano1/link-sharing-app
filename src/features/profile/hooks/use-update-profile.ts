"use client";

import { useMutation } from "@tanstack/react-query";
import type { UseFormSetError } from "react-hook-form";
import { ApiError } from "@/lib/api-error";
import { updateUserProfile } from "../api/profile.api";
import type { UpdateProfileFormType } from "../types/profile-api.types";
import { useInvalidateUser } from "@/features/user/hooks/use-invalidate-user";

interface UseUpdateProfileOptions {
  setError: UseFormSetError<UpdateProfileFormType>;
  onSuccess?: () => void;
}

export function useUpdateProfile({
  setError,
  onSuccess,
}: UseUpdateProfileOptions) {
  const { invalidateUser } = useInvalidateUser();

  return useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: updateUserProfile,
    onSuccess: async () => {
      // Invalidate user query to trigger refetch and update UI
      await invalidateUser();

      // Optional success callback (e.g., show toast notification)
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      // Map API errors to React Hook Form field errors
      if (error.fields) {
        Object.entries(error.fields).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            setError(field as keyof UpdateProfileFormType, {
              message: messages[0],
            });
          }
        });
      } else {
        // Set a general error if no field-specific errors
        setError("root", {
          message: error.message || "Failed to update profile",
        });
      }
    },
  });
}
