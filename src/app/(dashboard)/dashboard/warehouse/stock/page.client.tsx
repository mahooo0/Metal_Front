"use client";

import React from "react";

import {
  StockFilter,
  type StockFilterData,
  StockTable,
} from "@/features/warehouse/stock";

export default function StockPageClient() {
  const handleApplyFilter = (filterData: StockFilterData) => {
    console.log("Applied filter:", filterData);
    // TODO: Implement filter logic
  };

  const handleResetFilter = () => {
    console.log("Reset filter");
    // TODO: Implement reset logic
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <h1 className="text-[#3A4754] text-[32px] font-[700]">Залишки</h1>
      </div>

      <StockFilter onApply={handleApplyFilter} onReset={handleResetFilter} />

      <StockTable />
    </div>
  );
}
