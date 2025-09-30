"use client";

import React, { useState } from "react";

import { ChevronDown, FilePenLine, Trash2 } from "lucide-react";

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

// Types for invoice application dialog
export interface InvoiceApplicationDialogData {
  recipient: string;
  comment: string;
}

export interface InvoiceApplicationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: InvoiceApplicationDialogData) => void;
  onDelete?: () => void;
  initialData?: Partial<InvoiceApplicationDialogData>;
  title?: string;
}

export default function InvoiceApplicationDialog({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData = {},
  title = "Заявка на рахунок",
}: InvoiceApplicationDialogProps) {
  const [formData, setFormData] = useState<InvoiceApplicationDialogData>({
    recipient: "",
    comment: "",
    ...initialData,
  });

  const handleInputChange = (
    field: keyof InvoiceApplicationDialogData,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 17, 0.4) 36.54%, rgba(0, 0, 36, 0.8) 100%)",
        }}
      />
      <DialogContent className="max-w-2xl bg-white rounded-[16px] p-6">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-[#E5E7EB] pb-2 relative">
          <DialogTitle className="flex items-center gap-2 text-[20px] font-bold text-[#3A4754]">
            <FilePenLine className="h-6 w-6" />
            {title}
          </DialogTitle>
          <Button
            variant="ghost"
            onClick={handleDelete}
            className="text-[#6D7A87] absolute top-[102%] right-0">
            <Trash2 className="h-4 w-4" />
            видалити
          </Button>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Company Info Section */}
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="text-lg font-bold text-gray-900">ТОВ &quot;Базис&quot;</div>
            <div className="text-sm text-gray-600">id 4579776</div>
          </div>

          {/* Кому */}
          <div className="space-y-2">
            <Label htmlFor="recipient" className="text-sm font-medium">
              Кому
            </Label>
            <div className="relative">
              <Input
                id="recipient"
                placeholder="input_label"
                value={formData.recipient}
                onChange={e => handleInputChange("recipient", e.target.value)}
                className="bg-white pr-10"
              />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Коментар */}
          <div className="space-y-2">
            <Label htmlFor="comment" className="text-sm font-medium">
              Коментар
            </Label>
            <Textarea
              id="comment"
              placeholder="text_area"
              value={formData.comment}
              onChange={e => handleInputChange("comment", e.target.value)}
              className="bg-white min-h-[100px]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-3 mt-8">
          <Button
            variant="BlackTransparent"
            onClick={onClose}
            className="w-[212px] h-[42px] rounded-[48px]">
            Відмінити
          </Button>
          <Button
            variant="balck"
            onClick={handleSave}
            className="w-[212px] h-[42px] rounded-[48px]">
            Зберегти
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

