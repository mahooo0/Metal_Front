"use client";

import React, { useEffect, useState } from "react";

import { ArrowLeft, FolderTree } from "lucide-react";
import { useQueryState } from "nuqs";

import { useCreateMaterialCategory } from "@/hooks/use-create-material-category";
import { useDeleteMaterialCategory } from "@/hooks/use-delete-material-category";
import { useMaterialCategoryById } from "@/hooks/use-material-category-by-id";
import { useUpdateMaterialCategory } from "@/hooks/use-update-material-category";

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

export function CategorySheet() {
  const [createCategory, setCreateCategory] = useQueryState("createCategory", {
    defaultValue: "false",
  });
  const [editCategoryId, setEditCategoryId] = useQueryState("editCategory");

  const isEditMode = !!editCategoryId;
  const createMutation = useCreateMaterialCategory();
  const updateMutation = useUpdateMaterialCategory();
  const { deleteCategory } = useDeleteMaterialCategory();
  const { category: categoryData, isLoading: isLoadingCategory } =
    useMaterialCategoryById(editCategoryId);

  const [formData, setFormData] = useState({
    name: "",
  });

  // Load data when editing
  useEffect(() => {
    if (isEditMode && categoryData && createCategory === "true") {
      setFormData({
        name: categoryData.name || "",
      });
    }
  }, [isEditMode, categoryData, createCategory]);

  // Reset form when sheet closes
  useEffect(() => {
    if (createCategory !== "true") {
      setFormData({
        name: "",
      });
      setEditCategoryId(null);
    }
  }, [createCategory, setEditCategoryId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return;
    }

    const categoryPayload = {
      name: formData.name.trim(),
    };

    if (isEditMode) {
      updateMutation.mutate(
        { id: editCategoryId!, data: categoryPayload },
        {
          onSuccess: () => {
            setCreateCategory("false");
            setEditCategoryId(null);
          },
        }
      );
    } else {
      createMutation.mutate(categoryPayload, {
        onSuccess: () => {
          setCreateCategory("false");
        },
      });
    }
  };

  const handleDelete = () => {
    if (isEditMode && editCategoryId) {
      deleteCategory(editCategoryId);
      setCreateCategory("false");
      setEditCategoryId(null);
    }
  };

  const handleClose = () => {
    setCreateCategory("false");
    setEditCategoryId(null);
  };

  return (
    <Sheet
      open={createCategory === "true"}
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
              <FolderTree className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-[24px] text-[#3A4754] font-bold">
              {isEditMode ? "Редагування категорії" : "Створення категорії"}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-2">
              <Label
                htmlFor="name"
                className="text-sm text-[#3A4754] font-medium">
                Назва категорії
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => handleInputChange("name", e.target.value)}
                placeholder="Введіть назву категорії"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                maxLength={255}
                required
              />
              <p className="text-xs text-[#B6BDC3]">
                Максимум 255 символів ({formData.name.length}/255)
              </p>
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
              isLoadingCategory ||
              !formData.name.trim()
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
