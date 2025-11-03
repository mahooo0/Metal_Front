"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { ArrowLeftIcon, EllipsisIcon } from "lucide-react";

import {
  AddItemsFilter,
  type AddItemsFilterData,
  WriteOffItemsTable,
  WriteOffStats,
} from "@/features/warehouse/write-off";

import { Button } from "@/shared/ui/button";

export default function WriteOffByIdPageClient({ id }: { id: string }) {
  const router = useRouter();
  const handleBack = () => {
    router.push("/dashboard/warehouse/write-off");
  };

  const handleWriteOff = () => {
    console.log("Write off item:", id);
    // TODO: Implement write off functionality
  };

  const handleContinueLater = () => {
    console.log("Continue later for item:", id);
    // TODO: Implement continue later functionality
  };

  const handleApplyFilter = (filterData: AddItemsFilterData) => {
    console.log("Apply filter:", filterData);
    // TODO: Implement filter functionality
  };

  const handleResetFilter = () => {
    console.log("Reset filter");
    // TODO: Implement reset functionality
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="lg" onClick={handleBack}>
            <ArrowLeftIcon className="w-5 h-5" /> Назад
          </Button>
          <h1 className="text-[#3A4754] text-[32px] font-[700]">
            Списання товару
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-[#6D7A87]">id : {id}</p>
          <p className="text-sm text-[#6D7A87]">Створено Лист. 11</p>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white w-[36px] h-[36px] rounded-full border border-[#B6BDC3] text-[#495969]">
            <EllipsisIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <WriteOffStats
        onWriteOff={handleWriteOff}
        onContinueLater={handleContinueLater}
      />

      <AddItemsFilter onApply={handleApplyFilter} onReset={handleResetFilter} />

      <WriteOffItemsTable />
    </div>
  );
}
