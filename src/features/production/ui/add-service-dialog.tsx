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

// Types for add service dialog
export interface AddServiceDialogData {
  partName: string;
  workName: string;
  quantity: string;
  workVolume: string;
  unitOfMeasure: string;
  pricePerItem: string;
  totalAmount: string;
  productionTime: string;
  actualPayment: string;
  comment: string;
}

export interface AddServiceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AddServiceDialogData) => void;
  onDelete?: () => void;
  initialData?: Partial<AddServiceDialogData>;
  title?: string;
}

export default function AddServiceDialog({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData = {},
  title = "Додати послугу",
}: AddServiceDialogProps) {
  const [formData, setFormData] = useState<AddServiceDialogData>({
    partName: "",
    workName: "",
    quantity: "",
    workVolume: "",
    unitOfMeasure: "",
    pricePerItem: "",
    totalAmount: "",
    productionTime: "",
    actualPayment: "",
    comment: "",
    ...initialData,
  });

  const handleInputChange = (
    field: keyof AddServiceDialogData,
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
          {/* Найменування деталі */}
          <div className="space-y-2">
            <Label htmlFor="partName" className="text-sm font-medium">
              Найменування деталі
            </Label>
            <Input
              id="partName"
              placeholder="input_label"
              value={formData.partName}
              onChange={e => handleInputChange("partName", e.target.value)}
              className="bg-white"
            />
          </div>

          {/* Найменування робіт (опис) */}
          <div className="space-y-2">
            <Label htmlFor="workName" className="text-sm font-medium">
              Найменування робіт (опис)
            </Label>
            <Input
              id="workName"
              placeholder="input_label"
              value={formData.workName}
              onChange={e => handleInputChange("workName", e.target.value)}
              className="bg-white"
            />
          </div>

          {/* Кількість, шт. і Об'єм робіт */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-sm font-medium">
                Кількість, шт.
              </Label>
              <Input
                id="quantity"
                placeholder="input_label"
                value={formData.quantity}
                onChange={e => handleInputChange("quantity", e.target.value)}
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workVolume" className="text-sm font-medium">
                Об&apos;єм робіт
              </Label>
              <Input
                id="workVolume"
                placeholder="input_label"
                value={formData.workVolume}
                onChange={e => handleInputChange("workVolume", e.target.value)}
                className="bg-white"
              />
            </div>
          </div>

          {/* Од. виміру (м2, шт, м.п.) і Ціна за 1 деталь грн з ПДВ */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unitOfMeasure" className="text-sm font-medium">
                Од. виміру (м2, шт, м.п.)
              </Label>
              <Input
                id="unitOfMeasure"
                placeholder="input_label"
                value={formData.unitOfMeasure}
                onChange={e =>
                  handleInputChange("unitOfMeasure", e.target.value)
                }
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pricePerItem" className="text-sm font-medium">
                Ціна за 1 деталь грн з ПДВ
              </Label>
              <Input
                id="pricePerItem"
                placeholder="input_label"
                value={formData.pricePerItem}
                onChange={e =>
                  handleInputChange("pricePerItem", e.target.value)
                }
                className="bg-white"
              />
            </div>
          </div>

          {/* Сума, грн з ПДВ і Стр. виг. раб.днів */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalAmount" className="text-sm font-medium">
                Сума, грн з ПДВ
              </Label>
              <Input
                id="totalAmount"
                placeholder="input_label"
                value={formData.totalAmount}
                onChange={e => handleInputChange("totalAmount", e.target.value)}
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productionTime" className="text-sm font-medium">
                Стр. виг. раб.днів
              </Label>
              <Input
                id="productionTime"
                placeholder="input_label"
                value={formData.productionTime}
                onChange={e =>
                  handleInputChange("productionTime", e.target.value)
                }
                className="bg-white"
              />
            </div>
          </div>

          {/* Фактична оплата, грн */}
          <div className="space-y-2">
            <Label htmlFor="actualPayment" className="text-sm font-medium">
              Фактична оплата, грн
            </Label>
            <Input
              id="actualPayment"
              placeholder="input_label"
              value={formData.actualPayment}
              onChange={e => handleInputChange("actualPayment", e.target.value)}
              className="bg-white"
            />
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
              className="bg-white max-h-[100px] min-h-[100px]"
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
