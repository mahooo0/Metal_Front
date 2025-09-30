"use client";

import React, { useState } from "react";

import { Mail, Pencil, Phone, X } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/shared/ui/dialog";

interface RestorePasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (method: "email" | "phone") => void;
}

export default function RestorePasswordDialog({
  isOpen,
  onClose,
  onSave,
}: RestorePasswordDialogProps) {
  const [selectedMethod, setSelectedMethod] = useState<
    "email" | "phone" | null
  >(null);

  const handleSave = () => {
    if (selectedMethod) {
      onSave(selectedMethod);
      onClose();
    }
  };

  const handleEmailSelect = () => {
    setSelectedMethod("email");
  };

  const handlePhoneSelect = () => {
    setSelectedMethod("phone");
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
      <DialogContent className="max-w-md bg-white rounded-[16px] p-6">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-[#E5E7EB] pb-4 mb-6">
          <DialogTitle className="flex items-center gap-2 text-[20px] font-bold text-[#3A4754]">
            <Pencil className="h-6 w-6" />
            Відновити пароль
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-gray-100">
            <X className="h-4 w-4 text-[#6D7A87]" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <p className="text-sm text-[#3A4754] text-center">
            Оберіть, куди буде відправлено тимчасовий пароль
          </p>

          {/* Method Selection */}
          <div className="flex justify-center gap-8">
            {/* Email Option */}
            <button
              onClick={handleEmailSelect}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                selectedMethod === "email"
                  ? "bg-[#1D96F9]"
                  : "bg-[#3A4754] hover:bg-[#2A3A4A]"
              }`}>
              <Mail className="h-[18px] w-[18px] text-white" />
            </button>

            {/* Phone Option */}
            <button
              onClick={handlePhoneSelect}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                selectedMethod === "phone"
                  ? "bg-[#1D96F9]"
                  : "bg-[#3A4754] hover:bg-[#2A3A4A]"
              }`}>
              <Phone className="h-[18px] w-[18px] text-white" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-3 mt-5 ">
          <Button
            variant="BlackTransparent"
            size="lg"
            className="w-1/2 h-[42px] rounded-[48px]"
            onClick={onClose}>
            Відмінити
          </Button>
          <Button
            variant="balck"
            size="lg"
            onClick={handleSave}
            disabled={!selectedMethod}
            className="w-1/2 h-[42px] rounded-[48px]">
            Зберегти
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
