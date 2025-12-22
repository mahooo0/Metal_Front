"use client";

import React, { useState } from "react";

import { useCreatePurchase } from "@/hooks/use-create-purchase";
import { useSuppliers } from "@/hooks/use-suppliers";
import { PurchaseStatus } from "@/service/purchases.service";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { CalendarIcon, FilePenLine } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/sheet";
import { Textarea } from "@/shared/ui/textarea";

interface AddPurchaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFormData = {
  purchaseId: "",
  supplierId: "",
  date: "",
  totalAmount: "",
  status: "IN_PROCESS" as PurchaseStatus,
  comment: "",
};

export default function AddPurchaseDialog({
  isOpen,
  onClose,
}: AddPurchaseDialogProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const { suppliers } = useSuppliers();
  const createPurchaseMutation = useCreatePurchase();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      date: date ? date.toISOString() : "",
    }));
    setDatePickerOpen(false);
  };

  const handleSave = () => {
    if (
      !formData.purchaseId ||
      !formData.supplierId ||
      !formData.date ||
      !formData.totalAmount
    ) {
      return;
    }

    createPurchaseMutation.mutate(
      {
        purchaseId: formData.purchaseId,
        supplierId: formData.supplierId,
        date: formData.date,
        totalAmount: parseFloat(formData.totalAmount),
        status: formData.status,
        comment: formData.comment || undefined,
      },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    );
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  const isFormValid =
    formData.purchaseId &&
    formData.supplierId &&
    formData.date &&
    formData.totalAmount;

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-[500px] overflow-y-auto">
        <SheetHeader className="flex flex-row items-center gap-2 border-b border-[#E5E7EB] pb-4">
          <FilePenLine className="h-6 w-6" />
          <SheetTitle className="text-[20px] font-bold text-[#3A4754]">
            Додати закупку
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6 px-4">
          {/* Purchase ID */}
          <div className="space-y-2">
            <Label htmlFor="purchaseId">ID закупки *</Label>
            <Input
              id="purchaseId"
              value={formData.purchaseId}
              onChange={e => handleInputChange("purchaseId", e.target.value)}
              placeholder="Введіть ID закупки"
              className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
            />
          </div>

          {/* Supplier Select */}
          <div className="space-y-2">
            <Label htmlFor="supplier">Постачальник *</Label>
            <Select
              value={formData.supplierId}
              onValueChange={value => handleInputChange("supplierId", value)}>
              <SelectTrigger
                id="supplier"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                <SelectValue placeholder="Оберіть постачальника" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map(supplier => (
                  <SelectItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label>Дата *</Label>
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 border border-[#C8CDD2] justify-start text-left font-normal",
                    !formData.date && "text-[#B6BDC3]"
                  )}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date
                    ? format(new Date(formData.date), "dd.MM.yyyy", {
                        locale: uk,
                      })
                    : "Оберіть дату"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date ? new Date(formData.date) : undefined}
                  onSelect={handleDateChange}
                  locale={uk}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Total Amount */}
          <div className="space-y-2">
            <Label htmlFor="totalAmount">Сума (грн) *</Label>
            <Input
              id="totalAmount"
              type="number"
              value={formData.totalAmount}
              onChange={e => handleInputChange("totalAmount", e.target.value)}
              placeholder="Введіть суму"
              className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Статус *</Label>
            <Select
              value={formData.status}
              onValueChange={value => handleInputChange("status", value)}>
              <SelectTrigger
                id="status"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                <SelectValue placeholder="Оберіть статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IN_PROCESS">У процесі</SelectItem>
                <SelectItem value="UNDER_REVIEW">На розгляді</SelectItem>
                <SelectItem value="PLANNING">Планування</SelectItem>
                <SelectItem value="CALCULATION">Прорахунок</SelectItem>
                <SelectItem value="LAUNCH">Запуск</SelectItem>
                <SelectItem value="RECEIVED">Отримано</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Коментар</Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={e => handleInputChange("comment", e.target.value)}
              placeholder="Введіть коментар"
              className="min-h-[100px] w-full rounded-lg bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm resize-none"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between gap-3 mt-8">
            <Button
              variant="outline"
              onClick={handleClose}
              className="w-1/2 h-[42px] rounded-[48px]">
              Відмінити
            </Button>
            <Button
              onClick={handleSave}
              disabled={!isFormValid || createPurchaseMutation.isPending}
              className="w-1/2 h-[42px] rounded-[48px] bg-[#3A4754] hover:bg-[#2A3A4A]">
              {createPurchaseMutation.isPending ? "Збереження..." : "Зберегти"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
