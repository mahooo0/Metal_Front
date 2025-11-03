"use client";

import React, { useState } from "react";

import { SquarePlus } from "lucide-react";

import { AddAccountDialog, FinanceTable, InfoBar } from "@/features/finance";
import FinanceFilter from "@/features/finance/ui/filter";

import { Button } from "@/shared/ui/button";

export default function FinancePlanningPageClient() {
  const [isAddAccountDialogOpen, setIsAddAccountDialogOpen] = useState(false);

  const handleAddAccount = (_data: {
    counterparty: string;
    accountNumber: string;
    amount: string;
    type: string;
    paymentType: string;
    orderNumber: string;
    paymentMethod: string;
    comment: string;
  }) => {
    // TODO: Implement save account logic
    // console.log("New account data:", _data);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <h1 className="text-[#3A4754] text-[32px] font-[700]">
          Рух коштів компанії{" "}
        </h1>
        <Button
          variant="balck"
          size="lg"
          onClick={() => setIsAddAccountDialogOpen(true)}>
          <SquarePlus className="w-5 h-5" /> Створити новий рахунок
        </Button>
      </div>

      {/* Financial Info Cards */}
      <div className="mb-5">
        <InfoBar />
      </div>

      {/* Finance Filter */}
      <FinanceFilter />

      {/* Finance Table */}
      <FinanceTable />

      {/* Add Account Dialog */}
      <AddAccountDialog
        isOpen={isAddAccountDialogOpen}
        onClose={() => setIsAddAccountDialogOpen(false)}
        onSave={handleAddAccount}
      />
    </div>
  );
}
