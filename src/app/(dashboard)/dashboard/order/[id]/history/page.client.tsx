import React from "react";

import { HistoryLogs } from "@/features/history/ui";
import HeaderNav from "@/features/order/ui/header-nav";
import PaymentsFilter from "@/features/payments/ui/filter";

export default function HistoryPageClient({ id }: { id: string }) {
  return (
    <div>
      <HeaderNav orderId={id} activeTab="Історія" />
      <PaymentsFilter />
      <HistoryLogs />
    </div>
  );
}
