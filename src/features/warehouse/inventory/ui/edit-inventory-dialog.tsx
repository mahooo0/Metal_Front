"use client";

import React from "react";

import { FilePenLine, Trash2, TriangleAlert } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/shared/ui/dialog";

import type { InventoryItem } from "../types/inventory.types";

interface EditInventoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onDelete?: () => void;
  inventoryData?: InventoryItem | null;
}

export default function EditInventoryDialog({
  isOpen,
  onClose,
  onSave,
  onDelete,
  inventoryData,
}: EditInventoryDialogProps) {
  const handleSave = () => {
    onSave();
    onClose();
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
    onClose();
  };

  // Calculate surplus and deficiency
  const surplus = 10; // Replace with actual calculation
  const deficiency = 10; // Replace with actual calculation
  const surplusAmount = 1200; // Replace with actual calculation
  const deficiencyAmount = 1200; // Replace with actual calculation
  const difference = 149785000; // Replace with actual calculation

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 17, 0.4) 36.54%, rgba(0, 0, 36, 0.8) 100%)",
        }}
      />
      <DialogContent className="max-w-2xl bg-white rounded-lg shadow-lg">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-[#E5E7EB] pb-2 relative">
          <DialogTitle className="flex items-center gap-2 text-[20px] font-bold text-[#3A4754]">
            <FilePenLine className="h-6 w-6" />
            Оновити залишки
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="flex items-center gap-2 text-[#B6BDC3] hover:text-red-600 hover:bg-transparent absolute right-0 top-0">
            <Trash2 className="h-4 w-4" />
            <span className="uppercase text-xs font-medium">видалити</span>
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Surplus Card */}
            <div className="bg-[#E3F2FD] border border-[#D2EAFE] rounded-[8px] shadow-xl py-6 px-4 space-y-3">
              <div className="flex items-center  gap-1">
                <span className="text-[#495969] text-sm">Надлишок:</span>
                <span className="text-[#1E293B] text-lg font-semibold">
                  {surplus} одиниць
                </span>
              </div>
              <div className="flex items-center  gap-1">
                <span className="text-[#495969] text-sm">Сума:</span>
                <span className="text-[#1E293B] text-lg font-semibold">
                  {surplusAmount}₴
                </span>
              </div>
            </div>

            {/* Deficiency Card */}
            <div className="bg-[#FFF3F0] border border-[#FFCFC2] rounded-[8px] shadow-xl py-6 px-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[#495969] text-sm">Нестача:</span>
                <span className="text-[#1E293B] text-lg font-semibold">
                  {deficiency} одиниць
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#495969] text-sm">Amount:</span>
                <span className="text-[#1E293B] text-lg font-semibold">
                  {deficiencyAmount}₴
                </span>
              </div>
            </div>
          </div>

          {/* Difference Card */}
          <div className="bg-white shadow-xl rounded-[16px] p-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="text-[#495969] text-base">Різниця:</span>
              <span className="text-[#1E293B] text-2xl font-bold">
                {difference.toLocaleString()}₴
              </span>
            </div>
          </div>

          {/* Warning Message */}
          <div className="  flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-[#E8DDFF] flex items-center justify-center">
                <TriangleAlert className="h-6 w-6 text-[#7C3AED]" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[#7C3AED] text-base font-semibold mb-1">
                Ви дійсно хочете оновити залишки?
              </p>
              <p className="text-[#7C3AED] text-sm">
                після збереження редагування буде недоступне
              </p>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between gap-3 mt-8">
            <Button
              variant="BlackTransparent"
              onClick={onClose}
              className="w-1/2 h-[42px] rounded-[48px]">
              Відмінити
            </Button>
            <Button
              variant="balck"
              onClick={handleSave}
              className="w-1/2 h-[42px] rounded-[48px]">
              Зберегти
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
