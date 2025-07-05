import { Metadata } from "next";

import { NewPasswordPage } from "@/widgets/auth";

export const metadata: Metadata = {
  title: "New Password",
  description: "New Password",
};

export default function NewPassword() {
  return <NewPasswordPage />;
}
