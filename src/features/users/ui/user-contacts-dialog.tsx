"use client";

import React, { useMemo, useState } from "react";

import { useAddUserPhone, useDeleteUserPhone } from "@/hooks/use-user-phones";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import { PhoneInputField } from "./phone-input-field";

export function UserContactsDialog({
  isOpen,
  onClose,
  initialPhones = [],
  onSave,
  userId,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialPhones?: string[];
  onSave?: (phones: string[]) => void;
  userId?: string;
}) {
  const sanitized = useMemo(
    () => initialPhones.filter(Boolean),
    [initialPhones]
  );
  const [phones, setPhones] = useState<string[]>(sanitized);
  const [newPhone, setNewPhone] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");

  const isValidE164 = (value: string) => {
    return /^\+[1-9]\d{7,14}$/.test(value);
  };

  const { addPhone, isPending: isAddPending } = useAddUserPhone(userId);
  const { deletePhone, isPending: isDeletePending } =
    useDeleteUserPhone(userId);

  // Синхронизируем состояние с входящими телефонами при открытии/обновлении
  React.useEffect(() => {
    setPhones(sanitized);
  }, [sanitized, isOpen]);

  const handleAdd = () => {
    if (!newPhone) {
      setPhoneError("Введіть номер телефону");
      return;
    }
    if (!isValidE164(newPhone)) {
      setPhoneError("Невірний формат. Використовуйте формат +1234567890");
      return;
    }
    setPhoneError("");
    // Call API, then update local state on success
    addPhone(newPhone, {
      onSuccess: () => {
        setPhones(prev => [...prev, newPhone]);
        setNewPhone("");
        toast.success("Номер додано");
      },
      onError: (err: unknown) => {
        const message =
          typeof err === "object" && err && "message" in err
            ? String((err as { message?: string }).message)
            : undefined;
        toast.error(message || "Не вдалося додати номер");
      },
    });
  };

  const handleDelete = (idx: number) => {
    const phone = phones[idx];
    deletePhone(phone, {
      onSuccess: () => {
        setPhones(prev => prev.filter((_, i) => i !== idx));
        toast.success("Номер видалено");
      },
      onError: (err: unknown) => {
        const message =
          typeof err === "object" && err && "message" in err
            ? String((err as { message?: string }).message)
            : undefined;
        toast.error(message || "Не вдалося видалити номер");
      },
    });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(phones);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-lg rounded-[16px] p-6">
        <DialogHeader className="gap-1">
          <DialogTitle className="text-[18px] font-semibold text-[#3A4754]">
            Контактні телефони
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-3">
            {phones.length === 0 ? (
              <div className="text-sm text-[#6D7A87]">Немає номерів</div>
            ) : (
              phones.map((p, idx) => (
                <div
                  key={`${p}-${idx}`}
                  className="flex items-center gap-3 bg-[#F7F8FA] border border-[#EDEEF0] rounded-[12px] px-3 py-2">
                  <div className="flex-1 text-sm text-[#3A4754]">{p}</div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(idx)}
                    disabled={isDeletePending}
                    className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-600 border border-transparent">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1">
              <PhoneInputField
                value={newPhone}
                onChange={v => setNewPhone(v)}
                placeholder="+38 098 888 88 88"
                className="w-full"
                error={!!phoneError}
              />
              {phoneError && (
                <div className="mt-1 text-xs text-red-500">{phoneError}</div>
              )}
            </div>
            <Button
              type="button"
              onClick={handleAdd}
              variant="balck"
              disabled={isAddPending}
              className="h-[42px] rounded-full">
              <Plus className="h-4 w-4 mr-2" />
              Додати
            </Button>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            type="button"
            variant="BlackTransparent"
            onClick={onClose}
            className="h-[42px] rounded-full">
            Скасувати
          </Button>
          <Button
            type="button"
            variant="balck"
            onClick={handleSave}
            className="h-[42px] rounded-full">
            Зберегти
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
