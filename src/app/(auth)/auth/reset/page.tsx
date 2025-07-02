import { Metadata } from "next";

import { ResetPasswordPage } from "@/widgets/auth/reset-page";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPasswordRoute() {
  return <ResetPasswordPage />;
}
