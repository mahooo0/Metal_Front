"use client";

import React, { useState } from "react";

import { useDeletePurchaseItem } from "@/hooks/use-delete-purchase-item";
import { usePurchaseById } from "@/hooks/use-purchase-by-id";
import { usePurchaseItems } from "@/hooks/use-purchase-items";
import { useReceivePurchaseItem } from "@/hooks/use-receive-purchase-item";
import { useSubmitPurchase } from "@/hooks/use-submit-purchase";
import { useUpdatePurchase } from "@/hooks/use-update-purchase";
import { useUpdatePurchaseItemStatus } from "@/hooks/use-update-purchase-item-status";
import { PurchaseItemStatus } from "@/service/purchase-items.service";
import { PurchaseStatus } from "@/service/purchases.service";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { useRouter } from "next/navigation";

import { ArrowLeftIcon, EllipsisIcon, Plus } from "lucide-react";

import {
  AddPurchaseItemSheet,
  EditPurchaseItemSheet,
  mapPurchaseItemToTableRow,
  PurchaseDetailSearch,
  PurchaseDetailTable,
  PurchaseDetailTableRow,
  PurchaseInfoCards,
} from "@/features/warehouse/purchase";

import { ConfirmDialog } from "@/features/users/ui/delete-role-confirm-dialog";

import { Button } from "@/shared/ui/button";

export default function PurchaseByIdPageClient({ id }: { id: string }) {
  const router = useRouter();

  // API hooks
  const { purchase, isLoading: isLoadingPurchase } = usePurchaseById(id);
  const { purchaseItems, isLoading: isLoadingItems } = usePurchaseItems(id);
  const { deletePurchaseItem, isPending: isDeletingItem } =
    useDeletePurchaseItem();
  const updatePurchaseMutation = useUpdatePurchase();
  const updateItemStatusMutation = useUpdatePurchaseItemStatus();
  const receiveItemMutation = useReceivePurchaseItem();
  const submitPurchaseMutation = useSubmitPurchase();

  // Local state
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Map data for table
  const tableData: PurchaseDetailTableRow[] = purchaseItems
    .map(mapPurchaseItemToTableRow)
    .filter(item =>
      searchTerm
        ? item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.type.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );

  // Check if all items are READY
  const allItemsReady =
    purchaseItems.length > 0 &&
    purchaseItems.every(item => item.status === "READY");

  // Handlers
  const handleBack = () => {
    router.push("/dashboard/warehouse/purchase");
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilter = () => {
    console.log("Filter clicked");
  };

  const handleStatusChange = (
    itemId: string,
    status: PurchaseItemStatus
  ) => {
    updateItemStatusMutation.mutate({
      purchaseId: id,
      itemId,
      status,
    });
  };

  const handleReceive = (itemId: string, receivedQuantity: number) => {
    receiveItemMutation.mutate({
      purchaseId: id,
      itemId,
      receivedQuantity,
    });
  };

  const handlePurchaseStatusChange = (status: PurchaseStatus) => {
    updatePurchaseMutation.mutate({
      id,
      data: { status },
    });
  };

  const handleSubmitPurchase = () => {
    submitPurchaseMutation.mutate(id);
  };

  const handleEditRow = (row: PurchaseDetailTableRow) => {
    setEditItemId(row.id);
  };

  const handleDeleteRow = (row: PurchaseDetailTableRow) => {
    setDeleteItemId(row.id);
  };

  const handleConfirmDelete = () => {
    if (deleteItemId) {
      deletePurchaseItem({ purchaseId: id, id: deleteItemId });
      setDeleteItemId(null);
    }
  };

  const handleDeleteFromEdit = (itemId: string) => {
    deletePurchaseItem({ purchaseId: id, id: itemId });
  };

  const isLoading = isLoadingPurchase || isLoadingItems;
  const isUpdating =
    updateItemStatusMutation.isPending ||
    receiveItemMutation.isPending ||
    isDeletingItem;

  const createdAtFormatted = purchase?.createdAt
    ? format(new Date(purchase.createdAt), "d MMMM", { locale: uk })
    : "";

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="lg" onClick={handleBack}>
            <ArrowLeftIcon className="w-5 h-5" /> Назад
          </Button>
          <h1 className="text-[#3A4754] text-[32px] font-[700]">
            Закупка{" "}
            <span className="text-[#B6BDC3]">
              ({purchase?.purchaseId || id})
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-[#6D7A87]">id : {id}</p>
          <p className="text-sm text-[#6D7A87]">
            Створено {createdAtFormatted}
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white w-[36px] h-[36px] rounded-full border border-[#B6BDC3] text-[#495969]">
            <EllipsisIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-[16px] p-6 mt-5">
        {/* Info Cards */}
        {isLoadingPurchase ? (
          <div className="grid grid-cols-3 gap-6 mb-6">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="bg-gray-100 animate-pulse h-24 rounded-[16px]"
              />
            ))}
          </div>
        ) : (
          <PurchaseInfoCards
            supplier={purchase?.supplier?.name}
            totalAmount={purchase?.totalAmount}
            status={purchase?.status}
            purchaseId={id}
            createdAt={purchase?.createdAt}
            allItemsReady={allItemsReady}
            onStatusChange={handlePurchaseStatusChange}
            onSubmit={handleSubmitPurchase}
            isSubmitting={submitPurchaseMutation.isPending}
            isUpdatingStatus={updatePurchaseMutation.isPending}
          />
        )}

        {/* Search and Filter + Add button */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <PurchaseDetailSearch
              onSearch={handleSearch}
              onFilter={handleFilter}
            />
          </div>
          <Button
            onClick={() => setIsAddItemOpen(true)}
            className="h-[42px] px-6 bg-[#3A4754] hover:bg-[#2A3A4A] rounded-[48px] gap-2">
            <Plus className="w-4 h-4" />
            Додати товар
          </Button>
        </div>
      </div>

      {/* Purchase Detail Table */}
      <PurchaseDetailTable
        data={tableData}
        isLoading={isLoading}
        purchaseId={id}
        onEditRow={handleEditRow}
        onDeleteRow={handleDeleteRow}
        onStatusChange={handleStatusChange}
        onReceive={handleReceive}
        isUpdating={isUpdating}
      />

      {/* Add Purchase Item Sheet */}
      <AddPurchaseItemSheet
        isOpen={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
        purchaseId={id}
      />

      {/* Edit Purchase Item Sheet */}
      <EditPurchaseItemSheet
        isOpen={!!editItemId}
        onClose={() => setEditItemId(null)}
        purchaseId={id}
        itemId={editItemId}
        onDelete={handleDeleteFromEdit}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteItemId}
        onClose={() => setDeleteItemId(null)}
        onConfirm={handleConfirmDelete}
        title="Видалити товар?"
        description="Ви впевнені, що хочете видалити цей товар? Цю дію неможливо скасувати."
      />
    </div>
  );
}
