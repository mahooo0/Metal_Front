import { ResetPasswordForm } from "@/features/auth";

import { AuthWrapper } from "@/shared/ui";

export function ResetPasswordPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <AuthWrapper
        heading="Reset Password"
        description="Enter your email to reset your password"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login">
        <ResetPasswordForm />
      </AuthWrapper>
    </main>
  );
}
