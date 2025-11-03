"use client";

import React from "react";

import { PlusSquareIcon } from "lucide-react";

import {
  WriteOffFilter,
  type WriteOffFilterData,
  WriteOffTable,
} from "@/features/warehouse/write-off";

import { Button } from "@/shared/ui/button";

export default function WriteOffPageClient() {
  const handleAddMaterial = () => {
    console.log("Add material");
  };

  const handleApplyFilter = (filterData: WriteOffFilterData) => {
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
        <h1 className="text-[#3A4754] text-[32px] font-[700]">
          Списання товару <span className="text-[#B6BDC3] ">(20965)</span>
        </h1>
        <Button variant="balck" size="lg" onClick={handleAddMaterial}>
          <PlusSquareIcon className="w-5 h-5" /> Створити нове
        </Button>
      </div>

      <WriteOffFilter onApply={handleApplyFilter} onReset={handleResetFilter} />

      <WriteOffTable />
    </div>
  );
}
