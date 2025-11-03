"use client";

import React from "react";

import EventCalendarComponent from "@/features/analytics/ui/event-calendar";
import AnalyticsFilter from "@/features/analytics/ui/filter";
import FinanceNaw from "@/features/analytics/ui/finance-naw";
import TuskList from "@/features/analytics/ui/tusk-list";
import Widget11 from "@/features/dashboard/ui/widgets/2-3/widget11";

export default function FinanceCalendarPageClient() {
  return (
    <div className="w-full h-full grid grid-cols-12 gap-4">
      <div className="col-span-2 flex flex-col gap-4">
        {/* <AnalyticsFilter /> */}
        <div className="bg-white rounded-[16px] ">
          <Widget11 />
        </div>
        <TuskList />
      </div>
      <div className="col-span-10">
        <EventCalendarComponent />
      </div>
    </div>
  );
}
