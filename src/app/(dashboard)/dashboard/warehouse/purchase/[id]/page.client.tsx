"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { ArrowLeftIcon, EllipsisIcon } from "lucide-react";

import {
  PurchaseDetailSearch,
  PurchaseDetailTable,
  PurchaseInfoCards,
} from "@/features/warehouse/purchase";

import { Button } from "@/shared/ui/button";

export default function PurchaseByIdPageClient({ id }: { id: string }) {
  const router = useRouter();

  const handleBack = () => {
    router.push("/dashboard/warehouse/purchase");
  };

  const handleSearch = (searchTerm: string) => {
    console.log("Search:", searchTerm);
    // TODO: Implement search functionality
  };

  const handleFilter = () => {
    console.log("Filter clicked");
    // TODO: Implement filter functionality
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="lg" onClick={handleBack}>
            <ArrowLeftIcon className="w-5 h-5" /> Назад
          </Button>
          <h1 className="text-[#3A4754] text-[32px] font-[700]">
            Закупка <span className="text-[#B6BDC3] ">(186479)</span>
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
      <div className="bg-white rounded-[16px] p-6 mt-5">
        {/* Info Cards */}
        <PurchaseInfoCards />

        {/* Search and Filter */}
        <PurchaseDetailSearch onSearch={handleSearch} onFilter={handleFilter} />
      </div>

      {/* Purchase Detail Table */}
      <PurchaseDetailTable />
    </div>
  );
}
