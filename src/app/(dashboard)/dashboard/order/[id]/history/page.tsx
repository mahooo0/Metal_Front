import React from "react";

import HistoryPageClient from "./page.client";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <HistoryPageClient id={id} />;
}
