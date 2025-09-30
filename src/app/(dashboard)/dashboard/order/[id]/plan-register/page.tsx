import React from "react";

import PlanRegisterPageClient from "./page.client";

export default async function PlanRegisterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PlanRegisterPageClient id={id} />;
}
