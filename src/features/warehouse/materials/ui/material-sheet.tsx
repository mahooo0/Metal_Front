"use client";

import React, { useEffect, useState } from "react";

import { useCreateMaterial } from "@/hooks/use-create-material";
import { useDeleteMaterial } from "@/hooks/use-delete-material";
import { useMaterialById } from "@/hooks/use-material-by-id";
import { useMaterialItems } from "@/hooks/use-material-items";
import { useSuppliers } from "@/hooks/use-suppliers";
import { useUpdateMaterial } from "@/hooks/use-update-material";
import { ChevronDown, Pencil, Trash2 } from "lucide-react";

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

import type { MaterialStatus } from "../types/materials.types";

interface MaterialFormData {
  materialItemId: string;
  supplierId: string;
  date: string;
  width: string;
  length: string;
  quantity: string;
  status: MaterialStatus;
  priceOver100: string;
  priceFrom50to100: string;
  priceFrom10to50: string;
  priceFrom10: string;
  comment: string;
}

const initialFormData: MaterialFormData = {
  materialItemId: "",
  supplierId: "",
  date: new Date().toISOString().split("T")[0],
  width: "",
  length: "",
  quantity: "",
  status: "IN_PROCESS",
  priceOver100: "",
  priceFrom50to100: "",
  priceFrom10to50: "",
  priceFrom10: "",
  comment: "",
};

interface MaterialSheetProps {
  isOpen: boolean;
  onClose: () => void;
  editMaterialId?: string | null;
}

export default function MaterialSheet({
  isOpen,
  onClose,
  editMaterialId,
}: MaterialSheetProps) {
  const [formData, setFormData] = useState<MaterialFormData>(initialFormData);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const isEditMode = !!editMaterialId;

  // Fetch data for selects
  const { items: materialItems, isLoading: isLoadingItems } = useMaterialItems({
    page: 1,
    limit: 100,
  });
  const { suppliers, isLoading: isLoadingSuppliers } = useSuppliers({
    page: 1,
    limit: 100,
  });

  // Fetch material for edit mode
  const { material: materialData, isLoading: isLoadingMaterial } =
    useMaterialById(editMaterialId);

  // Mutations
  const createMutation = useCreateMaterial();
  const updateMutation = useUpdateMaterial();
  const { deleteMaterial } = useDeleteMaterial();

  // Populate form when editing
  useEffect(() => {
    if (isEditMode && materialData && isOpen) {
      setFormData({
        materialItemId: materialData.materialItemId || "",
        supplierId: materialData.supplierId || "",
        date: materialData.date
          ? new Date(materialData.date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        width: String(materialData.width || ""),
        length: String(materialData.length || ""),
        quantity: String(materialData.quantity || ""),
        status: materialData.status || "IN_PROCESS",
        priceOver100: String(materialData.priceCategories?.over100 || ""),
        priceFrom50to100: String(
          materialData.priceCategories?.from50to100 || ""
        ),
        priceFrom10to50: String(materialData.priceCategories?.from10to50 || ""),
        priceFrom10: String(materialData.priceCategories?.from10 || ""),
        comment: materialData.comment || "",
      });
    }
  }, [isEditMode, materialData, isOpen]);

  // Reset form when closing
  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
    }
  }, [isOpen]);

  const handleInputChange = (field: keyof MaterialFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    formData.materialItemId &&
    formData.supplierId &&
    formData.date &&
    formData.width &&
    Number(formData.width) >= 0 &&
    formData.length &&
    Number(formData.length) >= 0 &&
    formData.quantity &&
    Number(formData.quantity) > 0 &&
    formData.priceOver100 &&
    Number(formData.priceOver100) >= 0 &&
    formData.priceFrom50to100 &&
    Number(formData.priceFrom50to100) >= 0 &&
    formData.priceFrom10to50 &&
    Number(formData.priceFrom10to50) >= 0 &&
    formData.priceFrom10 &&
    Number(formData.priceFrom10) >= 0;

  const handleSave = () => {
    if (!isFormValid) return;

    const payload = {
      materialItemId: formData.materialItemId,
      supplierId: formData.supplierId,
      date: new Date(formData.date).toISOString(),
      width: Number(formData.width),
      length: Number(formData.length),
      quantity: Number(formData.quantity),
      status: formData.status,
      priceCategories: {
        over100: Number(formData.priceOver100),
        from50to100: Number(formData.priceFrom50to100),
        from10to50: Number(formData.priceFrom10to50),
        from10: Number(formData.priceFrom10),
      },
      ...(formData.comment && { comment: formData.comment.trim() }),
    };

    if (isEditMode && editMaterialId) {
      updateMutation.mutate(
        {
          id: editMaterialId,
          data: {
            date: payload.date,
            width: payload.width,
            length: payload.length,
            quantity: payload.quantity,
            status: payload.status,
            priceCategories: payload.priceCategories,
            comment: payload.comment,
          },
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const handleDelete = () => {
    if (!isEditMode || !editMaterialId) return;

    if (confirm("Ви впевнені, що хочете видалити цей матеріал?")) {
      deleteMaterial(editMaterialId);
      onClose();
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;
  const isLoading = isLoadingItems || isLoadingSuppliers || isLoadingMaterial;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[500px] sm:max-w-[500px] overflow-y-auto">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Pencil className="h-5 w-5 text-[#3A4754]" />
              <SheetTitle className="text-[#3A4754] text-xl font-semibold">
                {isEditMode ? "Редагувати матеріал" : "Додати матеріал"}
              </SheetTitle>
            </div>
            {isEditMode && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 hover:bg-red-50">
                <Trash2 className="h-5 w-5" />
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="space-y-6 py-6 px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3A4754]"></div>
            </div>
          ) : (
            <>
              {/* Material Item Select */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#3A4754]">
                  Матеріал *
                </Label>
                <Select
                  value={formData.materialItemId}
                  onValueChange={value =>
                    handleInputChange("materialItemId", value)
                  }
                  disabled={isEditMode}>
                  <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 border border-[#C8CDD2]">
                    <SelectValue placeholder="Оберіть матеріал" />
                  </SelectTrigger>
                  <SelectContent>
                    {materialItems.map(item => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name} ({item.thickness}мм, {item.sheetType})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Supplier Select */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#3A4754]">
                  Постачальник *
                </Label>
                <Select
                  value={formData.supplierId}
                  onValueChange={value =>
                    handleInputChange("supplierId", value)
                  }
                  disabled={isLoadingSuppliers}>
                  <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 border border-[#C8CDD2]">
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
                <Label className="text-sm font-medium text-[#3A4754]">
                  Дата *
                </Label>
                <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 justify-between text-left font-normal border border-[#C8CDD2] placeholder:text-[#B6BDC3] hover:bg-white">
                      <span
                        className={
                          formData.date ? "text-[#3A4754]" : "text-[#B6BDC3]"
                        }>
                        {formData.date
                          ? new Date(formData.date).toLocaleDateString("uk-UA")
                          : "Оберіть дату"}
                      </span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        formData.date ? new Date(formData.date) : undefined
                      }
                      onSelect={date => {
                        if (date) {
                          const formattedDate = date
                            .toISOString()
                            .split("T")[0];
                          handleInputChange("date", formattedDate);
                          setDatePickerOpen(false);
                        }
                      }}
                      captionLayout="dropdown"
                      className="rounded-lg border-0"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Width and Length */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#3A4754]">
                    Ширина *
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.width}
                    onChange={e => handleInputChange("width", e.target.value)}
                    placeholder="Введіть ширину"
                    className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 border border-[#C8CDD2]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#3A4754]">
                    Довжина *
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.length}
                    onChange={e => handleInputChange("length", e.target.value)}
                    placeholder="Введіть довжину"
                    className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 border border-[#C8CDD2]"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#3A4754]">
                  Кількість *
                </Label>
                <Input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={e => handleInputChange("quantity", e.target.value)}
                  placeholder="Введіть кількість"
                  className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 border border-[#C8CDD2]"
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#3A4754]">
                  Статус
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={value =>
                    handleInputChange("status", value as MaterialStatus)
                  }>
                  <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 border border-[#C8CDD2]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IN_PROCESS">У процесі</SelectItem>
                    <SelectItem value="UNDER_REVIEW">На розгляді</SelectItem>
                    <SelectItem value="PLANNING">Планування</SelectItem>
                    <SelectItem value="CALCULATION">Прорахунок</SelectItem>
                    <SelectItem value="LAUNCH">Запуск</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Categories */}
              <div className="space-y-4">
                <Label className="text-sm font-medium text-[#3A4754]">
                  Цінові категорії *
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-500">
                      Від 100 шт (грн)
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.priceOver100}
                      onChange={e =>
                        handleInputChange("priceOver100", e.target.value)
                      }
                      placeholder="0"
                      className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 border border-[#C8CDD2]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-500">
                      50-100 шт (грн)
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.priceFrom50to100}
                      onChange={e =>
                        handleInputChange("priceFrom50to100", e.target.value)
                      }
                      placeholder="0"
                      className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 border border-[#C8CDD2]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-500">
                      10-50 шт (грн)
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.priceFrom10to50}
                      onChange={e =>
                        handleInputChange("priceFrom10to50", e.target.value)
                      }
                      placeholder="0"
                      className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 border border-[#C8CDD2]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-500">
                      До 10 шт (грн)
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.priceFrom10}
                      onChange={e =>
                        handleInputChange("priceFrom10", e.target.value)
                      }
                      placeholder="0"
                      className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 border border-[#C8CDD2]"
                    />
                  </div>
                </div>
              </div>

              {/* Comment */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#3A4754]">
                  Коментар
                </Label>
                <Textarea
                  value={formData.comment}
                  onChange={e => handleInputChange("comment", e.target.value)}
                  placeholder="Додаткова інформація"
                  className="min-h-[120px] w-full rounded-[16px] bg-white px-4 py-3 border border-[#C8CDD2] resize-none"
                />
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="border-t pt-4 grid grid-cols-2 gap-4 px-4">
          <Button
            variant="outline"
            size="lg"
            onClick={onClose}
            disabled={isPending}
            className="h-12 px-6 bg-white border border-[#C8CDD2] text-[#3A4754] hover:bg-gray-50">
            Скасувати
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={handleSave}
            disabled={isPending || isLoading || !isFormValid}
            className="h-12 px-6 bg-[#3A4754] hover:bg-[#2A3A4A] text-white">
            {isPending ? "Збереження..." : "Зберегти"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
