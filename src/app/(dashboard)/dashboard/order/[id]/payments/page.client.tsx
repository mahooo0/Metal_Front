import React from "react";

import HeaderNav from "@/features/order/ui/header-nav";
import PaymentsFilter from "@/features/payments/ui/filter";
import InfoBar from "@/features/payments/ui/info-bar";
import PaymentsTable from "@/features/payments/ui/payments-table";

export default function PaymentsPageClient({ id }: { id: string }) {
  return (
    <div className="mt-5">
      <HeaderNav orderId={id} activeTab="Оплати" />

      <InfoBar />
      <PaymentsFilter />

      <PaymentsTable />
    </div>
  );
}
