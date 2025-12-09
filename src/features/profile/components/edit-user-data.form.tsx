"use client";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import FormInput from "@/components/ui/inputs/form-input";
import { useCurrentUser } from "@/features/user/hooks/use-current-user";
import { useTypedForm } from "@/hooks/use-typed-form";
import {
  updateProfileSchema,
  updateProfileDefaultValues,
} from "../schemas";
import { useUpdateProfile } from "../hooks/use-update-profile";
import type { UpdateProfileFormType } from "../types/profile-api.types";

interface EditUserDataFormProps {
  onFormStateChange?: (isPending: boolean) => void;
}

export default function EditUserDataForm({
  onFormStateChange,
}: EditUserDataFormProps) {
  const { data: user, isLoading } = useCurrentUser();

  const formMethods = useTypedForm(updateProfileSchema, {
    defaultValues: updateProfileDefaultValues,
  });
  const { register, setError, formState, reset, handleSubmit } = formMethods;

  // Update form when user data loads
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      });
    }
  }, [user, reset]);

  // Use the mutation hook
  const { mutate, isPending } = useUpdateProfile({
    setError,
    onSuccess: () => {
      // Optional: Add toast notification here
      console.log("Profile updated successfully!");
    },
  });

  // Define onSubmit handler
  const onSubmit = (data: UpdateProfileFormType) => {
    mutate(data);
  };

  // Notify parent of form state changes
  useEffect(() => {
    if (onFormStateChange) {
      onFormStateChange(isPending);
    }
  }, [isPending, onFormStateChange]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Card>
      <CardContent>
        <form id="profile-form" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="flex flex-col gap-6" disabled={isPending}>
            <div className="flex items-center justify-between gap-5">
              <span className="block">First Name*</span>
              <div className="flex-1 max-w-[450px]">
                <FormInput
                  label=""
                  name="firstName"
                  placeholder="e.g. John"
                  register={register}
                  errors={formState.errors}
                  disabled={isPending}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-5">
              <span className="block">Last Name*</span>
              <div className="flex-1 max-w-[450px]">
                <FormInput
                  label=""
                  name="lastName"
                  placeholder="e.g. Doe"
                  register={register}
                  errors={formState.errors}
                  disabled={isPending}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-5">
              <span className="block">Email</span>
              <Input
                className="flex-1 max-w-[450px]"
                value={user?.email || ""}
                readOnly={true}
                disabled
              />
            </div>

            {/* Root error display */}
            {formState.errors.root && (
              <p className="text-sm text-destructive">
                {formState.errors.root.message}
              </p>
            )}
          </fieldset>
        </form>
      </CardContent>
    </Card>
  );
}
