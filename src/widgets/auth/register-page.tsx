import { RegisterForm } from "@/features/auth";

import { AuthWrapper } from "@/shared/ui";

export function RegisterPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <AuthWrapper
        heading="Create an account"
        backButtonLabel="Already have an account? Login"
        backButtonHref="/auth/login"
        description="Create your account to continue using our platform"
        isShowSocial>
        <RegisterForm />
      </AuthWrapper>
    </main>
  );
}
