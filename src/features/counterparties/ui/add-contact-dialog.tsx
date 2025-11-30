"use client";

import React, { useEffect, useState } from "react";

import { FilePenLine, Mail, Phone } from "lucide-react";

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

export interface AddContactDialogData {
  phone: string;
  email: string;
}

export interface AddContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AddContactDialogData) => void;
  initialData?: Partial<AddContactDialogData> | null;
  title?: string;
  isPending?: boolean;
}

export default function AddContactDialog({
  isOpen,
  onClose,
  onSave,
  initialData = null,
  title,
  isPending = false,
}: AddContactDialogProps) {
  const [formData, setFormData] = useState<AddContactDialogData>({
    phone: "",
    email: "",
  });

  const isEditMode = !!initialData;
  const dialogTitle =
    title || (isEditMode ? "Редагувати контакт" : "Додати контакт");

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        phone: initialData?.phone || "",
        email: initialData?.email || "",
      });
    }
  }, [isOpen, initialData]);

  const handleInputChange = (
    field: keyof AddContactDialogData,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.phone.trim() || !formData.email.trim()) {
      return;
    }
    onSave(formData);
  };

  const handleClose = () => {
    if (!isPending) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && handleClose()}>
      <DialogOverlay
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 17, 0.4) 36.54%, rgba(0, 0, 36, 0.8) 100%)",
        }}
      />
      <DialogContent className="bg-white rounded-[16px] p-6">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-[#E5E7EB] pb-2">
          <DialogTitle className="flex items-center gap-2 text-[20px] font-bold text-[#3A4754]">
            <FilePenLine className="h-6 w-6" />
            {dialogTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Телефон */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Телефон <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6D7A87]" />
              <Input
                id="phone"
                placeholder="+380671234567"
                value={formData.phone}
                onChange={e => handleInputChange("phone", e.target.value)}
                className="bg-white pl-10"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6D7A87]" />
              <Input
                id="email"
                type="email"
                placeholder="manager@company.ua"
                value={formData.email}
                onChange={e => handleInputChange("email", e.target.value)}
                className="bg-white pl-10"
                required
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-3 mt-8">
          <Button
            variant="BlackTransparent"
            onClick={handleClose}
            disabled={isPending}
            className="w-[212px] h-[42px] rounded-[48px]">
            Відмінити
          </Button>
          <Button
            variant="balck"
            onClick={handleSave}
            disabled={
              isPending || !formData.phone.trim() || !formData.email.trim()
            }
            className="w-[212px] h-[42px] rounded-[48px]">
            {isPending ? "Збереження..." : "Зберегти"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
