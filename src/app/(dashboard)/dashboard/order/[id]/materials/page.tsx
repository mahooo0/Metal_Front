import React from "react";

import MaterialsPageClient from "./page.client";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <MaterialsPageClient id={id} />;
}
