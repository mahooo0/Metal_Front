"use client";

import React, { useState } from "react";

import { SquarePlus } from "lucide-react";

import {
  AddPlanDialog,
  PlanRegisterFilter,
  PlanRegisterTable,
} from "@/features/plan-register/ui";

import { Button } from "@/shared/ui/button";

export default function PlanRegisterPageClient() {
  const [isAddPlanDialogOpen, setIsAddPlanDialogOpen] = useState(false);

  const handleOpenAddPlanDialog = () => {
    setIsAddPlanDialogOpen(true);
  };

  const handleCloseAddPlanDialog = () => {
    setIsAddPlanDialogOpen(false);
  };

  const handleSavePlan = (_data: {
    customer: string;
    orderNumber: string;
    planNumber: string;
    metalGrade: string;
    metalThickness: string;
  }) => {
    // Handle save logic here
    // TODO: Implement save functionality
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <h1 className="text-[#3A4754] text-[32px] font-[700]">
          Реєстр планів <span className="text-[#B6BDC3] ">(205)</span>
        </h1>
        <Button variant="balck" size="lg" onClick={handleOpenAddPlanDialog}>
          <SquarePlus className="w-5 h-5" /> Додати новий
        </Button>
      </div>
      <PlanRegisterFilter />
      <PlanRegisterTable />

      <AddPlanDialog
        isOpen={isAddPlanDialogOpen}
        onClose={handleCloseAddPlanDialog}
        onSave={handleSavePlan}
      />
    </div>
  );
}
