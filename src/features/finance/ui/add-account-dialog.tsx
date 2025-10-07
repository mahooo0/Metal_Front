"use client";

import React, { useState } from "react";

import { FilePenLine, Trash2, Upload, X } from "lucide-react";

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
import { Textarea } from "@/shared/ui/textarea";

interface AddAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    counterparty: string;
    accountNumber: string;
    amount: string;
    type: string;
    paymentType: string;
    orderNumber: string;
    paymentMethod: string;
    comment: string;
  }) => void;
}

export default function AddAccountDialog({
  isOpen,
  onClose,
  onSave,
}: AddAccountDialogProps) {
  const [formData, setFormData] = useState({
    counterparty: "",
    accountNumber: "",
    amount: "",
    type: "",
    paymentType: "Вхідний",
    orderNumber: "",
    paymentMethod: "Готівка",
    comment: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    "Document title",
    "Document title",
    "Document title",
    "Document title",
    "Document title",
  ]);

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

  const handleFileUpload = () => {
    // Handle file upload logic here
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
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
            Додати рахунок
          </DialogTitle>
        </DialogHeader>

        <div className=" space-y-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="counterparty">Вибрати контрагента</Label>
              <Select
                value={formData.counterparty}
                onValueChange={value =>
                  handleInputChange("counterparty", value)
                }>
                <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="input_label" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="ebay">eBay</SelectItem>
                  <SelectItem value="louis-vuitton">Louis Vuitton</SelectItem>
                  <SelectItem value="disney">The Walt Disney</SelectItem>
                  <SelectItem value="general-electric">
                    General Electric
                  </SelectItem>
                  <SelectItem value="gillette">Gillette</SelectItem>
                  <SelectItem value="mcdonalds">McDonald&apos;s</SelectItem>
                  <SelectItem value="mastercard">MasterCard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNumber">№ рахунку</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={e =>
                  handleInputChange("accountNumber", e.target.value)
                }
                placeholder="input_label"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Сума рахунку</Label>
              <Input
                id="amount"
                value={formData.amount}
                onChange={e => handleInputChange("amount", e.target.value)}
                placeholder="input_label"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Тип</Label>
              <Select
                value={formData.type}
                onValueChange={value => handleInputChange("type", value)}>
                <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="input_label" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="б/г">б/г</SelectItem>
                  <SelectItem value="готівка">готівка</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentType">Оберіть тип платежу</Label>
              <Select
                value={formData.paymentType}
                onValueChange={value =>
                  handleInputChange("paymentType", value)
                }>
                <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="Вхідний" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Вхідний">Вхідний</SelectItem>
                  <SelectItem value="Вихідний">Вихідний</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="orderNumber">№ замовлення</Label>
              <Input
                id="orderNumber"
                value={formData.orderNumber}
                onChange={e => handleInputChange("orderNumber", e.target.value)}
                placeholder="input_label"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Вид оплати</Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={value =>
                  handleInputChange("paymentMethod", value)
                }>
                <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="Готівка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Готівка">Готівка</SelectItem>
                  <SelectItem value="Безготівковий">Безготівковий</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <FileUploadSection title="згорнути" className="!mb-0" />

          {/* Comment Section */}
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

        {/* Footer Buttons */}
      </DialogContent>
    </Dialog>
  );
}
