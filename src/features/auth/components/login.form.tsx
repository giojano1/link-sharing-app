"use client";

import { useTypedForm } from "@/hooks/use-typed-form";
import { loginDefaultValues, loginSchema } from "../schemas";
import FormWrapper from "@/components/ui/wrapper/form-wrapper";
import FormInput from "@/components/ui/inputs/form-input";
import PasswordInput from "@/components/ui/inputs/password-input";
import { useLogin } from "../hooks/use-login";
import type { LoginFormType } from "../types/auth-api.types";

export default function LoginForm() {
  const formMethods = useTypedForm(loginSchema, {
    defaultValues: loginDefaultValues,
  });
  const { register, setError } = formMethods;

  // Use the mutation hook
  const { mutate, isPending } = useLogin({ setError });

  // Define onSubmit handler
  const onSubmit = (data: LoginFormType) => {
    mutate(data);
  };

  return (
    <FormWrapper
      formMethods={formMethods}
      onSubmit={onSubmit}
      isPending={isPending}
      ariaLabel="Login form"
      submitButtonLabel="Login"
      submitButtonLoadingLabel="Logging in..."
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
    </FormWrapper>
  );
}
