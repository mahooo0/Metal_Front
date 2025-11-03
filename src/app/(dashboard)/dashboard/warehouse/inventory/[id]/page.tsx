import React from "react";

import InventoryByIdPageClient from "./page.client";

export default async function InventoryByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <InventoryByIdPageClient id={id} />;
}
