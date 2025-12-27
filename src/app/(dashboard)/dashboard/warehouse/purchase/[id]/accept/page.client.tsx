"use client";

import React, { useState, useEffect } from "react";

import { usePurchaseById } from "@/hooks/use-purchase-by-id";
import { usePurchaseItems } from "@/hooks/use-purchase-items";
import { useReceivePurchaseItem } from "@/hooks/use-receive-purchase-item";
import { useSubmitPurchase } from "@/hooks/use-submit-purchase";
import { useUpdatePurchase } from "@/hooks/use-update-purchase";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

import { ArrowLeftIcon, Check, CheckCircle, Package, Coins, Search, SlidersHorizontal } from "lucide-react";

import {
  mapPurchaseItemToTableRow,
  PurchaseDetailTableRow,
} from "@/features/warehouse/purchase";
import { ConfirmDialog } from "@/features/users/ui/delete-role-confirm-dialog";

import { Button } from "@/shared/ui/button";

import PurchaseAcceptTable from "./purchase-accept-table";
import { Input } from "@/shared/ui/input";

const SEARCH_DEBOUNCE_MS = 500;

export default function PurchaseAcceptPageClient({ id }: { id: string }) {
  const router = useRouter();

  // URL search parameter with nuqs
  const [searchParam, setSearchParam] = useQueryState("search");
  const [searchValue, setSearchValue] = useState(searchParam || "");

  // Debounce search - update URL after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== (searchParam || "")) {
        setSearchParam(searchValue || null);
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchValue, searchParam, setSearchParam]);

  // Sync local state with URL param on external changes
  useEffect(() => {
    setSearchValue(searchParam || "");
  }, [searchParam]);

  // API hooks
  const { purchase, isLoading: isLoadingPurchase } = usePurchaseById(id);
  const { purchaseItems, isLoading: isLoadingItems } = usePurchaseItems(id, {
    page: 1,
    limit: 100,
    ...(searchParam && { search: searchParam }),
  });
  const receiveItemMutation = useReceivePurchaseItem();
  const submitPurchaseMutation = useSubmitPurchase();
  const updatePurchaseMutation = useUpdatePurchase();

  // Local state
  const [rejectConfirmOpen, setRejectConfirmOpen] = useState(false);

  // Map data for table (no client-side filtering - search is done on backend)
  const tableData: PurchaseDetailTableRow[] = purchaseItems.map(
    mapPurchaseItemToTableRow
  );

  // Check if all items have receivedQuantity > 0
  const allItemsReceived =
    purchaseItems.length > 0 &&
    purchaseItems.every(item => item.receivedQuantity > 0);

  // Handlers
  const handleBack = () => {
    router.push(`/dashboard/warehouse/purchase/${id}`);
  };

  const handleReceive = (itemId: string, receivedQuantity: number) => {
    receiveItemMutation.mutate({
      purchaseId: id,
      itemId,
      receivedQuantity,
    });
  };

  const handleSubmitPurchase = () => {
    submitPurchaseMutation.mutate(id, {
      onSuccess: () => {
        router.push("/dashboard/warehouse/purchase");
      },
    });
  };

  const handleRejectPurchase = () => {
    setRejectConfirmOpen(true);
  };

  const handleConfirmReject = () => {
    updatePurchaseMutation.mutate(
      {
        id,
        data: { status: "RECEIVED" },
      },
      {
        onSuccess: () => {
          setRejectConfirmOpen(false);
          router.push("/dashboard/warehouse/purchase");
        },
      }
    );
  };

  const isLoading = isLoadingPurchase || isLoadingItems;
  const isUpdating = receiveItemMutation.isPending;
  const isReceived = purchase?.status === "RECEIVED";

  const createdAtFormatted = purchase?.createdAt
    ? format(new Date(purchase.createdAt), "d MMMM", { locale: uk })
    : "";

  return (
    <div>
      {/* Top Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Supplier Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Package className="w-4 h-4 text-[#3A4754]" />
            </div>
            <span className="text-[#6D7A87] text-sm font-medium">Постачальник</span>
          </div>
          <p className="text-[#3A4754] text-lg font-bold truncate">
            {purchase?.supplier?.name || "—"}
          </p>
        </div>

        {/* Amount Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Coins className="w-4 h-4 text-[#3A4754]" />
            </div>
            <span className="text-[#6D7A87] text-sm font-medium">Сума закупівлі</span>
          </div>
          <p className="text-[#3A4754] text-lg font-bold">
            ${purchase?.totalAmount?.toLocaleString("en-US").replace(/,/g, " ")} 
            {/* Note: User image had $ sign but value looked like UAH or specific format, keeping dynamic but matching style */}
          </p>
        </div>

         {/* Status Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-[#3A4754]" />
            </div>
            <span className="text-[#6D7A87] text-sm font-medium">Status</span>
          </div>
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#E0F2FE] text-[#0284C7]">
              На розгляді
            </span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-2xl bg-white rounded-full shadow-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
           <Input
            placeholder="Шукати"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="w-full h-[48px] pl-10 pr-4 rounded-full border-none focus-visible:ring-0 bg-transparent text-sm"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="h-[48px] w-[48px] rounded-full border-gray-200 bg-white">
            <SlidersHorizontal className="w-5 h-5 text-gray-500" />
          </Button>
          
          <Button
            onClick={handleSubmitPurchase}
            disabled={!allItemsReceived || submitPurchaseMutation.isPending}
            className="h-[48px] px-8 rounded-full bg-[#3A4754] hover:bg-[#2c3640] text-white font-medium shadow-sm transition-colors"
          >
            {submitPurchaseMutation.isPending ? "Обробка..." : "Прийняти закупку"}
          </Button>
        </div>
      </div>

      {/* Accept Table */}
      <PurchaseAcceptTable
        data={tableData}
        isLoading={isLoading}
        onReceive={handleReceive}
        isUpdating={isUpdating}
        isReadOnly={isReceived}
      />


      {/* Reject Confirmation Dialog */}
      <ConfirmDialog
        isOpen={rejectConfirmOpen}
        onClose={() => setRejectConfirmOpen(false)}
        onConfirm={handleConfirmReject}
        title="Відхилити закупку?"
        description="Ви впевнені, що хочете відхилити цю закупку? Цю дію неможливо скасувати."
      />
    </div>
  );
}
