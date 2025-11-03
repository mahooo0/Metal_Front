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
import { Textarea } from "@/shared/ui/textarea";

interface AddInventoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; comment: string }) => void;
  onDelete?: () => void;
}

export default function AddInventoryDialog({
  isOpen,
  onClose,
  onSave,
  onDelete,
}: AddInventoryDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
  });

  const handleInputChange = (field: "name" | "comment", value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: "",
      comment: "",
    });
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
            Додати інвентаризацію
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
          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-4">
            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name">Назва</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => handleInputChange("name", e.target.value)}
                placeholder="input_label"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>

            {/* Comment Textarea */}
            <div className="space-y-2">
              <Label htmlFor="comment">Коментар</Label>
              <Textarea
                id="comment"
                value={formData.comment}
                onChange={e => handleInputChange("comment", e.target.value)}
                placeholder="text_area"
                className="min-h-[100px] w-full rounded-lg bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm resize-none"
              />
            </div>
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
              Зберегти
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
