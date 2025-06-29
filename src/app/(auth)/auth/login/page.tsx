import { Metadata } from "next";

import { LoginPage } from "@/widgets/auth";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginRoute() {
  return <LoginPage />;
}
