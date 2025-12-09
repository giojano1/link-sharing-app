"use client";
import { useTypedForm } from "@/hooks/use-typed-form";

import { registerDefaultValues, registerSchema } from "../schemas";
import FormWrapper from "@/components/ui/wrapper/form-wrapper";
import FormInput from "@/components/ui/inputs/form-input";
import PasswordInput from "@/components/ui/inputs/password-input";

export default function RegisterForm() {
  const formMethods = useTypedForm(registerSchema, {
    defaultValues: registerDefaultValues,
  });
  const { register } = formMethods;
  const registerUser = async (data: unknown) => {};
  const isPending = false;
  return (
    <FormWrapper
      formMethods={formMethods}
      onSubmit={registerUser}
      isPending={isPending}
      ariaLabel="Login form"
      submitButtonLabel={"Continue"}
      submitButtonLoadingLabel={"Loading..."}
    >
      <FormInput
        label={"Email"}
        placeholder={"your@email.com"}
        name="email"
        register={register}
        errors={formMethods.formState.errors}
        disabled={isPending}
      />
      <PasswordInput
        label={"Password"}
        name="password"
        register={register}
        errors={formMethods.formState.errors}
        disabled={isPending}
      />
      <PasswordInput
        label={"Confirm Password"}
        name="confirmPassword"
        register={register}
        errors={formMethods.formState.errors}
        disabled={isPending}
      />
    </FormWrapper>
  );
}
