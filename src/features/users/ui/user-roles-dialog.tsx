"use client";

import React, { useMemo, useState } from "react";

import Image from "next/image";

import { useAssignRoles } from "@/hooks/use-assign-roles";
import { useRoles } from "@/hooks/use-roles";
import PermisionImage from "@/public/permission.png";
import { toast } from "sonner";

import {
  PermissionAction,
  PermissionModule,
  Role,
} from "@/features/auth/types";

import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Separator } from "@/shared/ui/separator";

const modules = Object.values(PermissionModule);
const columns: PermissionAction[] = [
  PermissionAction.Read,
  PermissionAction.Create,
  PermissionAction.Update,
  PermissionAction.Delete,
];
const levels = ["Forbidden", "Limited", "Authorized"];

export function UserRolesDialog({
  isOpen,
  onClose,
  userId,
}: {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
}) {
  const { roles } = useRoles();
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const { mutate: assignRoles, isPending } = useAssignRoles(userId);

  const hasPerm = useMemo(() => {
    // Combine all permissions from all selected roles
    const allPermissions = new Set<string>();
    selectedRoles.forEach(role => {
      role.permissions?.forEach(perm => allPermissions.add(perm));
    });
    return (perm: string) => allPermissions.has(perm);
  }, [selectedRoles]);

  const handleSubmit = () => {
    if (!userId) {
      toast.error("Помилка: не вказано ID користувача");
      return;
    }
    const roleIds = selectedRoles.map(role => role.id);
    assignRoles(roleIds, {
      onSuccess: () => {
        toast.success("Ролі успішно призначено");
        onClose();
      },
      onError: (err: unknown) => {
        const message =
          typeof err === "object" && err && "message" in err
            ? String((err as { message?: string }).message)
            : undefined;
        toast.error(message || "Не вдалося призначити ролі");
      },
    });
  };

  const handleCancel = () => {
    setSelectedRoles([]);
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl rounded-[16px] p-6">
        <DialogHeader>
          <DialogTitle className="text-[#3A4754]">Настройка ролі</DialogTitle>
        </DialogHeader>

        {/* Top flags grid */}
        <div className="grid grid-cols-3 gap-6">
          {roles.map(role => (
            <label
              key={role.id}
              className="flex items-center gap-2 text-sm text-[#3A4754]">
              <Checkbox
                checked={
                  selectedRoles.find(r => r.id === role.id) ? true : false
                }
                onCheckedChange={() => {
                  if (selectedRoles.find(r => r.id === role.id)) {
                    setSelectedRoles(prev =>
                      prev.filter(r => r.id !== role.id)
                    );
                  } else {
                    setSelectedRoles(prev => [...prev, role]);
                  }
                }}
              />
              {role.name}
            </label>
          ))}
        </div>

        <Separator className="my-4" />

        {/* Permissions matrix for selected role */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-6 px-4 pb-2 text-xs text-[#6D7A87]">
              <div className="text-left">
                {selectedRoles.length > 0
                  ? selectedRoles.length === 1
                    ? selectedRoles[0].name
                    : `Об'єднані права (${selectedRoles.length} ролей)`
                  : ""}
              </div>
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
                    const authorized = hasPerm(`${m}:${col}`);
                    const limited = hasPerm(`${m}:${col}-limited`);
                    const forbidden = !authorized && !limited;
                    return (
                      <div
                        key={col}
                        className="flex items-center justify-center gap-1 relative">
                        <Image
                          src={PermisionImage}
                          alt="Permision"
                          width={16}
                          height={16}
                        />
                        <div className="absolute top-0 right-0 w-full h-full flex flex-col  justify-between items-center">
                          <Checkbox
                            className="w-4 h-4 rounded-full"
                            checked={authorized}
                          />
                          <Checkbox
                            className="w-4 h-4 rounded-full"
                            checked={limited}
                          />
                          <Checkbox
                            className="w-4 h-4 rounded-full"
                            checked={forbidden}
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
            onClick={handleCancel}
            disabled={isPending}>
            Відхилити
          </Button>
          <Button
            variant="balck"
            size="lg"
            className="rounded-[48px] h-[44px]"
            onClick={handleSubmit}
            disabled={isPending || !userId || selectedRoles.length === 0}>
            зберегти
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
