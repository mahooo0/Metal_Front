"use client";

import React, { useEffect, useState } from "react";

import { useUpdateUserProfile } from "@/hooks/use-update-user-profile";
import { toast } from "sonner";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Switch } from "@/shared/ui/switch";

export function UserProfileEditDialog({
  isOpen,
  onClose,
  userId,
  initial,
}: {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  initial?: {
    displayName?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    position?: string | null;
    isTwoFactorEnabled?: boolean;
  };
}) {
  const { updateProfile, isPending } = useUpdateUserProfile(userId);

  const [displayName, setDisplayName] = useState(initial?.displayName || "");
  const [email, setEmail] = useState(initial?.email || "");
  const [firstName, setFirstName] = useState(initial?.firstName || "");
  const [lastName, setLastName] = useState(initial?.lastName || "");
  const [position, setPosition] = useState(initial?.position || "");
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(
    Boolean(initial?.isTwoFactorEnabled)
  );

  useEffect(() => {
    setDisplayName(initial?.displayName || "");
    setEmail(initial?.email || "");
    setFirstName(initial?.firstName || "");
    setLastName(initial?.lastName || "");
    setPosition(initial?.position || "");
    setIsTwoFactorEnabled(Boolean(initial?.isTwoFactorEnabled));
  }, [initial, isOpen]);

  const handleSubmit = () => {
    updateProfile(
      {
        displayName,
        email,
        firstName,
        lastName,
        position: position || null,
        isTwoFactorEnabled,
      },
      {
        onSuccess: () => {
          toast.success("Профіль оновлено");
          onClose();
        },
        onError: (err: unknown) => {
          const message =
            typeof err === "object" && err && "message" in err
              ? String((err as { message?: string }).message)
              : undefined;
          toast.error(message || "Не вдалося оновити профіль");
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-lg rounded-[16px] p-6">
        <DialogHeader>
          <DialogTitle>Редагувати профіль</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-[#6D7A87] mb-1">
                Ім&apos;я
              </label>
              <Input
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-[#6D7A87] mb-1">
                Прізвище
              </label>
              <Input
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#6D7A87] mb-1">
              Відображуване ім&apos;я
            </label>
            <Input
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-[#6D7A87] mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-[#6D7A87] mb-1">Посада</label>
            <Input
              value={position || ""}
              onChange={e => setPosition(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#3A4754]">
              Двофакторна автентифікація
            </span>
            <Switch
              checked={isTwoFactorEnabled}
              onCheckedChange={setIsTwoFactorEnabled}
            />
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
            onClick={handleSubmit}
            disabled={isPending}
            className="h-[42px] rounded-full">
            Зберегти
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
