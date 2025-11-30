"use client";

import React from "react";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  isPending?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isPending = false,
}: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-[16px] p-6">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <DialogTitle className="text-[#3A4754] text-xl">
              {title}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-[#6D7A87] text-sm">{description}</p>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="BlackTransparent"
            size="lg"
            className="rounded-[48px] h-[44px]"
            onClick={onClose}
            disabled={isPending}>
            Відмінити
          </Button>
          <Button
            variant="destructive"
            size="lg"
            className="rounded-[48px] h-[44px]"
            onClick={onConfirm}
            disabled={isPending}>
            Підтвердити
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
