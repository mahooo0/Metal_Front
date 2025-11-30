"use client";

import React, { Suspense, useState } from "react";

import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteUser } from "@/hooks/use-delete-user";
import { PlusIcon } from "lucide-react";

import { CounterpartiesFilter } from "@/features/counterparties/ui";
import { UserItem } from "@/features/users/types/user.types";
import { AddUserDialog, ConfirmDialog, UsersTable } from "@/features/users/ui";

import { Button } from "@/shared/ui/button";

export default function UsersPageClient() {
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<UserItem | null>(null);
  const { deleteUser, isPending: isDeleting } = useDeleteUser();

  const confirmDelete = useConfirm({
    onConfirm: () => {
      if (deletingUser) {
        deleteUser(deletingUser.id);
        setDeletingUser(null);
      }
    },
    defaultTitle: "Видалити користувача?",
    defaultDescription:
      "Ви впевнені, що хочете видалити цього користувача? Цю дію неможливо скасувати.",
  });

  const handleDeleteUser = (user: UserItem) => {
    setDeletingUser(user);
    confirmDelete.open({
      title: "Видалити користувача?",
      description: `Ви впевнені, що хочете видалити користувача ${user.name || user.contacts}? Цю дію неможливо скасувати.`,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <h1 className="text-[#3A4754] text-[32px] font-[700]">
          Користувачі <span className="text-[#B6BDC3] ">(205)</span>
        </h1>
        <Button
          variant="balck"
          size="lg"
          onClick={() => setIsAddUserDialogOpen(true)}>
          <PlusIcon className="w-5 h-5" /> Додати юзера
        </Button>
      </div>
      <Suspense
        fallback={
          <div className="bg-white rounded-2xl p-6 space-y-6 mt-5">
            Завантаження фільтрів...
          </div>
        }>
        <CounterpartiesFilter />
      </Suspense>
      <Suspense fallback={<div className="mt-5">Завантаження таблиці...</div>}>
        <UsersTable onDeleteRow={handleDeleteUser} />
      </Suspense>

      <AddUserDialog
        isOpen={isAddUserDialogOpen}
        onClose={() => setIsAddUserDialogOpen(false)}
      />

      {/* Delete User Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDelete.isOpen}
        onClose={confirmDelete.close}
        onConfirm={confirmDelete.confirm}
        title={confirmDelete.title}
        description={confirmDelete.description}
        isPending={isDeleting}
      />
    </div>
  );
}
