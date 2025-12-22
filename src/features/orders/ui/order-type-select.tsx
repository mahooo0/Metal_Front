"use client";

import React, { useMemo, useState } from "react";

import { useConfirm } from "@/hooks/use-confirm";
import {
  useCreateOrderType,
  useDeleteOrderType,
  useOrderTypes,
  useUpdateOrderType,
} from "@/hooks/use-order-types";
import { ChevronDown, Pencil, Plus, Search, Trash2 } from "lucide-react";

import { OrderType } from "@/features/orders/types/order-type.types";
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

interface OrderTypeSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function OrderTypeSelect({
  value,
  onValueChange,
  placeholder = "Оберіть тип замовлення",
}: OrderTypeSelectProps) {
  const { orderTypes, isLoading } = useOrderTypes();
  const createMutation = useCreateOrderType();
  const updateMutation = useUpdateOrderType();
  const deleteMutation = useDeleteOrderType();

  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState<OrderType | null>(null);
  const [formName, setFormName] = useState("");
  const [deletingTypeId, setDeletingTypeId] = useState<string | null>(null);

  const confirmDelete = useConfirm({
    onConfirm: () => {
      if (deletingTypeId) {
        deleteMutation.mutate(deletingTypeId, {
          onSuccess: () => {
            if (value === deletingTypeId) {
              onValueChange("");
            }
            if (editingType?.id === deletingTypeId) {
              handleCloseDialog();
            }
            setDeletingTypeId(null);
          },
        });
      }
    },
    defaultTitle: "Видалити тип замовлення?",
    defaultDescription:
      "Ви впевнені, що хочете видалити цей тип замовлення? Цю дію неможливо скасувати.",
  });

  const filteredTypes = useMemo(() => {
    if (!searchQuery) return orderTypes;
    return orderTypes.filter(type =>
      type.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [orderTypes, searchQuery]);

  const handleOpenDialog = (type?: OrderType) => {
    if (type) {
      setEditingType(type);
      setFormName(type.name);
    } else {
      setEditingType(null);
      setFormName("");
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingType(null);
    setFormName("");
  };

  const handleSave = () => {
    if (!formName.trim()) return;

    if (editingType) {
      updateMutation.mutate(
        { id: editingType.id, data: { name: formName.trim() } },
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
          },
        }
      );
    }
  };

  const handleDelete = () => {
    if (!editingType) return;
    setDeletingTypeId(editingType.id);
    confirmDelete.open({
      title: "Видалити тип замовлення?",
      description: `Ви впевнені, що хочете видалити тип замовлення "${editingType.name}"? Цю дію неможливо скасувати.`,
    });
  };

  const handleDeleteFromList = (typeId: string, typeName: string) => {
    setDeletingTypeId(typeId);
    confirmDelete.open({
      title: "Видалити тип замовлення?",
      description: `Ви впевнені, що хочете видалити тип замовлення "${typeName}"? Цю дію неможливо скасувати.`,
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const selectedType = orderTypes.find(type => type.id === value);

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 justify-between font-normal">
            <span className={value ? "" : "text-[#B6BDC3]"}>
              {selectedType ? selectedType.name : placeholder}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-(--radix-popover-trigger-width) p-0"
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
            ) : filteredTypes.length === 0 ? (
              <div className="p-4 text-center text-sm text-[#B6BDC3]">
                {searchQuery ? "Нічого не знайдено" : "Немає типів замовлень"}
              </div>
            ) : (
              <>
                {filteredTypes.map(type => (
                  <div
                    key={type.id}
                    className="flex items-center justify-between px-3 py-2 hover:bg-accent cursor-pointer group"
                    onClick={() => {
                      onValueChange(type.id);
                      setIsOpen(false);
                    }}>
                    <span>{type.name}</span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={e => {
                          e.stopPropagation();
                          setIsOpen(false);
                          handleOpenDialog(type);
                        }}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive"
                        onClick={e => {
                          e.stopPropagation();
                          setIsOpen(false);
                          handleDeleteFromList(type.id, type.name);
                        }}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {!isLoading && (
            <div className="p-2 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                onClick={() => {
                  setIsOpen(false);
                  handleOpenDialog();
                }}>
                <Plus className="h-4 w-4" />
                Додати новий тип
              </Button>
            </div>
          )}
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
              {editingType
                ? "Редагувати тип замовлення"
                : "Додати тип замовлення"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Назва</Label>
              <Input
                id="name"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                placeholder="Введіть назву типу замовлення"
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleSave();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            {editingType && (
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}>
                Видалити
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleCloseDialog}
              disabled={createMutation.isPending || updateMutation.isPending}>
              Скасувати
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
