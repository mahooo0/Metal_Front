"use client";

import React, { useState } from "react";

import { FilePenLine } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";

import { mockSuppliers } from "../../suppliers/mocks/suppliers.mock";
import type { PurchaseItem } from "../types/purchase.types";

interface EditPurchaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { supplier: string; comment: string }) => void;
  initialData?: PurchaseItem | null;
}

export default function EditPurchaseDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
}: EditPurchaseDialogProps) {
  const [formData, setFormData] = useState({
    supplier: initialData?.supplier || "",
    comment: initialData?.comment || "",
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        supplier: initialData.supplier || "",
        comment: initialData.comment || "",
      });
    }
  }, [initialData]);

  const handleInputChange = (field: "supplier" | "comment", value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

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
            Редагувати постачальника
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-4">
            {/* Supplier Select */}
            <div className="space-y-2">
              <Label htmlFor="supplier">Постачальник</Label>
              <Select
                value={formData.supplier}
                onValueChange={value => handleInputChange("supplier", value)}>
                <SelectTrigger
                  id="supplier"
                  className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="input_label" />
                </SelectTrigger>
                <SelectContent>
                  {mockSuppliers.map(supplier => (
                    <SelectItem key={supplier.id} value={supplier.name}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
