"use client";

import React, { useState } from "react";

import { FilePenLine, Trash2 } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";

import type { WriteOffItem } from "../types/write-off.types";

interface ConfirmWriteOffDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (comment: string) => void;
  onDelete?: () => void;
  writeOffData?: WriteOffItem | null;
}

export default function ConfirmWriteOffDialog({
  isOpen,
  onClose,
  onConfirm,
  onDelete,
  writeOffData,
}: ConfirmWriteOffDialogProps) {
  const [comment, setComment] = useState("");

  const handleConfirm = () => {
    onConfirm(comment);
    handleClose();
  };

  const handleClose = () => {
    setComment("");
    onClose();
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
    handleClose();
  };

  // Extract quantity and amount from writeOffData
  const quantity = writeOffData?.quantity || "10";
  const amount = writeOffData?.amount || "146900";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
            Підтвердити списання
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
          {/* Summary Card */}
          <div className="bg-[#E3F2FD] border border-[#D2EAFE] rounded-[8px] shadow-xl py-6 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[#495969] text-base">Кількість:</span>
                <span className="text-[#1E293B] text-lg font-semibold">
                  {quantity} одиниць
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#495969] text-base">Сума:</span>
                <span className="text-[#1E293B] text-lg font-semibold">
                  {amount}₴
                </span>
              </div>
            </div>
          </div>

          {/* Comment Field */}
          <div className="space-y-2">
            <Label htmlFor="comment">Коментар</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="text_area"
              className="min-h-[100px] w-full rounded-lg bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm resize-none"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between gap-3 mt-8">
            <Button
              variant="BlackTransparent"
              onClick={handleClose}
              className="w-1/2 h-[42px] rounded-[48px]">
              Відмінити
            </Button>
            <Button
              variant="balck"
              onClick={handleConfirm}
              className="w-1/2 h-[42px] rounded-[48px]">
              Продовжити
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
