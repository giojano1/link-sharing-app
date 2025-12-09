import { Routes } from "@/constants/routes";
import AuthPageWrapper from "@/featues/auth/components/page-wrapper";

export default function RegisterPage() {
  return (
    <AuthPageWrapper>
      <AuthPageWrapper.Header
        title="Create your account"
        subtitle="Let’s get you started sharing your links!"
      />
      z
      <AuthPageWrapper.Footer
        text="Already have an account?"
        linkText="Login"
        linkHref={Routes.LOGIN}
      />
    </AuthPageWrapper>
  );
}
