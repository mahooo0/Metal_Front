"use client";

import React, { useMemo, useState } from "react";

import { useConfirm } from "@/hooks/use-confirm";
import { useMaterialCategories } from "@/hooks/use-material-categories";
import {
  useCreateMetalBrand,
  useDeleteMetalBrand,
  useMetalBrands,
  useUpdateMetalBrand,
} from "@/hooks/use-metal-brands";
import { MetalBrand } from "@/service/metal-brands.service";
import { ChevronDown, Pencil, Plus, Search, Trash2 } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface MetalBrandSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function MetalBrandSelect({
  value,
  onValueChange,
  placeholder = "Оберіть марку металу",
}: MetalBrandSelectProps) {
  const { metalBrands, isLoading } = useMetalBrands();
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useMaterialCategories({ page: 1, limit: 100 });
  const categories = categoriesData?.data || [];

  const createMutation = useCreateMetalBrand();
  const updateMutation = useUpdateMetalBrand();
  const deleteMutation = useDeleteMetalBrand();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<MetalBrand | null>(null);
  const [formName, setFormName] = useState("");
  const [formCategoryId, setFormCategoryId] = useState("");
  const [deletingBrandId, setDeletingBrandId] = useState<string | null>(null);

  const confirmDelete = useConfirm({
    onConfirm: () => {
      if (deletingBrandId) {
        deleteMutation.mutate(deletingBrandId, {
          onSuccess: () => {
            if (value === deletingBrandId) {
              onValueChange("");
            }
            if (editingBrand?.id === deletingBrandId) {
              handleCloseDialog();
            }
            setDeletingBrandId(null);
          },
        });
      }
    },
    defaultTitle: "Видалити марку металу?",
    defaultDescription:
      "Ви впевнені, що хочете видалити цю марку металу? Цю дію неможливо скасувати.",
  });

  const filteredBrands = useMemo(() => {
    if (!searchQuery) return metalBrands;
    return metalBrands.filter(brand =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [metalBrands, searchQuery]);

  const handleOpenDialog = (brand?: MetalBrand) => {
    if (brand) {
      setEditingBrand(brand);
      setFormName(brand.name);
      setFormCategoryId(brand.categoryId || "");
    } else {
      setEditingBrand(null);
      setFormName("");
      setFormCategoryId("");
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingBrand(null);
    setFormName("");
    setFormCategoryId("");
  };

  const handleSave = () => {
    if (!formName.trim() || !formCategoryId) return;

    if (editingBrand) {
      updateMutation.mutate(
        {
          id: editingBrand.id,
          data: { name: formName.trim(), categoryId: formCategoryId },
        },
        {
          onSuccess: () => {
            handleCloseDialog();
          },
        }
      );
    } else {
      createMutation.mutate(
        { name: formName.trim(), categoryId: formCategoryId },
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
    if (!editingBrand) return;
    setDeletingBrandId(editingBrand.id);
    confirmDelete.open({
      title: "Видалити марку металу?",
      description: `Ви впевнені, що хочете видалити марку металу "${editingBrand.name}"? Цю дію неможливо скасувати.`,
    });
  };

  const handleDeleteFromList = (brandId: string, brandName: string) => {
    setDeletingBrandId(brandId);
    confirmDelete.open({
      title: "Видалити марку металу?",
      description: `Ви впевнені, що хочете видалити марку металу "${brandName}"? Цю дію неможливо скасувати.`,
    });
  };

  const selectedBrandName = useMemo(
    () => metalBrands.find(brand => brand.id === value)?.name || "",
    [metalBrands, value]
  );

  const isFormValid = formName.trim() && formCategoryId;

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
              {value ? selectedBrandName : placeholder}
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
            ) : filteredBrands.length === 0 ? (
              <div className="p-4 text-center text-sm text-[#B6BDC3]">
                {searchQuery ? "Нічого не знайдено" : "Немає марок металу"}
              </div>
            ) : (
              <>
                {filteredBrands.map(brand => (
                  <div
                    key={brand.id}
                    className={`flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer ${
                      value === brand.id ? "bg-gray-50" : ""
                    }`}
                    onClick={() => {
                      onValueChange(brand.id);
                      setSearchQuery("");
                      setIsOpen(false);
                    }}>
                    <span className="text-sm">{brand.name}</span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={e => {
                          e.stopPropagation();
                          handleOpenDialog(brand);
                        }}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-500 hover:text-red-700"
                        onClick={e => {
                          e.stopPropagation();
                          handleDeleteFromList(brand.id, brand.name);
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
              Додати нову марку
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
              {editingBrand
                ? "Редагувати марку металу"
                : "Додати нову марку металу"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex  flex-col gap-4">
              <Label htmlFor="brandName" className="text-right">
                Назва
              </Label>
              <Input
                id="brandName"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                className="col-span-3"
                placeholder="Введіть назву марки"
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="brandCategory" className="text-right">
                Категорія
              </Label>
              <Select value={formCategoryId} onValueChange={setFormCategoryId}>
                <SelectTrigger className="w-full min-h-[48px] rounded-[48px] bg-white px-4 py-3 justify-between text-left font-normal border border-[#C8CDD2] text-sm">
                  <SelectValue placeholder="Оберіть категорію" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingCategories ? (
                    <div className="px-2 py-1.5 text-sm text-[#B6BDC3]">
                      Завантаження...
                    </div>
                  ) : categories.length === 0 ? (
                    <div className="px-2 py-1.5 text-sm text-[#B6BDC3]">
                      Немає категорій
                    </div>
                  ) : (
                    categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex grid-cols-2 grid  gap-2">
            <Button
              variant="outline"
              size="lg"
              onClick={handleCloseDialog}
              disabled={createMutation.isPending || updateMutation.isPending}>
              Відмінити
            </Button>
            <Button
              type="button"
              size="lg"
              onClick={handleSave}
              disabled={
                !isFormValid ||
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
