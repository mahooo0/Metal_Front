"use client";

import React, { useState } from "react";

import { FilePenLine, Pencil, Trash2, X } from "lucide-react";

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

// Types for edit dialog
export interface EditDialogData {
  partName: string;
  materialThickness: string;
  quantity: string;
  cutLength: string;
  piercingPoints: string;
  cutLengthWithPiercing: string;
  materialThicknessMm: string;
  metalPrice: string;
  actualPartWeight: string;
  bends: string;
}

export interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EditDialogData) => void;
  onDelete?: () => void;
  initialData?: Partial<EditDialogData>;
  title?: string;
}

export default function EditDialog({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData = {},
  title = "Редагувати",
}: EditDialogProps) {
  const [formData, setFormData] = useState<EditDialogData>({
    partName: "",
    materialThickness: "",
    quantity: "",
    cutLength: "",
    piercingPoints: "",
    cutLengthWithPiercing: "",
    materialThicknessMm: "",
    metalPrice: "",
    actualPartWeight: "",
    bends: "",
    ...initialData,
  });

  const handleInputChange = (field: keyof EditDialogData, value: string) => {
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
              className=" bg-white"
            />
          </div>

          {/* Матеріал товщина */}
          <div className="space-y-2">
            <Label htmlFor="materialThickness" className="text-sm font-medium">
              Матеріал товщина
            </Label>
            <Input
              id="materialThickness"
              placeholder="input_label"
              value={formData.materialThickness}
              onChange={e =>
                handleInputChange("materialThickness", e.target.value)
              }
              className=" bg-white"
            />
          </div>

          {/* Кількість, шт. і Довжина різу, мп */}
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
                className=" bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cutLength" className="text-sm font-medium">
                Довжина різу, мп
              </Label>
              <Input
                id="cutLength"
                placeholder="input_label"
                value={formData.cutLength}
                onChange={e => handleInputChange("cutLength", e.target.value)}
                className=" bg-white"
              />
            </div>
          </div>

          {/* Точки врізання, шт і Довжина різу+т.в. мп */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="piercingPoints" className="text-sm font-medium">
                Точки врізання, шт
              </Label>
              <Input
                id="piercingPoints"
                placeholder="input_label"
                value={formData.piercingPoints}
                onChange={e =>
                  handleInputChange("piercingPoints", e.target.value)
                }
                className=" bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="cutLengthWithPiercing"
                className="text-sm font-medium">
                Довжина різу+т.в. мп
              </Label>
              <Input
                id="cutLengthWithPiercing"
                placeholder="input_label"
                value={formData.cutLengthWithPiercing}
                onChange={e =>
                  handleInputChange("cutLengthWithPiercing", e.target.value)
                }
                className=" bg-white"
              />
            </div>
          </div>

          {/* Товщина матеріалу, мм. і Ціна металу, грн/кг */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="materialThicknessMm"
                className="text-sm font-medium">
                Товщина матеріалу, мм.
              </Label>
              <Input
                id="materialThicknessMm"
                placeholder="input_label"
                value={formData.materialThicknessMm}
                onChange={e =>
                  handleInputChange("materialThicknessMm", e.target.value)
                }
                className=" bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metalPrice" className="text-sm font-medium">
                Ціна металу, грн/кг
              </Label>
              <Input
                id="metalPrice"
                placeholder="input_label"
                value={formData.metalPrice}
                onChange={e => handleInputChange("metalPrice", e.target.value)}
                className=" bg-white"
              />
            </div>
          </div>

          {/* Вага деталей факт. кг і Загинів (1-1000мм) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="actualPartWeight" className="text-sm font-medium">
                Вага деталей факт. кг
              </Label>
              <Input
                id="actualPartWeight"
                placeholder="input_label"
                value={formData.actualPartWeight}
                onChange={e =>
                  handleInputChange("actualPartWeight", e.target.value)
                }
                className=" bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bends" className="text-sm font-medium">
                Загинів (1-1000мм)
              </Label>
              <Input
                id="bends"
                placeholder="input_label"
                value={formData.bends}
                onChange={e => handleInputChange("bends", e.target.value)}
                className=" bg-white"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-3 mt-8">
          <Button
            variant="BlackTransparent"
            onClick={onClose}
            className=" w-[212px] h-[42px] rounded-[48px]">
            Відмінити
          </Button>
          <Button
            variant="balck"
            onClick={handleSave}
            className=" w-[212px] h-[42px] rounded-[48px]">
            Зберегти
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
