"use client";

import React, { useState } from "react";

import Link from "next/link";

import { EllipsisIcon, PlusSquareIcon } from "lucide-react";

import {
  AddProductDialog,
  AddPurchaseDialog,
  PurchaseFilter,
  type PurchaseFilterData,
  PurchaseTable,
} from "@/features/warehouse/purchase";

import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

export default function PurchasePageClient() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);

  const handleApplyFilter = (filterData: PurchaseFilterData) => {
    console.log("Applied filter:", filterData);
    // TODO: Implement filter logic
  };

  const handleResetFilter = () => {
    console.log("Reset filter");
    // TODO: Implement reset logic
  };

  const handleAddPurchase = (data: {
    supplier: string;
    name: string;
    comment: string;
  }) => {
    console.log("Add purchase:", data);
    // TODO: Implement add purchase logic
    setIsAddDialogOpen(false);
  };

  const handleAddProduct = (data: {
    supplier: string;
    metalThickness: string;
    type: string;
    size: string;
    expectedQuantity: string;
    purchasePrice: string;
    salePrice: string;
  }) => {
    console.log("Add product:", data);
    // TODO: Implement add product logic
    setIsAddProductDialogOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <h1 className="text-[#3A4754] text-[32px] font-[700]">
          Закупки <span className="text-[#B6BDC3] ">(20965)</span>
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="balck"
            size="lg"
            onClick={() => setIsAddDialogOpen(true)}>
            <PlusSquareIcon className="w-5 h-5" /> Додати закупку
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
                <Link href="/dashboard/warehouse/purchase/acsept">
                  Прийняти закупку
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsAddProductDialogOpen(true)}>
                Додати товар
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <PurchaseFilter onApply={handleApplyFilter} onReset={handleResetFilter} />

      <PurchaseTable />

      {/* Add Purchase Dialog */}
      <AddPurchaseDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddPurchase}
      />

      {/* Add Product Dialog */}
      <AddProductDialog
        isOpen={isAddProductDialogOpen}
        onClose={() => setIsAddProductDialogOpen(false)}
        onSave={handleAddProduct}
      />
    </div>
  );
}
