"use client";

import React, { useMemo, useState } from "react";

import { ChevronDown, Pencil, Plus, Search, Trash2 } from "lucide-react";

import {
  useMaterialCategories,
} from "@/hooks/use-material-categories";
import { useCreateMaterialCategory } from "@/hooks/use-create-material-category";
import { useUpdateMaterialCategory } from "@/hooks/use-update-material-category";
import { useDeleteMaterialCategory } from "@/hooks/use-delete-material-category";
import { useConfirm } from "@/hooks/use-confirm";

import { MaterialCategory } from "@/service/material-categories.service";
import { ConfirmDialog } from "@/features/users/ui/delete-role-confirm-dialog";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

interface MaterialCategorySelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function MaterialCategorySelect({
  value,
  onValueChange,
  placeholder = "Оберіть категорію",
}: MaterialCategorySelectProps) {
  const { data: categoriesData, isLoading } = useMaterialCategories({ page: 1, limit: 100 });
  const categories = categoriesData?.data || [];

  const createMutation = useCreateMaterialCategory();
  const updateMutation = useUpdateMaterialCategory();
  const { deleteCategory, isPending: isDeletePending } = useDeleteMaterialCategory();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<MaterialCategory | null>(null);
  const [formName, setFormName] = useState("");
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);

  const confirmDelete = useConfirm({
    onConfirm: () => {
      if (deletingCategoryId) {
        deleteCategory(deletingCategoryId);
        if (value === deletingCategoryId) {
          onValueChange("");
        }
        if (editingCategory?.id === deletingCategoryId) {
          handleCloseDialog();
        }
        setDeletingCategoryId(null);
      }
    },
    defaultTitle: "Видалити категорію?",
    defaultDescription:
      "Ви впевнені, що хочете видалити цю категорію? Цю дію неможливо скасувати.",
  });

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;
    return categories.filter(category =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  const handleOpenDialog = (category?: MaterialCategory) => {
    if (category) {
      setEditingCategory(category);
      setFormName(category.name);
    } else {
      setEditingCategory(null);
      setFormName("");
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCategory(null);
    setFormName("");
  };

  const handleSave = () => {
    if (!formName.trim()) return;

    if (editingCategory) {
      updateMutation.mutate(
        { id: editingCategory.id, data: { name: formName.trim() } },
        {
          onSuccess: () => {
            handleCloseDialog();
          },
        }
      );
    } else {
      createMutation.mutate(
        { name: formName.trim() },
        {
          onSuccess: data => {
            onValueChange(data.id);
            handleCloseDialog();
            setIsOpen(false);
          },
        }
      );
    }
  };

  const handleDelete = () => {
    if (!editingCategory) return;
    setDeletingCategoryId(editingCategory.id);
    confirmDelete.open({
      title: "Видалити категорію?",
      description: `Ви впевнені, що хочете видалити категорію "${editingCategory.name}"? Цю дію неможливо скасувати.`,
    });
  };

  const handleDeleteFromList = (categoryId: string, categoryName: string) => {
    setDeletingCategoryId(categoryId);
    confirmDelete.open({
      title: "Видалити категорію?",
      description: `Ви впевнені, що хочете видалити категорію "${categoryName}"? Цю дію неможливо скасувати.`,
    });
  };

  const selectedCategoryName = useMemo(
    () => categories.find(category => category.id === value)?.name || "",
    [categories, value]
  );

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 justify-between text-left font-normal border border-[#C8CDD2] text-sm">
            <span className={value ? "text-[#3A4754]" : "text-[#B6BDC3]"}>
              {value ? selectedCategoryName : placeholder}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="!w-[--radix-popover-trigger-width] sm:!max-w-full p-0"
          align="start">
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#B6BDC3]" />
              <Input
                placeholder="Пошук..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-sm"
              />
            </div>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-sm text-[#B6BDC3]">
                Завантаження...
              </div>
            ) : filteredCategories.length === 0 ? (
              <div className="p-4 text-center text-sm text-[#B6BDC3]">
                {searchQuery ? "Нічого не знайдено" : "Немає категорій"}
              </div>
            ) : (
              <>
                {filteredCategories.map(category => (
                  <div
                    key={category.id}
                    className={`flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer ${
                      value === category.id ? "bg-gray-50" : ""
                    }`}
                    onClick={() => {
                      onValueChange(category.id);
                      setSearchQuery("");
                      setIsOpen(false);
                    }}>
                    <span className="text-sm">{category.name}</span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={e => {
                          e.stopPropagation();
                          handleOpenDialog(category);
                        }}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-500 hover:text-red-700"
                        onClick={e => {
                          e.stopPropagation();
                          handleDeleteFromList(category.id, category.name);
                        }}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="p-2 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-blue-600 hover:text-blue-800"
              onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Додати нову категорію
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <Dialog
        open={isDialogOpen}
        onOpenChange={open => {
          if (!open) {
            handleCloseDialog();
          }
        }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingCategory
                ? "Редагувати категорію"
                : "Додати нову категорію"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoryName" className="text-right">
                Назва
              </Label>
              <Input
                id="categoryName"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                className="col-span-3"
                placeholder="Введіть назву категорії"
                onKeyDown={e => {
                  if (e.key === "Enter" && formName.trim()) {
                    handleSave();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            {editingCategory && (
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeletePending}>
                Видалити
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleCloseDialog}
              disabled={createMutation.isPending || updateMutation.isPending}>
              Відмінити
            </Button>
            <Button
              onClick={handleSave}
              disabled={
                !formName.trim() ||
                createMutation.isPending ||
                updateMutation.isPending
              }>
              {createMutation.isPending || updateMutation.isPending
                ? "Збереження..."
                : "Зберегти"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        isOpen={confirmDelete.isOpen}
        onClose={confirmDelete.close}
        onConfirm={confirmDelete.confirm}
        title={confirmDelete.title}
        description={confirmDelete.description}
      />
    </>
  );
}
