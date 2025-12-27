"use client";

import React, { useEffect, useState } from "react";

import { format } from "date-fns";
import { ArrowLeft, FileText, CalendarIcon } from "lucide-react";

import { useCreateWriteOff } from "@/hooks/use-create-write-off";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from "@/shared/ui/sheet";
import { Textarea } from "@/shared/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/popover";
import { Calendar } from "@/shared/ui/calendar";
import { cn } from "@/shared/lib/utils";

interface CreateWriteOffSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

function generateWriteOffNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `WO-${year}-${random}`;
}

export function CreateWriteOffSheet({
  isOpen,
  onClose,
}: CreateWriteOffSheetProps) {
  const createMutation = useCreateWriteOff();

  const [formData, setFormData] = useState({
    writeOffNumber: "",
    date: new Date(),
    comment: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        writeOffNumber: generateWriteOffNumber(),
        date: new Date(),
        comment: "",
      });
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.writeOffNumber.trim()) {
      return;
    }

    createMutation.mutate(
      {
        writeOffNumber: formData.writeOffNumber.trim(),
        date: formData.date.toISOString(),
        ...(formData.comment && { comment: formData.comment.trim() }),
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const handleClose = () => {
    onClose();
  };

  const isFormValid = formData.writeOffNumber.trim();

  return (
    <Sheet open={isOpen} onOpenChange={open => !open && handleClose()}>
      <SheetContent className="min-w-[520px] [&>button]:hidden px-[24px] py-[20px] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetClose asChild>
              <Button
                variant="outline"
                size="lg"
                className="shadow-none border-none"
                onClick={handleClose}
                disabled={createMutation.isPending}>
                <ArrowLeft /> Назад
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#3A4754] flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-[24px] text-[#3A4754] font-bold">
              Створення списання
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-2">
              <Label
                htmlFor="writeOffNumber"
                className="text-sm text-[#3A4754] font-medium">
                Номер списання *
              </Label>
              <Input
                id="writeOffNumber"
                value={formData.writeOffNumber}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    writeOffNumber: e.target.value,
                  }))
                }
                placeholder="WO-2025-001"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-sm text-[#3A4754] font-medium">
                Дата списання *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 justify-start text-left font-normal border border-[#C8CDD2]",
                      !formData.date && "text-[#B6BDC3]"
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date
                      ? format(formData.date, "dd.MM.yyyy")
                      : "Оберіть дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={date =>
                      date && setFormData(prev => ({ ...prev, date }))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="comment"
                className="text-sm text-[#3A4754] font-medium">
                Коментар
              </Label>
              <Textarea
                id="comment"
                value={formData.comment}
                onChange={e =>
                  setFormData(prev => ({ ...prev, comment: e.target.value }))
                }
                placeholder="Введіть коментар (необов'язково)"
                className="min-h-[100px] w-full rounded-[16px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>
          </form>
        </div>

        <SheetFooter className="flex items-center justify-between flex-row gap-6 mt-8">
          <SheetClose asChild className="w-1/2">
            <Button
              variant="BlackTransparent"
              size="lg"
              onClick={handleClose}
              disabled={createMutation.isPending}>
              Відхилити
            </Button>
          </SheetClose>
          <Button
            type="submit"
            variant="balck"
            size="lg"
            className="w-1/2"
            disabled={createMutation.isPending || !isFormValid}
            onClick={handleSubmit}>
            {createMutation.isPending ? "Збереження..." : "Створити"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
