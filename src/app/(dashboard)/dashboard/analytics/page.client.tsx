"use client";

import React from "react";

import EventCalendarComponent from "@/features/analytics/ui/event-calendar";
import AnalyticsFilter from "@/features/analytics/ui/filter";
import FinanceNaw from "@/features/analytics/ui/finance-naw";
import TuskList from "@/features/analytics/ui/tusk-list";

export default function AnalyticsPageClient() {
  return (
    <div className="w-full h-full grid grid-cols-12 gap-4">
      <div className="col-span-12">
        <FinanceNaw activeTab="Всі замовлення" />
      </div>

      <div className="col-span-2 flex flex-col gap-4">
        <AnalyticsFilter />
        <TuskList />
      </div>
      <div className="col-span-10">
        <EventCalendarComponent />
      </div>
    </div>
  );
}
