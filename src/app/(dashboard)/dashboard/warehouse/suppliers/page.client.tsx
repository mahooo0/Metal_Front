"use client";

import React from "react";

import { PlusSquareIcon } from "lucide-react";

import { StockFilter, type StockFilterData } from "@/features/warehouse/stock";
import { SuppliersTable } from "@/features/warehouse/suppliers";

import { Button } from "@/shared/ui";

export default function SuppliersPageClient() {
  const handleApplyFilter = (_filterData: StockFilterData) => {
    // TODO: Implement filter logic
  };

  const handleResetFilter = () => {
    // TODO: Implement reset logic
  };
  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <h1 className="text-[#3A4754] text-[32px] font-[700]">
          Постачальники <span className="text-[#181e24] ">(20965)</span>
        </h1>
        <Button variant="balck" size="lg">
          <PlusSquareIcon className="w-5 h-5" /> Додати постачальника
        </Button>
      </div>{" "}
      <StockFilter onApply={handleApplyFilter} onReset={handleResetFilter} />
      <SuppliersTable />
    </div>
  );
}
