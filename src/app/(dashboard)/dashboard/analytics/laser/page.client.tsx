"use client";

import React from "react";

import {
  LaserAnalyticsAccordionTable,
  LaserAnalyticsTable,
} from "@/features/analitics-laser";
import AnalyticsLaserFilter from "@/features/analitics-laser/ui/filter";
import FinanceNaw from "@/features/analytics/ui/finance-naw";
import Widget16 from "@/features/dashboard/ui/widgets/4-2/widget16";

import { TimePredictionCard } from "@/shared/ui";

export default function AnalyticsLaserPageClient() {
  const handleViewOrder = () => {
    // Handle view order action
    // TODO: Implement view order functionality
  };

  return (
    <div className="w-full h-full grid grid-cols-10 gap-4">
      <div className="col-span-10">
        <FinanceNaw activeTab="Лазер" />
      </div>
      <div className="col-span-4">
        <AnalyticsLaserFilter />
      </div>
      <div className="col-span-4 bg-white rounded-[16px] ">
        <Widget16 />
      </div>
      <div className="col-span-2">
        <TimePredictionCard
          hours={0}
          minutes={57}
          seconds={11}
          onViewOrder={handleViewOrder}
        />
      </div>

      <div className="col-span-10">
        <LaserAnalyticsTable />
      </div>
      <div className="col-span-10 bg-[#79E2C6] rounded-[16px] h-7 " />
      <div className="col-span-10">
        <LaserAnalyticsAccordionTable />
      </div>
    </div>
  );
}
