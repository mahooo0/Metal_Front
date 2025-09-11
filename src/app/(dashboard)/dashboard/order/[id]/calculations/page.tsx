import React from "react";

import { CalculationsNavbar } from "@/features/calculations/ui/nav-bar";

import CalculationsPageClient from "./page.client";

export default async function CalculationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <CalculationsPageClient id={id} />
    </div>
  );
}
