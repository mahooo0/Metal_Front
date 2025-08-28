import LoginPage from "@/features/login/ui/page";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Login",
};

export default function LoginRoute() {
  return <LoginPage />;
}
