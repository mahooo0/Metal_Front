import React from "react";

import CounterpartiesByIdPageClient from "./page.client";

export default async function CounterpartyByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CounterpartiesByIdPageClient id={id} />;
}
