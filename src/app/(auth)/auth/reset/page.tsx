import { Metadata } from "next";

import ResetPassword from "@/features/reset-password/ui/page";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPasswordRoute() {
  return <ResetPassword />;
}
