"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { ArrowLeftIcon, EllipsisIcon } from "lucide-react";

import {
  InventoryTable,
  SupplierSelect,
  type SupplierSelectData,
} from "@/features/warehouse/inventory";

import { Button } from "@/shared/ui/button";

export default function InventoryCreatePageClient() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/dashboard/warehouse/inventory");
  };

  const handleSave = (data: SupplierSelectData) => {
    console.log("Save supplier:", data);
    // TODO: Implement save functionality
  };

  const handleCreatePurchaseRequest = () => {
    console.log("Create purchase request");
    // TODO: Implement create purchase request functionality
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
            Створення закупки
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-[#6D7A87]">Створено Лист. 11</p>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white w-[36px] h-[36px] rounded-full border border-[#B6BDC3] text-[#495969]">
            <EllipsisIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Supplier Selection */}
      <SupplierSelect
        onSave={handleSave}
        onCreatePurchaseRequest={handleCreatePurchaseRequest}
      />

      {/* Inventory Table */}
      <InventoryTable />
    </div>
  );
}
