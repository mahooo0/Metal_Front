"use client";

import React, { useState } from "react";

import { FilePenLine, Trash2, X } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import { mockSuppliers } from "../../suppliers/mocks/suppliers.mock";

interface AddProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    supplier: string;
    metalThickness: string;
    type: string;
    size: string;
    expectedQuantity: string;
    purchasePrice: string;
    salePrice: string;
  }) => void;
  onDelete?: () => void;
}

export default function AddProductDialog({
  isOpen,
  onClose,
  onSave,
  onDelete,
}: AddProductDialogProps) {
  const [formData, setFormData] = useState({
    supplier: "",
    metalThickness: "",
    type: "",
    size: "",
    expectedQuantity: "",
    purchasePrice: "",
    salePrice: "",
  });

  const handleInputChange = (
    field:
      | "supplier"
      | "metalThickness"
      | "type"
      | "size"
      | "expectedQuantity"
      | "purchasePrice"
      | "salePrice",
    value: string
  ) => {
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
      supplier: "",
      metalThickness: "",
      type: "",
      size: "",
      expectedQuantity: "",
      purchasePrice: "",
      salePrice: "",
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
            Додати товар
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

            {/* Metal Thickness Select */}
            <div className="space-y-2">
              <Label htmlFor="metalThickness">Товщина металу</Label>
              <Select
                value={formData.metalThickness}
                onValueChange={value =>
                  handleInputChange("metalThickness", value)
                }>
                <SelectTrigger
                  id="metalThickness"
                  className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="input_label" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1mm">1 мм</SelectItem>
                  <SelectItem value="2mm">2 мм</SelectItem>
                  <SelectItem value="3mm">3 мм</SelectItem>
                  <SelectItem value="4mm">4 мм</SelectItem>
                  <SelectItem value="5mm">5 мм</SelectItem>
                  <SelectItem value="6mm">6 мм</SelectItem>
                  <SelectItem value="8mm">8 мм</SelectItem>
                  <SelectItem value="10mm">10 мм</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type Select */}
            <div className="space-y-2">
              <Label htmlFor="type">Тип</Label>
              <Select
                value={formData.type}
                onValueChange={value => handleInputChange("type", value)}>
                <SelectTrigger
                  id="type"
                  className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="input_label" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Гарячекатана сталь">
                    Гарячекатана сталь
                  </SelectItem>
                  <SelectItem value="Холоднокатана сталь">
                    Холоднокатана сталь
                  </SelectItem>
                  <SelectItem value="Нержавіюча сталь">
                    Нержавіюча сталь
                  </SelectItem>
                  <SelectItem value="Оцинкована сталь">
                    Оцинкована сталь
                  </SelectItem>
                  <SelectItem value="Алюміній">Алюміній</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Size Input */}
            <div className="space-y-2">
              <Label htmlFor="size">Розмір</Label>
              <Input
                id="size"
                value={formData.size}
                onChange={e => handleInputChange("size", e.target.value)}
                placeholder="input_label"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>

            {/* Expected Quantity Select */}
            <div className="space-y-2">
              <Label htmlFor="expectedQuantity">Очікувана кількість</Label>
              <Select
                value={formData.expectedQuantity}
                onValueChange={value =>
                  handleInputChange("expectedQuantity", value)
                }>
                <SelectTrigger
                  id="expectedQuantity"
                  className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="input_label" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 шт</SelectItem>
                  <SelectItem value="20">20 шт</SelectItem>
                  <SelectItem value="50">50 шт</SelectItem>
                  <SelectItem value="100">100 шт</SelectItem>
                  <SelectItem value="200">200 шт</SelectItem>
                  <SelectItem value="500">500 шт</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Purchase Price Select */}
            <div className="space-y-2">
              <Label htmlFor="purchasePrice">Ціна закупки</Label>
              <Select
                value={formData.purchasePrice}
                onValueChange={value =>
                  handleInputChange("purchasePrice", value)
                }>
                <SelectTrigger
                  id="purchasePrice"
                  className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="input_label" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100 грн</SelectItem>
                  <SelectItem value="200">200 грн</SelectItem>
                  <SelectItem value="500">500 грн</SelectItem>
                  <SelectItem value="1000">1000 грн</SelectItem>
                  <SelectItem value="2000">2000 грн</SelectItem>
                  <SelectItem value="5000">5000 грн</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sale Price Select */}
            <div className="space-y-2">
              <Label htmlFor="salePrice">Ціна продажу</Label>
              <Select
                value={formData.salePrice}
                onValueChange={value => handleInputChange("salePrice", value)}>
                <SelectTrigger
                  id="salePrice"
                  className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="input_label" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="150">150 грн</SelectItem>
                  <SelectItem value="300">300 грн</SelectItem>
                  <SelectItem value="750">750 грн</SelectItem>
                  <SelectItem value="1500">1500 грн</SelectItem>
                  <SelectItem value="3000">3000 грн</SelectItem>
                  <SelectItem value="7500">7500 грн</SelectItem>
                </SelectContent>
              </Select>
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
