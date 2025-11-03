"use client";

import React from "react";

import LaserProductionTable from "@/features/production/ui/laser-production-table";
import ProductionNaw from "@/features/production/ui/naw";

export default function ProductionLaserPageClient() {
  return (
    <div>
      <ProductionNaw activeTab="Нові задачі" />
      <LaserProductionTable />
    </div>
  );
}
