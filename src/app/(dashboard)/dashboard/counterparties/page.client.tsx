"use client";

import { Suspense, useState } from "react";

import { useConfirm } from "@/hooks/use-confirm";
import { useCounterparties } from "@/hooks/use-counterparties";
import { useCreateCounterparty } from "@/hooks/use-create-counterparty";
import { useDeleteCounterparty } from "@/hooks/use-delete-counterparty";
import { Loader2, PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";

import { CounterpartyItem } from "@/features/counterparties/types/counterparty.types";
import AddCounterpartyDialog, {
  AddCounterpartyDialogData,
} from "@/features/counterparties/ui/add-counterparty-dialog";
import CounterpartiesTable from "@/features/counterparties/ui/counterparties-table";
import CounterpartiesFilter from "@/features/counterparties/ui/filter";
import { ConfirmDialog } from "@/features/users/ui";

import { PageHeader } from "@/shared/ui/page-header";

export default function CounterpartiesPageClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [searchParam] = useQueryState("search");
  const [edrpouParam] = useQueryState("edrpou");
  const [ipnParam] = useQueryState("ipn");
  const [sortByParam] = useQueryState("sortBy");
  const [sortOrderParam] = useQueryState("sortOrder");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Build filters object from URL params
  const filters = {
    ...(searchParam ? { search: searchParam } : {}),
    ...(edrpouParam ? { edrpou: edrpouParam } : {}),
    ...(ipnParam ? { ipn: ipnParam } : {}),
    sortBy: (sortByParam as "name" | "createdAt") || "createdAt",
    sortOrder: (sortOrderParam as "asc" | "desc") || "desc",
  };

  const { counterparties, meta, isLoading, error } = useCounterparties({
    page: currentPage,
    limit,
    ...filters,
  });

  const handleAddCounterparty = () => {
    setIsAddDialogOpen(true);
  };

  const { createCounterparty, isPending: isCreating } = useCreateCounterparty();
  const [deletingCounterparty, setDeletingCounterparty] =
    useState<CounterpartyItem | null>(null);
  const { deleteCounterparty, isPending: isDeleting } = useDeleteCounterparty();

  const confirmDelete = useConfirm({
    onConfirm: () => {
      if (deletingCounterparty) {
        deleteCounterparty(deletingCounterparty.id);
      }
    },
    defaultTitle: "Видалити контрагента?",
    defaultDescription: "Ви впевнені, що хочете видалити цього контрагента?",
  });

  const handleSaveCounterparty = (data: AddCounterpartyDialogData) => {
    createCounterparty(
      {
        name: data.name,
        comment: data.comment || undefined,
      },
      {
        onSuccess: () => {
          setIsAddDialogOpen(false);
        },
        onError: () => {
          // Ошибка уже обрабатывается в хуке
        },
      }
    );
  };

  const handleDeleteCounterparty = (counterparty: CounterpartyItem) => {
    setDeletingCounterparty(counterparty);
    confirmDelete.open({
      title: "Видалити контрагента?",
      description: `Ви впевнені, що хочете видалити контрагента "${counterparty.name}"? Цю дію неможливо скасувати.`,
    });
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1); // Reset to first page when limit changes
  };

  // Обработка загрузки
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-600">Завантаження контрагентів...</span>
      </div>
    );
  }

  // Обработка ошибки
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-2">
            Помилка завантаження контрагентів
          </p>
          <p className="text-gray-500 text-sm">
            {error instanceof Error ? error.message : "Невідома помилка"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <PageHeader
          title="Контрагенти"
          count={meta?.total}
          buttonText="Додати контрагента"
          buttonIcon={PlusIcon}
          buttonVariant="balck"
          onButtonClick={handleAddCounterparty}
        />
      </div>
      <Suspense
        fallback={
          <div className="bg-white rounded-2xl p-6 space-y-6 mt-5">
            Завантаження фільтрів...
          </div>
        }>
        <CounterpartiesFilter
          onFiltersChange={() => {
            setCurrentPage(1); // Reset to first page when filters change
          }}
        />
      </Suspense>
      <CounterpartiesTable
        data={counterparties}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        onDeleteRow={handleDeleteCounterparty}
        currentPage={meta?.page || 1}
        totalPages={meta?.totalPages || 1}
        total={meta?.total}
        limit={limit}
      />

      {/* Add Counterparty Dialog */}
      <AddCounterpartyDialog
        isOpen={isAddDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveCounterparty}
        title="Додати контрагента"
        isPending={isCreating}
      />

      {/* Delete Confirmation Dialog */}
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
