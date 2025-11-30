"use client";

import React, { useState } from "react";

import { useConfirm } from "@/hooks/use-confirm";
import { useCounterpartyById } from "@/hooks/use-counterparty-by-id";
import { useCreateCounterpartyContact } from "@/hooks/use-create-counterparty-contact";
import { useDeleteCounterpartyContact } from "@/hooks/use-delete-counterparty-contact";
import { useUpdateCounterparty } from "@/hooks/use-update-counterparty";
import { useUpdateCounterpartyContact } from "@/hooks/use-update-counterparty-contact";
import { UpdateCounterpartyDto } from "@/service/counterparties.service";
import { Loader2 } from "lucide-react";

import { CounterpartyContact } from "@/features/counterparties/types/counterparty.types";
import AddContactDialog, {
  AddContactDialogData,
} from "@/features/counterparties/ui/add-contact-dialog";
import CounterpartyContacts from "@/features/counterparties/ui/counterparty-contacts";
import CounterpartyDetails from "@/features/counterparties/ui/counterparty-details";
import CounterpartyDocuments from "@/features/counterparties/ui/counterparty-documents";
import CounterpartyOrdersTable from "@/features/counterparties/ui/counterparty-orders-table";
import EditCounterpartySheet from "@/features/counterparties/ui/edit-counterparty-sheet";
import AccountMovement from "@/features/order/ui/account-movement";
import { ConfirmDialog } from "@/features/users/ui";

export default function CounterpartiesByIdPageClient({ id }: { id: string }) {
  const { counterparty, isLoading, error } = useCounterpartyById(id);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddContactDialogOpen, setIsAddContactDialogOpen] = useState(false);
  const [editingContact, setEditingContact] =
    useState<CounterpartyContact | null>(null);
  const { updateCounterparty, isPending: isUpdating } = useUpdateCounterparty();
  const { createContact, isPending: isCreatingContact } =
    useCreateCounterpartyContact(id);
  const { updateContact: updateContactMutation, isPending: isUpdatingContact } =
    useUpdateCounterpartyContact(id);
  const { deleteContact, isPending: isDeletingContact } =
    useDeleteCounterpartyContact(id);

  const [deletingContact, setDeletingContact] =
    useState<CounterpartyContact | null>(null);

  const confirmDeleteContact = useConfirm({
    onConfirm: () => {
      if (deletingContact) {
        deleteContact(deletingContact.id);
        setDeletingContact(null);
      }
    },
    defaultTitle: "Видалити контакт?",
    defaultDescription:
      "Ви впевнені, що хочете видалити цей контакт? Цю дію неможливо скасувати.",
  });

  // Обработка загрузки
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-600">Завантаження контрагента...</span>
      </div>
    );
  }

  // Обработка ошибки
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-2">
            Помилка завантаження контрагента
          </p>
          <p className="text-gray-500 text-sm">
            {error instanceof Error ? error.message : "Невідома помилка"}
          </p>
        </div>
      </div>
    );
  }

  if (!counterparty) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Контрагент не знайдено</p>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = (data: UpdateCounterpartyDto) => {
    // Prepare data: convert empty strings to null for optional fields
    const updateData: UpdateCounterpartyDto = {
      name: data.name,
      legalAddress: data.legalAddress,
      actualAddress: data.actualAddress,
      comment: data.comment?.trim() || undefined,
      bankDetails: data.bankDetails?.trim() || undefined,
      edrpou: data.edrpou?.trim() || undefined,
      ipn: data.ipn?.trim() || undefined,
      vatCertificate: data.vatCertificate?.trim() || undefined,
    };

    updateCounterparty(
      {
        id: counterparty.id,
        ...updateData,
      },
      {
        onSuccess: () => {
          setIsEditDialogOpen(false);
        },
        onError: () => {
          // Error already handled in the hook
        },
      }
    );
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleAddContact = () => {
    setIsAddContactDialogOpen(true);
  };

  const handleSaveContact = (data: AddContactDialogData) => {
    if (editingContact) {
      // Update existing contact
      updateContactMutation(
        {
          contactId: editingContact.id,
          data: {
            phone: data.phone,
            email: data.email,
          },
        },
        {
          onSuccess: () => {
            setIsAddContactDialogOpen(false);
            setEditingContact(null);
          },
          onError: () => {
            // Error already handled in the hook
          },
        }
      );
    } else {
      // Create new contact
      createContact(
        {
          phone: data.phone,
          email: data.email,
        },
        {
          onSuccess: () => {
            setIsAddContactDialogOpen(false);
          },
          onError: () => {
            // Error already handled in the hook
          },
        }
      );
    }
  };

  const handleCloseContactDialog = () => {
    setIsAddContactDialogOpen(false);
    setEditingContact(null);
  };

  const handleEditContact = (contact: CounterpartyContact) => {
    setEditingContact(contact);
    setIsAddContactDialogOpen(true);
  };

  const handleDeleteContact = (contact: CounterpartyContact) => {
    setDeletingContact(contact);
    confirmDeleteContact.open({
      title: "Видалити контакт?",
      description: `Ви впевнені, що хочете видалити контакт ${contact.phone || contact.email}? Цю дію неможливо скасувати.`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <CounterpartyDetails
            counterparty={counterparty}
            onEdit={handleEdit}
          />
        </div>

        <div className="col-span-4 space-y-6">
          <AccountMovement />
        </div>
        <div className="col-span-8">
          <CounterpartyOrdersTable />
        </div>
        <div className="col-span-4 space-y-6">
          <CounterpartyContacts
            contacts={counterparty.contacts}
            onAddContact={handleAddContact}
            onEditContact={handleEditContact}
            onDeleteContact={handleDeleteContact}
          />
          <CounterpartyDocuments documents={counterparty.documents} />
        </div>
      </div>

      {/* Edit Counterparty Sheet */}
      <EditCounterpartySheet
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        onSave={handleSaveEdit}
        counterparty={counterparty}
        isPending={isUpdating}
      />

      {/* Add/Edit Contact Dialog */}
      <AddContactDialog
        isOpen={isAddContactDialogOpen}
        onClose={handleCloseContactDialog}
        onSave={handleSaveContact}
        initialData={
          editingContact
            ? {
                phone: editingContact.phone,
                email: editingContact.email,
              }
            : null
        }
        isPending={isCreatingContact || isUpdatingContact}
      />

      {/* Delete Contact Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDeleteContact.isOpen}
        onClose={confirmDeleteContact.close}
        onConfirm={confirmDeleteContact.confirm}
        title={confirmDeleteContact.title}
        description={confirmDeleteContact.description}
        isPending={isDeletingContact}
      />
    </div>
  );
}
