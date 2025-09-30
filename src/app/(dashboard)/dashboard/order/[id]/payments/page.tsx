import React from "react";

import PaymentsPageClient from "./page.client";

export default async function PaymentsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <PaymentsPageClient id={id} />
    </div>
  );
}
