"use client";

import React, { useEffect, useMemo, useState } from "react";

import Image from "next/image";

import { useCreateRole } from "@/hooks/use-create-role";
import { useUpdateRole } from "@/hooks/use-update-role";
import PermisionImage from "@/public/permission.png";
import { RoleDto } from "@/service/roles.service";
import { toast } from "sonner";

import { PermissionAction, PermissionModule } from "@/features/auth/types";

import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Separator } from "@/shared/ui/separator";

const modules = Object.values(PermissionModule);
const columns: PermissionAction[] = [
  PermissionAction.Read,
  PermissionAction.Create,
  PermissionAction.Update,
  PermissionAction.Delete,
];
const levels = ["Forbidden", "Limited", "Authorized"];

type PermissionLevel = "forbidden" | "limited" | "authorized";

interface AddRoleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: RoleDto | null;
}

export function AddRoleDialog({
  isOpen,
  onClose,
  initialData,
}: AddRoleDialogProps) {
  const isEditMode = !!initialData;
  const [roleName, setRoleName] = useState("");
  // Храним уровень для каждого permission: "module:action" -> "forbidden" | "limited" | "authorized"
  const [permissionLevels, setPermissionLevels] = useState<
    Map<string, PermissionLevel>
  >(new Map());
  const { createRole, isPending: isCreatePending } = useCreateRole();
  const { updateRole, isPending: isUpdatePending } = useUpdateRole();
  const isPending = isCreatePending || isUpdatePending;

  // Загрузка данных при редактировании
  useEffect(() => {
    if (initialData && isOpen) {
      setRoleName(initialData.name);

      // Парсим permissions и устанавливаем уровни
      const levels = new Map<string, PermissionLevel>();
      initialData.permissions.forEach(perm => {
        if (perm.endsWith("-limited")) {
          // Убираем суффикс "-limited"
          const basePermission = perm.replace("-limited", "");
          levels.set(basePermission, "limited");
        } else {
          // Обычный permission
          levels.set(perm, "authorized");
        }
      });
      setPermissionLevels(levels);
    } else if (!initialData && isOpen) {
      // Сброс при создании новой роли
      setRoleName("");
      setPermissionLevels(new Map());
    }
  }, [initialData, isOpen]);

  // Получить уровень для permission
  const getPermissionLevel = (
    module: PermissionModule,
    action: PermissionAction
  ): PermissionLevel => {
    const permission = `${module}:${action}`;
    return permissionLevels.get(permission) || "forbidden";
  };

  // Установить уровень для permission
  const setPermissionLevel = (
    module: PermissionModule,
    action: PermissionAction,
    level: PermissionLevel
  ) => {
    const permission = `${module}:${action}`;
    setPermissionLevels(prev => {
      const newMap = new Map(prev);
      if (level === "forbidden") {
        newMap.delete(permission);
      } else {
        newMap.set(permission, level);
      }
      return newMap;
    });
  };

  // Формирование массива permissions для отправки
  const permissionsArray = useMemo(() => {
    const permissions: string[] = [];
    permissionLevels.forEach((level, permission) => {
      if (level === "authorized") {
        permissions.push(permission);
      } else if (level === "limited") {
        permissions.push(`${permission}-limited`);
      }
      // forbidden - ничего не добавляем
    });
    return permissions;
  }, [permissionLevels]);

  const handleSubmit = () => {
    if (!roleName.trim()) {
      toast.error("Введіть назву ролі");
      return;
    }

    // Проверяем, есть ли хотя бы одно не-forbidden право
    const hasAnyPermission = Array.from(permissionLevels.values()).some(
      level => level !== "forbidden"
    );

    if (!hasAnyPermission) {
      toast.error("Виберіть хоча б одне право доступу");
      return;
    }

    if (isEditMode && initialData) {
      updateRole(
        {
          id: initialData.id,
          name: roleName.trim(),
          permissions: permissionsArray,
        },
        {
          onSuccess: () => {
            handleClose();
          },
          onError: () => {
            // Ошибка уже обрабатывается в хуке
          },
        }
      );
    } else {
      createRole(
        {
          name: roleName.trim(),
          permissions: permissionsArray,
        },
        {
          onSuccess: () => {
            handleClose();
          },
          onError: () => {
            // Ошибка уже обрабатывается в хуке
          },
        }
      );
    }
  };

  const handleClose = () => {
    setRoleName("");
    setPermissionLevels(new Map());
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && handleClose()}>
      <DialogContent className="sm:max-w-3xl rounded-[16px] p-6">
        <DialogHeader>
          <DialogTitle className="text-[#3A4754]">
            {isEditMode ? "Редагувати роль" : "Додати роль"}
          </DialogTitle>
        </DialogHeader>

        {/* Поле для ввода имени роли */}
        <div className="space-y-2">
          <Label htmlFor="role-name" className="text-[#3A4754]">
            Назва ролі
          </Label>
          <Input
            id="role-name"
            value={roleName}
            onChange={e => setRoleName(e.target.value)}
            placeholder="Введіть назву ролі"
            className="w-full"
          />
        </div>

        <Separator className="my-4" />

        {/* Permissions matrix */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-6 px-4 pb-2 text-xs text-[#6D7A87]">
              <div className="text-left">Модуль</div>
              {columns.map(c => (
                <div key={c} className="text-center capitalize">
                  {c}
                </div>
              ))}
              <div className="text-right pr-2">Level</div>
            </div>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {modules.map((m, idx) => (
                <div
                  key={`${m}-${idx}`}
                  className="grid grid-cols-6 items-center gap-2 bg-[#F7F8FA] rounded-full px-4 py-3">
                  <div className="text-sm text-[#3A4754] capitalize">{m}</div>
                  {columns.map(col => {
                    const currentLevel = getPermissionLevel(m, col);
                    const authorized = currentLevel === "authorized";
                    const limited = currentLevel === "limited";
                    const forbidden = currentLevel === "forbidden";

                    return (
                      <div
                        key={col}
                        className="flex items-center justify-center gap-1 relative">
                        <Image
                          src={PermisionImage}
                          alt="Permission"
                          width={16}
                          height={16}
                        />
                        <div className="absolute top-0 right-0 w-full h-full flex flex-col justify-between items-center">
                          <Checkbox
                            className="w-4 h-4 rounded-full"
                            checked={authorized}
                            onCheckedChange={checked => {
                              setPermissionLevel(
                                m,
                                col,
                                checked ? "authorized" : "forbidden"
                              );
                            }}
                          />
                          <Checkbox
                            className="w-4 h-4 rounded-full"
                            checked={limited}
                            onCheckedChange={checked => {
                              setPermissionLevel(
                                m,
                                col,
                                checked ? "limited" : "forbidden"
                              );
                            }}
                          />
                          <Checkbox
                            className="w-4 h-4 rounded-full"
                            checked={forbidden}
                            onCheckedChange={checked => {
                              setPermissionLevel(m, col, "forbidden");
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <div className="text-[10px] leading-3 text-right flex flex-col items-center justify-between gap-2 pr-2 text-[#6D7A87]">
                    {levels.map(l => (
                      <div key={l}>{l}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            variant="BlackTransparent"
            size="lg"
            className="rounded-[48px] h-[44px]"
            onClick={handleClose}
            disabled={isPending}>
            Відхилити
          </Button>
          <Button
            variant="balck"
            size="lg"
            className="rounded-[48px] h-[44px]"
            onClick={handleSubmit}
            disabled={
              isPending || !roleName.trim() || permissionsArray.length === 0
            }>
            Зберегти
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
