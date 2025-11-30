"use client";

import React, { useState } from "react";

import { ChevronDown, FilePenLine, Trash2 } from "lucide-react";

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

// Types for add counterparty dialog
export interface AddCounterpartyDialogData {
  name: string;
  comment?: string;
}

export interface AddCounterpartyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AddCounterpartyDialogData) => void;
  onDelete?: () => void;
  initialData?: Partial<AddCounterpartyDialogData>;
  title?: string;
  isPending?: boolean;
}

export default function AddCounterpartyDialog({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData = {},
  title = "Додати контрагента",
  isPending = false,
}: AddCounterpartyDialogProps) {
  const [formData, setFormData] = useState<AddCounterpartyDialogData>({
    name: "",
    comment: "",
    ...initialData,
  });

  // Reset form when dialog opens
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        comment: "",
      });
    }
  }, [isOpen]); // Only reset when dialog opens, avoid infinite loops

  const handleInputChange = (
    field: keyof AddCounterpartyDialogData,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      return;
    }
    onSave(formData);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      onClose();
    }
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
      <DialogContent className=" bg-white rounded-[16px] p-6">
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
          {/* Назва контрагента */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Назва контрагента
            </Label>
            <div className="relative">
              <Input
                id="name"
                placeholder="Введіть назву контрагента"
                value={formData.name}
                onChange={e => handleInputChange("name", e.target.value)}
                className="bg-white pr-10"
                required
              />
            </div>
          </div>

          {/* Коментар */}
          <div className="space-y-2">
            <Label htmlFor="comment" className="text-sm font-medium">
              Коментар
            </Label>
            <Textarea
              id="comment"
              placeholder="Введіть коментар (необов'язково)"
              value={formData.comment || ""}
              onChange={e => handleInputChange("comment", e.target.value)}
              className="bg-white min-h-[100px]"
            />
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
            disabled={isPending || !formData.name.trim()}
            className="w-[212px] h-[42px] rounded-[48px]">
            {isPending ? "Збереження..." : "Зберегти"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
