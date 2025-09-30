"use client";

import React, { useState } from "react";

import CounterpartyDocuments from "@/features/counterparties/ui/counterparty-documents";
import {
  RestorePasswordDialog,
  UserContactsCard,
  UserNotificationsCard,
  UserProfileCard,
  UserRolesCard,
} from "@/features/users/ui";

export default function UsersByIdPageClient() {
  const [isRestorePasswordDialogOpen, setIsRestorePasswordDialogOpen] =
    useState(false);

  const handleOpenRestorePasswordDialog = () => {
    setIsRestorePasswordDialogOpen(true);
  };

  const handleCloseRestorePasswordDialog = () => {
    setIsRestorePasswordDialogOpen(false);
  };

  const handleSavePasswordMethod = (method: "email" | "phone") => {
    console.log("Password restore method selected:", method);
    // TODO: Implement password restore functionality
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8 space-y-6">
        <UserProfileCard
          onOpenRestorePassword={handleOpenRestorePasswordDialog}
        />
        <CounterpartyDocuments />
      </div>
      <div className="col-span-4 space-y-6">
        <UserRolesCard />
        <UserContactsCard />
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
