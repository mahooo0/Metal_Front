"use client";

import React, { useState, useMemo, useCallback } from "react";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeftIcon, EllipsisIcon, Plus } from "lucide-react";

import { useWriteOffById } from "@/hooks/use-write-off-by-id";
import { useUpdateWriteOffItem } from "@/hooks/use-update-write-off-item";
import { useRemoveWriteOffItem } from "@/hooks/use-remove-write-off-item";
import { useSubmitWriteOff } from "@/hooks/use-submit-write-off";
import { useApproveWriteOff } from "@/hooks/use-approve-write-off";
import { useRejectWriteOff } from "@/hooks/use-reject-write-off";

import {
  WriteOffItemsTable,
  WriteOffStats,
} from "@/features/warehouse/write-off";
import { AddWriteOffItemDialog } from "@/features/warehouse/write-off/ui/add-write-off-item-dialog";

import { Button } from "@/shared/ui/button";

export default function WriteOffByIdPageClient({ id }: { id: string }) {
  const router = useRouter();

  // Dialog state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // API hooks
  const { writeOff, isLoading } = useWriteOffById(id);

  // Mutation hooks
  const updateItemMutation = useUpdateWriteOffItem(id);
  const removeItemMutation = useRemoveWriteOffItem(id);
  const submitMutation = useSubmitWriteOff();
  const approveMutation = useApproveWriteOff();
  const rejectMutation = useRejectWriteOff();

  // Calculate totals from items
  const { totalQuantity, totalAmount, itemsCount } = useMemo(() => {
    if (!writeOff?.items) return { totalQuantity: 0, totalAmount: 0, itemsCount: 0 };

    let qty = 0;
    let amount = 0;

    writeOff.items.forEach(item => {
      qty += item.quantity;
      amount += item.amount;
    });

    return { totalQuantity: qty, totalAmount: amount, itemsCount: writeOff.items.length };
  }, [writeOff?.items]);

  // Get existing material IDs to prevent adding duplicates
  const existingMaterialIds = useMemo(() => {
    return writeOff?.items?.map(item => item.materialId) || [];
  }, [writeOff?.items]);

  // Handle update item
  const handleUpdateItem = useCallback(
    (itemId: string, data: { quantity: number; comment: string }) => {
      updateItemMutation.mutate({
        itemId,
        data: {
          quantity: data.quantity,
          comment: data.comment || undefined,
        },
      });
    },
    [updateItemMutation]
  );

  // Handle remove item
  const handleRemoveItem = useCallback(
    (itemId: string) => {
      removeItemMutation.mutate(itemId);
    },
    [removeItemMutation]
  );

  // Handle submit
  const handleSubmit = useCallback(() => {
    submitMutation.mutate(id, {
      onSuccess: () => {
        router.push("/dashboard/warehouse/write-off");
      },
    });
  }, [submitMutation, id, router]);

  // Handle approve
  const handleApprove = useCallback(() => {
    approveMutation.mutate(id, {
      onSuccess: () => {
        router.push("/dashboard/warehouse/write-off");
      },
    });
  }, [approveMutation, id, router]);

  // Handle reject
  const handleReject = useCallback(() => {
    rejectMutation.mutate(
      { writeOffId: id, reason: "Відхилено" },
      {
        onSuccess: () => {
          router.push("/dashboard/warehouse/write-off");
        },
      }
    );
  }, [rejectMutation, id, router]);

  // Handle continue later
  const handleContinueLater = useCallback(() => {
    router.push("/dashboard/warehouse/write-off");
  }, [router]);

  const handleBack = () => {
    router.push("/dashboard/warehouse/write-off");
  };

  const isDraft = writeOff?.status === "DRAFT";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3A4754]" />
      </div>
    );
  }

  if (!writeOff) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Списання не знайдено</p>
        <Button variant="outline" onClick={handleBack} className="mt-4">
          Повернутися
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="lg" onClick={handleBack}>
            <ArrowLeftIcon className="w-5 h-5" /> Назад
          </Button>
          <h1 className="text-[#3A4754] text-[32px] font-[700]">
            {writeOff.writeOffNumber}
          </h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              writeOff.status === "DRAFT"
                ? "bg-gray-100 text-gray-700"
                : writeOff.status === "PENDING"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
            }`}>
            {writeOff.status === "DRAFT"
              ? "Чернетка"
              : writeOff.status === "PENDING"
                ? "На розгляді"
                : "Завершено"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-[#6D7A87]">
            Створено: {format(new Date(writeOff.createdAt), "dd.MM.yyyy")}
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white w-[36px] h-[36px] rounded-full border border-[#B6BDC3] text-[#495969]">
            <EllipsisIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <WriteOffStats
        totalQuantity={totalQuantity}
        totalAmount={totalAmount}
        itemsCount={itemsCount}
        status={writeOff.status}
        onSubmit={handleSubmit}
        onContinueLater={handleContinueLater}
        onApprove={handleApprove}
        onReject={handleReject}
        isSubmitting={submitMutation.isPending}
        isApproving={approveMutation.isPending}
        isRejecting={rejectMutation.isPending}
      />

      {isDraft && (
        <div className="flex justify-end mb-4">
          <Button
            variant="balck"
            size="lg"
            onClick={() => setIsAddDialogOpen(true)}
            className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Додати товар
          </Button>
        </div>
      )}

      <WriteOffItemsTable
        items={writeOff.items || []}
        onUpdateItem={handleUpdateItem}
        onRemoveItem={handleRemoveItem}
        isLoading={isLoading}
        isDraft={isDraft}
      />

      <AddWriteOffItemDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        writeOffId={id}
        existingMaterialIds={existingMaterialIds}
      />
    </div>
  );
}
