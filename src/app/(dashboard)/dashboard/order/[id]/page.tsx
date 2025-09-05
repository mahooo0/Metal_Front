import React from "react";

import OrderPageClient from "./page.client";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderPageClient id={id} />;
}
