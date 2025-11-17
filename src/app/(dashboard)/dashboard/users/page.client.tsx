"use client";

import React, { Suspense, useState } from "react";

import { PlusIcon } from "lucide-react";

import { CounterpartiesFilter } from "@/features/counterparties/ui";
import { AddUserDialog, UsersTable } from "@/features/users/ui";

import { Button } from "@/shared/ui/button";

export default function UsersPageClient() {
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);

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
        <UsersTable />
      </Suspense>

      <AddUserDialog
        isOpen={isAddUserDialogOpen}
        onClose={() => setIsAddUserDialogOpen(false)}
      />
    </div>
  );
}
