"use client";

import React, { useEffect, useState } from "react";

import { format } from "date-fns";
import { ArrowLeft, FileText, CalendarIcon } from "lucide-react";

import { useWriteOffById } from "@/hooks/use-write-off-by-id";
import { useUpdateWriteOff } from "@/hooks/use-update-write-off";

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

interface EditWriteOffSheetProps {
  writeOffId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EditWriteOffSheet({
  writeOffId,
  isOpen,
  onClose,
}: EditWriteOffSheetProps) {
  const { writeOff, isLoading } = useWriteOffById(writeOffId);
  const updateMutation = useUpdateWriteOff();

  const [formData, setFormData] = useState({
    writeOffNumber: "",
    date: new Date(),
    comment: "",
  });

  useEffect(() => {
    if (writeOff) {
      setFormData({
        writeOffNumber: writeOff.writeOffNumber,
        date: new Date(writeOff.date),
        comment: writeOff.comment || "",
      });
    }
  }, [writeOff]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!writeOffId || !formData.writeOffNumber.trim()) {
      return;
    }

    updateMutation.mutate(
      {
        id: writeOffId,
        data: {
          writeOffNumber: formData.writeOffNumber.trim(),
          date: formData.date.toISOString(),
          comment: formData.comment.trim() || undefined,
        },
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
                disabled={updateMutation.isPending}>
                <ArrowLeft /> Назад
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3A4754]" />
          </div>
        ) : (
          <>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-[#3A4754] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-[24px] text-[#3A4754] font-bold">
                  Редагування списання
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
                  disabled={updateMutation.isPending}>
                  Відхилити
                </Button>
              </SheetClose>
              <Button
                type="submit"
                variant="balck"
                size="lg"
                className="w-1/2"
                disabled={updateMutation.isPending || !isFormValid}
                onClick={handleSubmit}>
                {updateMutation.isPending ? "Збереження..." : "Зберегти"}
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
