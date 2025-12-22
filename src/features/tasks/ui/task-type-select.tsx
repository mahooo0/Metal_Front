"use client";

import React, { useMemo, useState } from "react";

import {
  useCreateTaskType,
  useDeleteTaskType,
  useTaskTypes,
  useUpdateTaskType,
} from "@/hooks/use-task-types";
import { useConfirm } from "@/hooks/use-confirm";
import { ChevronDown, Pencil, Plus, Search, Trash2 } from "lucide-react";

import { TaskType } from "@/features/tasks/types/task-type.types";
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

interface TaskTypeSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function TaskTypeSelect({
  value,
  onValueChange,
  placeholder = "Оберіть тип задачі",
}: TaskTypeSelectProps) {
  const { taskTypes, isLoading } = useTaskTypes();
  const createMutation = useCreateTaskType();
  const updateMutation = useUpdateTaskType();
  const deleteMutation = useDeleteTaskType();

  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState<TaskType | null>(null);
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
    defaultTitle: "Видалити тип задачі?",
    defaultDescription:
      "Ви впевнені, що хочете видалити цей тип задачі? Цю дію неможливо скасувати.",
  });

  const filteredTypes = useMemo(() => {
    if (!searchQuery) return taskTypes;
    return taskTypes.filter(type =>
      type.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [taskTypes, searchQuery]);

  const handleOpenDialog = (type?: TaskType) => {
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
      title: "Видалити тип задачі?",
      description: `Ви впевнені, що хочете видалити тип задачі "${editingType.name}"? Цю дію неможливо скасувати.`,
    });
  };

  const handleDeleteFromList = (typeId: string, typeName: string) => {
    setDeletingTypeId(typeId);
    confirmDelete.open({
      title: "Видалити тип задачі?",
      description: `Ви впевнені, що хочете видалити тип задачі "${typeName}"? Цю дію неможливо скасувати.`,
    });
  };

  const selectedTypeName = useMemo(
    () => taskTypes.find(type => type.id === value)?.name || "",
    [taskTypes, value]
  );

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 justify-between text-left font-normal border border-[#C8CDD2] text-sm">
            {value ? selectedTypeName : placeholder}
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
            ) : filteredTypes.length === 0 ? (
              <div className="p-4 text-center text-sm text-[#B6BDC3]">
                {searchQuery ? "Нічого не знайдено" : "Немає типів задач"}
              </div>
            ) : (
              <>
                {filteredTypes.map(type => (
                  <div
                    key={type.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      onValueChange(type.id);
                      setSearchQuery("");
                    }}>
                    <span className="text-sm">{type.name}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={e => {
                          e.stopPropagation();
                          handleOpenDialog(type);
                        }}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-500 hover:text-red-700"
                        onClick={e => {
                          e.stopPropagation();
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
          <div className="p-2 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-blue-600 hover:text-blue-800"
              onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Додати новий тип
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
              {editingType ? "Редагувати тип задачі" : "Додати новий тип задачі"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Назва
              </Label>
              <Input
                id="name"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                className="col-span-3"
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

