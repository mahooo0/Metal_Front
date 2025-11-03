"use client";

import React, { useState } from "react";

import Link from "next/link";

import { EllipsisIcon, SquarePlus } from "lucide-react";

import {
  AddInventoryDialog,
  InventoryFilter,
  type InventoryFilterData,
  InventoryStats,
  InventoryTable,
} from "@/features/warehouse/inventory";

import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

export default function InventoryPageClient() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleApplyFilter = (filterData: InventoryFilterData) => {
    console.log("Applied filter:", filterData);
    // TODO: Implement filter logic
  };

  const handleResetFilter = () => {
    console.log("Reset filter");
    // TODO: Implement reset logic
  };

  const handleAddInventory = (data: { name: string; comment: string }) => {
    console.log("Add inventory:", data);
    // TODO: Implement add inventory logic
    setIsAddDialogOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <h1 className="text-[#3A4754] text-[32px] font-[700]">
          Інвентаризація <span className="text-[#B6BDC3] ">(186479)</span>
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="balck"
            size="lg"
            onClick={() => setIsAddDialogOpen(true)}>
            <SquarePlus className="w-5 h-5" /> Додати інвентар
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="bg-white w-[36px] h-[36px] rounded-full border border-[#B6BDC3] text-[#495969]">
                <EllipsisIcon className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/dashboard/warehouse/inventory/create">
                  Створення закупки
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <InventoryStats />

      <InventoryFilter
        onApply={handleApplyFilter}
        onReset={handleResetFilter}
      />

      <InventoryTable />

      {/* Add Inventory Dialog */}
      <AddInventoryDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddInventory}
      />
    </div>
  );
}
