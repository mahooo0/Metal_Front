"use client";

import React from "react";

import { useQueryState } from "nuqs";

import HeaderNav from "@/features/order/ui/header-nav";
import HeaderBar from "@/features/orders/ui/header-bar";
import {
  BendingTable,
  HydraulicTable,
  ProductionTable,
} from "@/features/production/ui";

export default function ProductionPageClient({ id }: { id: string }) {
  const [table] = useQueryState("table", {
    defaultValue: "laser",
  });
  return (
    <div>
      <HeaderNav orderId={id} activeTab="Виробництво" />
      <HeaderBar />
      {table === "laser" && <ProductionTable />}
      {table === "bending" && <BendingTable />}
      {table === "hydraulic" && <HydraulicTable />}
    </div>
  );
}
