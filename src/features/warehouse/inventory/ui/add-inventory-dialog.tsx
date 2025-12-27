"use client";

import React, { useState } from "react";

import { format } from "date-fns";
import { CalendarIcon, FilePenLine } from "lucide-react";

import { useCreateInventory } from "@/hooks/use-create-inventory";

import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/popover";
import { Textarea } from "@/shared/ui/textarea";

interface AddInventoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddInventoryDialog({
  isOpen,
  onClose,
  onSuccess,
}: AddInventoryDialogProps) {
  const [formData, setFormData] = useState({
    inventoryNumber: "",
    date: new Date(),
    comment: "",
  });

  const createMutation = useCreateInventory();

  const handleInputChange = (
    field: "inventoryNumber" | "comment",
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        date,
      }));
    }
  };

  const handleSave = () => {
    if (!formData.inventoryNumber) return;

    createMutation.mutate(
      {
        inventoryNumber: formData.inventoryNumber,
        date: formData.date.toISOString(),
        comment: formData.comment || undefined,
      },
      {
        onSuccess: () => {
          handleClose();
          onSuccess?.();
        },
      }
    );
  };

  const handleClose = () => {
    setFormData({
      inventoryNumber: "",
      date: new Date(),
      comment: "",
    });
    onClose();
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
            Додати інвентаризацію
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inventoryNumber">Номер інвентаризації *</Label>
              <Input
                id="inventoryNumber"
                value={formData.inventoryNumber}
                onChange={e =>
                  handleInputChange("inventoryNumber", e.target.value)
                }
                placeholder="Введіть номер"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label>Дата *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="min-h-[48px] w-full rounded-[48px] justify-start text-left font-normal border border-[#C8CDD2]">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(formData.date, "dd.MM.yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Коментар</Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={e => handleInputChange("comment", e.target.value)}
              placeholder="Введіть коментар (необов'язково)"
              className="min-h-[100px] w-full rounded-lg bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm resize-none"
            />
          </div>

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
              disabled={!formData.inventoryNumber || createMutation.isPending}
              className="w-1/2 h-[42px] rounded-[48px]">
              {createMutation.isPending ? "Створення..." : "Створити"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
