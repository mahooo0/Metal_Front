import { NewPasswordForm } from "@/features/auth";

import { AuthWrapper } from "@/shared/ui";

export function NewPasswordPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <AuthWrapper
        heading="Update your password"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
        description="Update your password to continue using our platform"
        isShowSocial={false}>
        <NewPasswordForm />
      </AuthWrapper>
    </main>
  );
}
