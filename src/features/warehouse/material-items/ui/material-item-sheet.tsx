"use client";

import React, { useEffect, useState } from "react";

import { ArrowLeft, Package } from "lucide-react";
import { useQueryState } from "nuqs";

import { useCreateMaterialItem } from "@/hooks/use-create-material-item";
import { useDeleteMaterialItem } from "@/hooks/use-delete-material-item";
import { useMaterialItemById } from "@/hooks/use-material-item-by-id";
import { useUpdateMaterialItem } from "@/hooks/use-update-material-item";

import { MetalBrandSelect } from "./metal-brand-select";

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

export function MaterialItemSheet() {
  const [createItem, setCreateItem] = useQueryState("createItem", {
    defaultValue: "false",
  });
  const [editItemId, setEditItemId] = useQueryState("editItem");

  const isEditMode = !!editItemId;
  const createMutation = useCreateMaterialItem();
  const updateMutation = useUpdateMaterialItem();
  const { deleteItem } = useDeleteMaterialItem();
  const { item: itemData, isLoading: isLoadingItem } =
    useMaterialItemById(editItemId);

  const [formData, setFormData] = useState({
    name: "",
    thickness: "",
    typeId: "",
    sheetType: "",
    cuttingSupply: "",
    cuttingTime: "",
    description: "",
  });

  // Load data when editing
  useEffect(() => {
    if (isEditMode && itemData && createItem === "true") {
      setFormData({
        name: itemData.name || "",
        thickness: itemData.thickness?.toString() || "",
        typeId: itemData.typeId || "",
        sheetType: itemData.sheetType || "",
        cuttingSupply: itemData.cuttingSupply?.toString() || "",
        cuttingTime: itemData.cuttingTime?.toString() || "",
        description: itemData.description || "",
      });
    }
  }, [isEditMode, itemData, createItem]);

  // Reset form when sheet closes
  useEffect(() => {
    if (createItem !== "true") {
      setFormData({
        name: "",
        thickness: "",
        typeId: "",
        sheetType: "",
        cuttingSupply: "",
        cuttingTime: "",
        description: "",
      });
      setEditItemId(null);
    }
  }, [createItem, setEditItemId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.thickness ||
      !formData.typeId ||
      !formData.sheetType.trim()
    ) {
      return;
    }

    const itemPayload = {
      name: formData.name.trim(),
      thickness: parseFloat(formData.thickness),
      typeId: formData.typeId,
      sheetType: formData.sheetType.trim(),
      ...(formData.cuttingSupply && {
        cuttingSupply: parseFloat(formData.cuttingSupply),
      }),
      ...(formData.cuttingTime && {
        cuttingTime: parseFloat(formData.cuttingTime),
      }),
      ...(formData.description && { description: formData.description.trim() }),
    };

    if (isEditMode) {
      updateMutation.mutate(
        { id: editItemId!, data: itemPayload },
        {
          onSuccess: () => {
            setCreateItem("false");
            setEditItemId(null);
          },
        }
      );
    } else {
      createMutation.mutate(itemPayload, {
        onSuccess: () => {
          setCreateItem("false");
        },
      });
    }
  };

  const handleDelete = () => {
    if (isEditMode && editItemId) {
      deleteItem(editItemId);
      setCreateItem("false");
      setEditItemId(null);
    }
  };

  const handleClose = () => {
    setCreateItem("false");
    setEditItemId(null);
  };

  const isFormValid =
    formData.name.trim() &&
    formData.thickness &&
    formData.typeId &&
    formData.sheetType.trim();

  return (
    <Sheet
      open={createItem === "true"}
      onOpenChange={open => {
        if (!open) handleClose();
      }}>
      <SheetContent className="min-w-[620px] [&>button]:hidden px-[24px] py-[20px] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetClose asChild>
              <Button
                variant="outline"
                size="lg"
                className="shadow-none border-none"
                onClick={handleClose}
                disabled={createMutation.isPending || updateMutation.isPending}>
                <ArrowLeft /> Назад
              </Button>
            </SheetClose>
            {isEditMode && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleDelete}>
                Видалити
              </Button>
            )}
          </div>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#3A4754] flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-[24px] text-[#3A4754] font-bold">
              {isEditMode ? "Редагування матеріалу" : "Створення матеріалу"}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-5">
            {/* Name */}
            <div className="grid gap-2">
              <Label
                htmlFor="name"
                className="text-sm text-[#3A4754] font-medium">
                Назва матеріалу *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => handleInputChange("name", e.target.value)}
                placeholder="Введіть назву матеріалу"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                required
              />
            </div>

            {/* Thickness */}
            <div className="grid gap-2">
              <Label
                htmlFor="thickness"
                className="text-sm text-[#3A4754] font-medium">
                Товщина (мм) *
              </Label>
              <Input
                id="thickness"
                type="number"
                step="0.1"
                min="0"
                value={formData.thickness}
                onChange={e => handleInputChange("thickness", e.target.value)}
                placeholder="Введіть товщину"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                required
              />
            </div>

            {/* Metal Brand */}
            <div className="grid gap-2">
              <Label
                htmlFor="typeId"
                className="text-sm text-[#3A4754] font-medium">
                Марка металу *
              </Label>
              <MetalBrandSelect
                value={formData.typeId}
                onValueChange={value => handleInputChange("typeId", value)}
                placeholder="Оберіть марку металу"
              />
            </div>

            {/* Sheet Type */}
            <div className="grid gap-2">
              <Label
                htmlFor="sheetType"
                className="text-sm text-[#3A4754] font-medium">
                Тип листа *
              </Label>
              <Input
                id="sheetType"
                value={formData.sheetType}
                onChange={e => handleInputChange("sheetType", e.target.value)}
                placeholder="Введіть тип листа (напр. Гарячекатаний)"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                required
              />
            </div>

            {/* Cutting Supply */}
            <div className="grid gap-2">
              <Label
                htmlFor="cuttingSupply"
                className="text-sm text-[#3A4754] font-medium">
                Подача різки
              </Label>
              <Input
                id="cuttingSupply"
                type="number"
                step="0.1"
                min="0"
                value={formData.cuttingSupply}
                onChange={e =>
                  handleInputChange("cuttingSupply", e.target.value)
                }
                placeholder="Введіть подачу різки"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>

            {/* Cutting Time */}
            <div className="grid gap-2">
              <Label
                htmlFor="cuttingTime"
                className="text-sm text-[#3A4754] font-medium">
                Час різки
              </Label>
              <Input
                id="cuttingTime"
                type="number"
                step="0.1"
                min="0"
                value={formData.cuttingTime}
                onChange={e => handleInputChange("cuttingTime", e.target.value)}
                placeholder="Введіть час різки"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label
                htmlFor="description"
                className="text-sm text-[#3A4754] font-medium">
                Опис
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={e => handleInputChange("description", e.target.value)}
                className="min-h-[120px] w-full rounded-[16px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                placeholder="Введіть опис матеріалу"
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
              disabled={createMutation.isPending || updateMutation.isPending}>
              Відхилити
            </Button>
          </SheetClose>
          <Button
            type="submit"
            variant="balck"
            size="lg"
            className="w-1/2"
            disabled={
              createMutation.isPending ||
              updateMutation.isPending ||
              isLoadingItem ||
              !isFormValid
            }
            onClick={handleSubmit}>
            {createMutation.isPending || updateMutation.isPending
              ? "Збереження..."
              : isEditMode
                ? "Оновити"
                : "Зберегти"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
