"use client";

import React, { useEffect, useState } from "react";

import { useMaterialItems } from "@/hooks/use-material-items";
import { usePurchaseItemById } from "@/hooks/use-purchase-item-by-id";
import { useUpdatePurchaseItem } from "@/hooks/use-update-purchase-item";
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

interface EditPurchaseItemSheetProps {
  isOpen: boolean;
  onClose: () => void;
  purchaseId: string;
  itemId: string | null;
  onDelete?: (id: string) => void;
}

const initialFormData = {
  materialItemId: "",
  date: "",
  width: "",
  length: "",
  orderedQuantity: "",
  purchasePrice: "",
  salePrice: "",
  over100: "",
  from50to100: "",
  from10to50: "",
  from10: "",
  comment: "",
};

export default function EditPurchaseItemSheet({
  isOpen,
  onClose,
  purchaseId,
  itemId,
  onDelete,
}: EditPurchaseItemSheetProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const { purchaseItem, isLoading: isLoadingItem } = usePurchaseItemById(
    purchaseId,
    itemId
  );
  const { items: materialItems, isLoading: isLoadingMaterials } =
    useMaterialItems({ page: 1, limit: 100 });
  const updatePurchaseItemMutation = useUpdatePurchaseItem();

  useEffect(() => {
    if (purchaseItem) {
      setFormData({
        materialItemId: purchaseItem.materialItemId || "",
        date: purchaseItem.date || "",
        width: purchaseItem.width?.toString() || "",
        length: purchaseItem.length?.toString() || "",
        orderedQuantity: purchaseItem.orderedQuantity?.toString() || "",
        purchasePrice: purchaseItem.purchasePrice?.toString() || "",
        salePrice: purchaseItem.salePrice?.toString() || "",
        over100: purchaseItem.priceCategories?.over100?.toString() || "",
        from50to100:
          purchaseItem.priceCategories?.from50to100?.toString() || "",
        from10to50: purchaseItem.priceCategories?.from10to50?.toString() || "",
        from10: purchaseItem.priceCategories?.from10?.toString() || "",
        comment: purchaseItem.comment || "",
      });
    }
  }, [purchaseItem]);

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
    if (!itemId) return;

    updatePurchaseItemMutation.mutate(
      {
        purchaseId,
        id: itemId,
        data: {
          materialItemId: formData.materialItemId || undefined,
          date: formData.date || undefined,
          width: formData.width ? parseFloat(formData.width) : undefined,
          length: formData.length ? parseFloat(formData.length) : undefined,
          orderedQuantity: formData.orderedQuantity
            ? parseInt(formData.orderedQuantity, 10)
            : undefined,
          purchasePrice: formData.purchasePrice
            ? parseFloat(formData.purchasePrice)
            : undefined,
          salePrice: formData.salePrice
            ? parseFloat(formData.salePrice)
            : undefined,
          priceCategories: {
            over100: parseFloat(formData.over100) || 0,
            from50to100: parseFloat(formData.from50to100) || 0,
            from10to50: parseFloat(formData.from10to50) || 0,
            from10: parseFloat(formData.from10) || 0,
          },
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
    if (!itemId) return;
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemId) {
      onDelete?.(itemId);
      setDeleteConfirmOpen(false);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  const materialName =
    materialItems.find(m => m.id === formData.materialItemId)?.name || "";

  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent className="sm:max-w-[500px] overflow-y-auto">
          <SheetHeader className="flex flex-row items-center justify-between border-b border-[#E5E7EB] pb-4">
            <div className="flex items-center gap-2">
              <FilePenLine className="h-6 w-6" />
              <SheetTitle className="text-[20px] font-bold text-[#3A4754]">
                Редагувати товар
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

          {isLoadingItem ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3A4754]"></div>
            </div>
          ) : (
            <div className="space-y-6 mt-6 px-4">
              {/* Material Item Select */}
              <div className="space-y-2">
                <Label htmlFor="materialItem">Матеріал</Label>
                <Select
                  value={formData.materialItemId}
                  onValueChange={value =>
                    handleInputChange("materialItemId", value)
                  }
                  disabled={isLoadingMaterials}>
                  <SelectTrigger
                    id="materialItem"
                    className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                    <SelectValue placeholder={materialName || "Оберіть матеріал"} />
                  </SelectTrigger>
                  <SelectContent>
                    {materialItems.map(item => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name} ({item.thickness} мм)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

              {/* Dimensions */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width">Ширина (мм)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={formData.width}
                    onChange={e => handleInputChange("width", e.target.value)}
                    placeholder="Введіть ширину"
                    className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="length">Довжина (мм)</Label>
                  <Input
                    id="length"
                    type="number"
                    value={formData.length}
                    onChange={e => handleInputChange("length", e.target.value)}
                    placeholder="Введіть довжину"
                    className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                  />
                </div>
              </div>

              {/* Ordered Quantity */}
              <div className="space-y-2">
                <Label htmlFor="orderedQuantity">Кількість</Label>
                <Input
                  id="orderedQuantity"
                  type="number"
                  value={formData.orderedQuantity}
                  onChange={e =>
                    handleInputChange("orderedQuantity", e.target.value)
                  }
                  placeholder="Введіть кількість"
                  className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                />
              </div>

              {/* Prices */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchasePrice">Ціна закупки (грн)</Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    value={formData.purchasePrice}
                    onChange={e =>
                      handleInputChange("purchasePrice", e.target.value)
                    }
                    placeholder="Введіть ціну"
                    className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salePrice">Ціна продажу (грн)</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    value={formData.salePrice}
                    onChange={e => handleInputChange("salePrice", e.target.value)}
                    placeholder="Введіть ціну"
                    className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                  />
                </div>
              </div>

              {/* Price Categories */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Категорії цін</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="over100" className="text-sm">
                      Від 100 шт (грн)
                    </Label>
                    <Input
                      id="over100"
                      type="number"
                      value={formData.over100}
                      onChange={e => handleInputChange("over100", e.target.value)}
                      placeholder="0"
                      className="min-h-[40px] w-full rounded-[48px] bg-white px-4 py-2 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="from50to100" className="text-sm">
                      50-100 шт (грн)
                    </Label>
                    <Input
                      id="from50to100"
                      type="number"
                      value={formData.from50to100}
                      onChange={e =>
                        handleInputChange("from50to100", e.target.value)
                      }
                      placeholder="0"
                      className="min-h-[40px] w-full rounded-[48px] bg-white px-4 py-2 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="from10to50" className="text-sm">
                      10-50 шт (грн)
                    </Label>
                    <Input
                      id="from10to50"
                      type="number"
                      value={formData.from10to50}
                      onChange={e =>
                        handleInputChange("from10to50", e.target.value)
                      }
                      placeholder="0"
                      className="min-h-[40px] w-full rounded-[48px] bg-white px-4 py-2 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="from10" className="text-sm">
                      До 10 шт (грн)
                    </Label>
                    <Input
                      id="from10"
                      type="number"
                      value={formData.from10}
                      onChange={e => handleInputChange("from10", e.target.value)}
                      placeholder="0"
                      className="min-h-[40px] w-full rounded-[48px] bg-white px-4 py-2 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                    />
                  </div>
                </div>
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
                  disabled={updatePurchaseItemMutation.isPending}
                  className="w-1/2 h-[42px] rounded-[48px] bg-[#3A4754] hover:bg-[#2A3A4A]">
                  {updatePurchaseItemMutation.isPending
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
        title="Видалити товар?"
        description="Ви впевнені, що хочете видалити цей товар? Цю дію неможливо скасувати."
      />
    </>
  );
}
