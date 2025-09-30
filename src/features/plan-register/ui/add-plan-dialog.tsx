"use client";

import React, { useState } from "react";

import { FilePenLine, Trash2 } from "lucide-react";

import { FileUploadSection } from "@/features/order/ui/file-upload-section";

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

interface AddPlanDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    customer: string;
    orderNumber: string;
    planNumber: string;
    metalGrade: string;
    metalThickness: string;
  }) => void;
}

export default function AddPlanDialog({
  isOpen,
  onClose,
  onSave,
}: AddPlanDialogProps) {
  const [formData, setFormData] = useState({
    customer: "",
    orderNumber: "",
    planNumber: "",
    metalGrade: "",
    metalThickness: "",
  });

  const handleInputChange = (field: string, value: string) => {
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
    // Handle delete logic here
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
            Додати план
          </DialogTitle>
          <Button
            variant="ghost"
            onClick={handleDelete}
            className="text-[#6D7A87] absolute top-[102%] right-0">
            <Trash2 className="h-4 w-4" />
            видалити
          </Button>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Замовник</Label>
              <Select
                value={formData.customer}
                onValueChange={value => handleInputChange("customer", value)}>
                <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="input_label" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nintendo">Nintendo</SelectItem>
                  <SelectItem value="mcdonalds">McDonald&apos;s</SelectItem>
                  <SelectItem value="louis-vuitton">Louis Vuitton</SelectItem>
                  <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                  <SelectItem value="ibm">IBM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="orderNumber">№ замовлення</Label>
              <Select
                value={formData.orderNumber}
                onValueChange={value =>
                  handleInputChange("orderNumber", value)
                }>
                <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="input_label" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="843.555.0130">843.555.0130</SelectItem>
                  <SelectItem value="219.555.0114">219.555.0114</SelectItem>
                  <SelectItem value="603.555.0123">603.555.0123</SelectItem>
                  <SelectItem value="456.555.0145">456.555.0145</SelectItem>
                  <SelectItem value="789.555.0167">789.555.0167</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="planNumber">№ плану</Label>
              <Input
                id="planNumber"
                value={formData.planNumber}
                onChange={e => handleInputChange("planNumber", e.target.value)}
                placeholder="input_label"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metalGrade">Марка металу</Label>
              <Select
                value={formData.metalGrade}
                onValueChange={value => handleInputChange("metalGrade", value)}>
                <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="input_label" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="430-шлиф">430 шліф</SelectItem>
                  <SelectItem value="304-шлиф">304 шліф</SelectItem>
                  <SelectItem value="316-шлиф">316 шліф</SelectItem>
                  <SelectItem value="201-шлиф">201 шліф</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metalThickness">Товщина металу</Label>
              <Select
                value={formData.metalThickness}
                onValueChange={value =>
                  handleInputChange("metalThickness", value)
                }>
                <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="input_label" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">0.5 мм</SelectItem>
                  <SelectItem value="1">1 мм</SelectItem>
                  <SelectItem value="2">2 мм</SelectItem>
                  <SelectItem value="3">3 мм</SelectItem>
                  <SelectItem value="4">4 мм</SelectItem>
                  <SelectItem value="5">5 мм</SelectItem>
                  <SelectItem value="6">6 мм</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* File Upload Section */}
          <FileUploadSection title="згорнути" />
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
      </DialogContent>
    </Dialog>
  );
}
