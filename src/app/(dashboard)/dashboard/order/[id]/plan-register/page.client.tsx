import React from "react";

import HeaderNav from "@/features/order/ui/header-nav";
import HeaderBar from "@/features/orders/ui/header-bar";
import PlanRegisterTable from "@/features/plan-register/ui/plan-register-table";

export default function PlanRegisterPageClient({ id }: { id: string }) {
  return (
    <div>
      <HeaderNav orderId={id} activeTab="Реєстр планів" />
      <HeaderBar />
      <PlanRegisterTable />
    </div>
  );
}
