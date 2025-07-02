import { Metadata } from "next";

import { VerificationPage } from "@/views/verification";

export const metadata: Metadata = {
  title: "New Verification",
};

export default function NewVerificationPage() {
  return <VerificationPage />;
}
