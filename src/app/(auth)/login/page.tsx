import { Routes } from "@/constants/routes";
import LoginForm from "@/features/auth/components/login.form";
import AuthPageWrapper from "@/features/auth/components/page-wrapper";
import { Metadata } from "next";
const metadata: Metadata = {
  title: "Login - Devlinks App",
  description: "Add your details below to get back into the app.",
};
export default function LoginPage() {
  return (
    <AuthPageWrapper>
      <AuthPageWrapper.Header
        title="Login"
        subtitle="Add your details below to get back into the app"
      />
      <LoginForm />
      <AuthPageWrapper.Footer
        text="Already have an account?"
        linkText="Login"
        linkHref={Routes.REGISTER}
      />
    </AuthPageWrapper>
  );
}
