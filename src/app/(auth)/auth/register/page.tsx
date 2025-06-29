import { Metadata } from "next";

import { RegisterPage } from "@/widgets/auth";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterRoute() {
  return <RegisterPage />;
}
