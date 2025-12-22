"use client";

import React, { useEffect, useState } from "react";

import { usePurchaseById } from "@/hooks/use-purchase-by-id";
import { useUpdatePurchase } from "@/hooks/use-update-purchase";
import { PurchaseStatus } from "@/service/purchases.service";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { CalendarIcon, FilePenLine, Trash2 } from "lucide-react";

import { ConfirmDialog } from "@/features/users/ui/delete-role-confirm-dialog";

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

interface EditPurchaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  purchaseId: string | null;
  onDelete?: (id: string) => void;
}

const initialFormData = {
  purchaseId: "",
  date: "",
  totalAmount: "",
  status: "IN_PROCESS" as PurchaseStatus,
  comment: "",
};

export default function EditPurchaseDialog({
  isOpen,
  onClose,
  purchaseId,
  onDelete,
}: EditPurchaseDialogProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const { purchase, isLoading: isLoadingPurchase } = usePurchaseById(
    purchaseId || ""
  );
  const updatePurchaseMutation = useUpdatePurchase();

  useEffect(() => {
    if (purchase) {
      setFormData({
        purchaseId: purchase.purchaseId || "",
        date: purchase.date || "",
        totalAmount: purchase.totalAmount?.toString() || "",
        status: purchase.status || "IN_PROCESS",
        comment: purchase.comment || "",
      });
    }
  }, [purchase]);

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
    if (!purchaseId) return;

    updatePurchaseMutation.mutate(
      {
        id: purchaseId,
        data: {
          purchaseId: formData.purchaseId || undefined,
          date: formData.date || undefined,
          totalAmount: formData.totalAmount
            ? parseFloat(formData.totalAmount)
            : undefined,
          status: formData.status,
          comment: formData.comment || undefined,
        },
      },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    );
  };

  const handleDeleteClick = () => {
    if (!purchaseId) return;
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (purchaseId) {
      onDelete?.(purchaseId);
      setDeleteConfirmOpen(false);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  const supplierName = purchase?.supplier?.name || "";

  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent className="sm:max-w-[500px] overflow-y-auto">
          <SheetHeader className="flex flex-row items-center justify-between border-b border-[#E5E7EB] pb-4">
            <div className="flex items-center gap-2">
              <FilePenLine className="h-6 w-6" />
              <SheetTitle className="text-[20px] font-bold text-[#3A4754]">
                Редагувати закупку
              </SheetTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDeleteClick}
              className="text-red-500 hover:text-red-700 hover:bg-red-50">
              <Trash2 className="h-5 w-5" />
            </Button>
          </SheetHeader>

          {isLoadingPurchase ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3A4754]"></div>
            </div>
          ) : (
            <div className="space-y-6 mt-6 px-4">
              {/* Purchase ID */}
              <div className="space-y-2">
                <Label htmlFor="purchaseId">ID закупки</Label>
                <Input
                  id="purchaseId"
                  value={formData.purchaseId}
                  onChange={e =>
                    handleInputChange("purchaseId", e.target.value)
                  }
                  placeholder="Введіть ID закупки"
                  className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                />
              </div>

              {/* Supplier (read-only) */}
              <div className="space-y-2">
                <Label>Постачальник</Label>
                <Input
                  value={supplierName}
                  disabled
                  className="min-h-[48px] w-full rounded-[48px] bg-gray-100 px-4 py-3 border border-[#C8CDD2]"
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label>Дата</Label>
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
                      selected={
                        formData.date ? new Date(formData.date) : undefined
                      }
                      onSelect={handleDateChange}
                      locale={uk}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Total Amount */}
              <div className="space-y-2">
                <Label htmlFor="totalAmount">Сума (грн)</Label>
                <Input
                  id="totalAmount"
                  type="number"
                  value={formData.totalAmount}
                  onChange={e =>
                    handleInputChange("totalAmount", e.target.value)
                  }
                  placeholder="Введіть суму"
                  className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Статус</Label>
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
                  disabled={updatePurchaseMutation.isPending}
                  className="w-1/2 h-[42px] rounded-[48px] bg-[#3A4754] hover:bg-[#2A3A4A]">
                  {updatePurchaseMutation.isPending
                    ? "Збереження..."
                    : "Зберегти"}
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Видалити закупку?"
        description="Ви впевнені, що хочете видалити цю закупку? Цю дію неможливо скасувати."
      />
    </>
  );
}
