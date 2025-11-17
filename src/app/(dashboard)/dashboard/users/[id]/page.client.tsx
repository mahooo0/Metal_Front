"use client";

import React, { useState } from "react";

import { useParams } from "next/navigation";

import { useUserProfile } from "@/hooks/use-user-profile";

import { useMe } from "@/features/auth/hooks";
import { User } from "@/features/auth/types/user.types";
import CounterpartyDocuments from "@/features/counterparties/ui/counterparty-documents";
import {
  RestorePasswordDialog,
  UserContactsCard,
  UserNotificationsCard,
  UserProfileCard,
  UserRolesCard,
} from "@/features/users/ui";

export default function UsersByIdPageClient({
  isProfile,
  userId: userIdProp,
}: {
  isProfile?: boolean;
  userId?: string;
}) {
  const params = useParams();
  const userId = userIdProp || (params?.id as string | undefined);

  const [isRestorePasswordDialogOpen, setIsRestorePasswordDialogOpen] =
    useState(false);

  // Получаем данные текущего пользователя, если это страница профиля
  const { user: profileUser, isLoading: isProfileLoading } = useMe(!!isProfile);

  // Получаем данные запрашиваемого пользователя, если это не страница профиля
  const { user: userById, isLoading: isUserLoading } = useUserProfile(
    userId,
    !isProfile
  );

  // Определяем, какого пользователя использовать
  const user = isProfile ? profileUser : userById;
  const isLoading = isProfile ? isProfileLoading : isUserLoading;

  const handleOpenRestorePasswordDialog = () => {
    setIsRestorePasswordDialogOpen(true);
  };

  const handleCloseRestorePasswordDialog = () => {
    setIsRestorePasswordDialogOpen(false);
  };

  const handleSavePasswordMethod = (_method: "email" | "phone") => {
    // TODO: Implement password restore functionality
  };

  // Обрабатываем состояние загрузки
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Завантаження...</div>
      </div>
    );
  }

  // Обрабатываем случай, когда пользователь не найден
  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">
          {isProfile
            ? "Не вдалося завантажити профіль"
            : "Користувача не знайдено"}
        </div>
      </div>
    );
  }

  // Подготовка контактной информации с безопасными проверками типов
  const uWithContacts = user as {
    extraPhones?: string[];
    email?: string;
    phone?: string;
  };
  const extraPhones: string[] = Array.isArray(uWithContacts.extraPhones)
    ? uWithContacts.extraPhones
    : [];
  const contactsInfo = {
    email: uWithContacts.email || "",
    phone1: extraPhones[0] || uWithContacts.phone || "",
    phone2: extraPhones[1] || "",
    viber: "",
    telegram: "",
    whatsapp: "",
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8 space-y-6">
        <UserProfileCard
          user={user as User}
          onOpenRestorePassword={handleOpenRestorePasswordDialog}
        />
        <CounterpartyDocuments />
      </div>
      <div className="col-span-4 space-y-6">
        <UserRolesCard userId={user.id} />
        <UserContactsCard
          contacts={contactsInfo}
          userId={user.id}
          extraPhones={extraPhones}
        />
        <UserNotificationsCard />
      </div>

      {/* Restore Password Dialog */}
      <RestorePasswordDialog
        isOpen={isRestorePasswordDialogOpen}
        onClose={handleCloseRestorePasswordDialog}
        onSave={handleSavePasswordMethod}
      />
    </div>
  );
}
