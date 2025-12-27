"use client";

import React, { useState, useMemo, useEffect } from "react";

import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { ArrowLeftIcon, EllipsisIcon, Send } from "lucide-react";

import { useApproveInventory } from "@/hooks/use-approve-inventory";
import { useInventoryById } from "@/hooks/use-inventory-by-id";
import { useRejectInventory } from "@/hooks/use-reject-inventory";
import { useSubmitInventory } from "@/hooks/use-submit-inventory";
import { useUpdateInventoryItem } from "@/hooks/use-update-inventory-item";

import { InventoryItem, InventoryStatus } from "@/service/inventories.service";

import {
  AddProductFilter,
  type AddProductFilterData,
  InventoryDetailTable,
  InventoryStats,
} from "@/features/warehouse/inventory";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/shared/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";

const STATUS_LABELS: Record<InventoryStatus, string> = {
  IN_PROGRESS: "В процесі",
  PENDING: "На розгляді",
  APPROVED: "Затверджено",
  REJECTED: "Відхилено",
};

const STATUS_COLORS: Record<InventoryStatus, string> = {
  IN_PROGRESS: "bg-yellow-100 text-yellow-800",
  PENDING: "bg-blue-100 text-blue-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

const DEFAULT_FILTER: AddProductFilterData = {
  sortOrder: "filled_first",
  search: "",
};

export default function InventoryByIdPageClient({ id }: { id: string }) {
  const router = useRouter();
  const { inventory, isLoading } = useInventoryById(id);
  const submitMutation = useSubmitInventory();
  const approveMutation = useApproveInventory();
  const rejectMutation = useRejectInventory();
  const updateItemMutation = useUpdateInventoryItem();

  const [filterData, setFilterData] = useState<AddProductFilterData>(DEFAULT_FILTER);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filterData.search);
    }, 300);
    return () => clearTimeout(timer);
  }, [filterData.search]);

  const handleBack = () => {
    router.push("/dashboard/warehouse/inventory");
  };

  const handleSortChange = (sortOrder: AddProductFilterData["sortOrder"]) => {
    setFilterData(prev => ({ ...prev, sortOrder }));
  };

  const handleSearchChange = (search: string) => {
    setFilterData(prev => ({ ...prev, search }));
  };

  const handleReset = () => {
    setFilterData(DEFAULT_FILTER);
  };

  const handleSubmit = () => {
    if (inventory) {
      submitMutation.mutate(inventory.id);
    }
  };

  const handleApprove = () => {
    if (inventory) {
      approveMutation.mutate(inventory.id, {
        onSuccess: () => {
          router.push("/dashboard/warehouse/inventory");
        },
      });
    }
  };

  const handleReject = () => {
    if (inventory && rejectReason.trim()) {
      rejectMutation.mutate(
        { id: inventory.id, reason: rejectReason },
        {
          onSuccess: () => {
            setIsRejectDialogOpen(false);
            setRejectReason("");
            router.push("/dashboard/warehouse/inventory");
          },
        }
      );
    }
  };

  const handleUpdateItem = (itemId: string, data: { actualQuantity: number; comment?: string }) => {
    if (inventory) {
      updateItemMutation.mutate({
        inventoryId: inventory.id,
        itemId,
        data,
      });
    }
  };

  // Sort and filter items
  const sortedAndFilteredItems = useMemo(() => {
    if (!inventory?.items) return [];

    let items = [...inventory.items];

    // Filter by search (material name)
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      items = items.filter((item: InventoryItem) => {
        const materialName = item.material?.materialItem?.name?.toLowerCase() || "";
        return materialName.includes(searchLower);
      });
    }

    // Sort based on sortOrder
    items.sort((a: InventoryItem, b: InventoryItem) => {
      const aHasActual = a.actualQuantity !== null;
      const bHasActual = b.actualQuantity !== null;

      if (filterData.sortOrder === "filled_first") {
        // Items with actualQuantity first
        if (aHasActual && !bHasActual) return -1;
        if (!aHasActual && bHasActual) return 1;
      } else {
        // Items without actualQuantity first
        if (!aHasActual && bHasActual) return -1;
        if (aHasActual && !bHasActual) return 1;
      }

      // Secondary sort by createdAt for stability
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    return items;
  }, [inventory?.items, filterData.sortOrder, debouncedSearch]);

  // Calculate stats from items
  const stats = useMemo(() => {
    if (!inventory?.items) {
      return { deficit: { units: 0, amount: 0 }, surplus: { units: 0, amount: 0 }, difference: { amount: 0 } };
    }

    const deficitItems = inventory.items.filter((item: InventoryItem) => item.difference !== null && item.difference < 0);
    const surplusItems = inventory.items.filter((item: InventoryItem) => item.difference !== null && item.difference > 0);

    const deficitUnits = deficitItems.length;
    const deficitAmount = deficitItems.reduce((sum: number, item: InventoryItem) => sum + Math.abs(item.difference || 0), 0);

    const surplusUnits = surplusItems.length;
    const surplusAmount = surplusItems.reduce((sum: number, item: InventoryItem) => sum + (item.difference || 0), 0);

    const totalDifference = inventory.items.reduce((sum: number, item: InventoryItem) => sum + (item.difference || 0), 0);

    return {
      deficit: { units: deficitUnits, amount: deficitAmount },
      surplus: { units: surplusUnits, amount: surplusAmount },
      difference: { amount: totalDifference },
    };
  }, [inventory?.items]);

  const isEditable = inventory?.status === "IN_PROGRESS" || inventory?.status === "REJECTED";
  const canSubmit = inventory?.status === "IN_PROGRESS" || inventory?.status === "REJECTED";
  const canApproveReject = inventory?.status === "PENDING";
  const allItemsFilled = inventory?.items?.every((item: InventoryItem) => item.actualQuantity !== null) ?? false;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3A4754]" />
      </div>
    );
  }

  if (!inventory) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Інвентаризацію не знайдено</p>
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
            Інвентаризація #{inventory.inventoryNumber}
          </h1>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[inventory.status]}`}>
            {STATUS_LABELS[inventory.status]}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-[#6D7A87]">
            {format(new Date(inventory.date), "dd.MM.yyyy")}
          </p>

          {/* Submit button - for IN_PROGRESS or REJECTED status */}
          {canSubmit && (
            <Button
              variant="balck"
              size="lg"
              onClick={handleSubmit}
              disabled={submitMutation.isPending || !allItemsFilled}
              title={!allItemsFilled ? "Заповніть фактичну кількість для всіх товарів" : ""}
            >
              <Send className="w-4 h-4 mr-2" />
              {submitMutation.isPending ? "Відправка..." : "Підтвердити"}
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="bg-white w-[36px] h-[36px] rounded-full border border-[#B6BDC3] text-[#495969]">
                <EllipsisIcon className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => router.push(`/dashboard/warehouse/inventory/${id}/edit`)}>
                Редагувати
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <InventoryStats
        deficit={stats.deficit}
        surplus={stats.surplus}
        difference={stats.difference}
        showActions={canApproveReject}
        onApprove={handleApprove}
        onReject={() => setIsRejectDialogOpen(true)}
        isApproving={approveMutation.isPending}
        isRejecting={rejectMutation.isPending}
      />

      <AddProductFilter
        filterData={filterData}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
        onReset={handleReset}
      />

      <InventoryDetailTable
        items={sortedAndFilteredItems}
        inventoryId={inventory.id}
        isEditable={isEditable}
        onUpdateItem={handleUpdateItem}
        isUpdating={updateItemMutation.isPending}
      />

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogOverlay
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 17, 0.4) 36.54%, rgba(0, 0, 36, 0.8) 100%)",
          }}
        />
        <DialogContent className="max-w-md bg-white rounded-lg shadow-lg">
          <DialogHeader className="border-b border-[#E5E7EB] pb-2">
            <DialogTitle className="text-[20px] font-bold text-[#3A4754]">
              Відхилити інвентаризацію
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rejectReason">Причина відхилення *</Label>
              <Textarea
                id="rejectReason"
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder="Вкажіть причину відхилення"
                className="min-h-[100px] w-full rounded-lg bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setIsRejectDialogOpen(false);
                setRejectReason("");
              }}
            >
              Скасувати
            </Button>
            <Button
              variant="balck"
              onClick={handleReject}
              disabled={!rejectReason.trim() || rejectMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {rejectMutation.isPending ? "Відхилення..." : "Відхилити"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
