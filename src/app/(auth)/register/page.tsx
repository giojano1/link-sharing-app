import { Routes } from "@/constants/routes";
import AuthPageWrapper from "@/features/auth/components/page-wrapper";
import RegisterForm from "@/features/auth/components/register.form";

export default function RegisterPage() {
  return (
    <AuthPageWrapper>
      <AuthPageWrapper.Header
        title="Create your account"
        subtitle="Let’s get you started sharing your links!"
      />
      <RegisterForm />
      <AuthPageWrapper.Footer
        text="Already have an account?"
        linkText="Login"
        linkHref={Routes.LOGIN}
      />
    </AuthPageWrapper>
  );
}
