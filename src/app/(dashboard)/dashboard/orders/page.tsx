import React, { Suspense } from "react";

import OrdersPageClient from "./page.client";

export default function OrdersPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OrdersPageClient />
      </Suspense>
    </div>
  );
}
