"use client";
import FormInput from "@/components/ui/inputs/form-input";
import PasswordInput from "@/components/ui/inputs/password-input";
import FormWrapper from "@/components/ui/wrapper/form-wrapper";
import { useTypedForm } from "@/hooks/use-typed-form";
import { registerDefaultValues, registerSchema } from "../schemas";
import { useRegister } from "../hooks/use-register";
import type { RegisterFormType } from "../types/auth-api.types";

export default function RegisterForm() {
  const formMethods = useTypedForm(registerSchema, {
    defaultValues: registerDefaultValues,
  });
  const { register, setError } = formMethods;

  // Use the mutation hook
  const { mutate, isPending } = useRegister({ setError });

  // Define onSubmit handler
  const onSubmit = (data: RegisterFormType) => {
    mutate(data);
  };

  return (
    <FormWrapper
      formMethods={formMethods}
      onSubmit={onSubmit}
      isPending={isPending}
      ariaLabel="Register form"
      submitButtonLabel="Create Account"
      submitButtonLoadingLabel="Creating Account..."
    >
      <FormInput
        label="Email"
        placeholder="your@email.com"
        name="email"
        register={register}
        errors={formMethods.formState.errors}
        disabled={isPending}
      />
      <PasswordInput
        label="Password"
        name="password"
        register={register}
        errors={formMethods.formState.errors}
        disabled={isPending}
      />
      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        register={register}
        errors={formMethods.formState.errors}
        disabled={isPending}
      />
    </FormWrapper>
  );
}
