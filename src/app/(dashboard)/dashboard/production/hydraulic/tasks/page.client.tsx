"use client";

import React from "react";

import {
  CurrentTasksTable,
  NewTasksAccordionTable,
  ProductionNaw,
  TimerDisplay,
} from "@/features/production";

export default function ProductionLaserTasksPageClient() {
  return (
    <div className="relative">
      <ProductionNaw activeTab="Задачі в роботі" />
      <CurrentTasksTable />
      <div className="bg-[#FE8867] w-full h-5 rounded-[16px]" />
      <NewTasksAccordionTable />
      <TimerDisplay />
    </div>
  );
}
