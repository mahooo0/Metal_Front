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
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import type { WriteOffItem } from "../types/write-off.types";

interface AddSupplierDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  onDelete?: () => void;
  writeOffData?: WriteOffItem | null;
}

export default function AddSupplierDialog({
  isOpen,
  onClose,
  onSave,
  onDelete,
  writeOffData,
}: AddSupplierDialogProps) {
  const [name, setName] = useState("");

  React.useEffect(() => {
    if (writeOffData && isOpen) {
      // You can set initial data here if needed
      setName("");
    }
  }, [writeOffData, isOpen]);

  const handleSave = () => {
    onSave(name);
    handleClose();
  };

  const handleClose = () => {
    setName("");
    onClose();
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
    handleClose();
  };

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
            Додати постачальника
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
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Назва</Label>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="input_label"
              className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
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
              onClick={handleSave}
              className="w-1/2 h-[42px] rounded-[48px]">
              Продовжити
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
