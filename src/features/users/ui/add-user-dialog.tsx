"use client";

import React from "react";

import { UserPlus, X } from "lucide-react";

import { RegisterForm } from "@/features/auth/ui";

import { AuthWrapper } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/shared/ui/dialog";

interface AddUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddUserDialog({ isOpen, onClose }: AddUserDialogProps) {
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
            <UserPlus className="h-6 w-6" />
            Додати користувача
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Закрити діалог"
            className="h-8 w-8 rounded-full hover:bg-gray-100">
            <X className="h-4 w-4 text-[#6D7A87]" />
          </Button>
        </DialogHeader>

        <div className="space-y-4">
          <AuthWrapper
            heading="Створити обліковий запис"
            backButtonLabel="Вже є обліковий запис? Увійти"
            backButtonHref="/auth/login"
            description="Створіть обліковий запис для продовження"
            isShowSocial={false}>
            <RegisterForm />
          </AuthWrapper>
        </div>
      </DialogContent>
    </Dialog>
  );
}
