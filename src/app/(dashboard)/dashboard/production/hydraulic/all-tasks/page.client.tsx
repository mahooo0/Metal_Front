"use client";

import React from "react";

import AnalyticsLaserFilter from "@/features/analitics-laser/ui/filter";
import { AllTasksTable, ProductionNaw } from "@/features/production";

export default function ProductionLaserAllTasksPageClient() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <ProductionNaw activeTab="Всі задачі" />

      <AnalyticsLaserFilter />

      <AllTasksTable />
    </div>
  );
}
