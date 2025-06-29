import { RegisterForm } from "@/features/auth";
import { AuthWrapper } from "@/shared/ui";

export function RegisterPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <AuthWrapper heading="Register" description="Create your account">
        <RegisterForm />
      </AuthWrapper>
    </main>
  );
}