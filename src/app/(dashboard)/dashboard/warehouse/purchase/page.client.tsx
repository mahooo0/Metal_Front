"use client";

import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { EllipsisIcon, PlusSquareIcon } from "lucide-react";

import { useDeletePurchase } from "@/hooks/use-delete-purchase";
import { usePurchases } from "@/hooks/use-purchases";
import { useUpdatePurchaseStatus } from "@/hooks/use-update-purchase-status";
import {
  AddProductDialog,
  AddPurchaseDialog,
  EditPurchaseDialog,
  PurchaseFilter,
  PurchaseTable,
} from "@/features/warehouse/purchase";
import {
  initialPurchaseFilterData,
  type PurchaseFilterData,
} from "@/features/warehouse/purchase/types/purchase-filter.types";
import {
  mapPurchaseToTableRow,
  type PurchaseStatus,
  type PurchaseTableRow,
} from "@/features/warehouse/purchase/types/purchase.types";
import { ConfirmDialog } from "@/features/users/ui/delete-role-confirm-dialog";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

export default function PurchasePageClient() {
  const router = useRouter();
  const [filterData, setFilterData] = useState<PurchaseFilterData>(
    initialPurchaseFilterData
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [editPurchaseId, setEditPurchaseId] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [purchaseToDelete, setPurchaseToDelete] = useState<PurchaseTableRow | null>(null);

  const { purchases, meta, isLoading } = usePurchases({
    page: currentPage,
    limit: 20,
    ...(filterData.search && { search: filterData.search }),
    ...(filterData.status && { status: filterData.status }),
    ...(filterData.supplierId && { supplierId: filterData.supplierId }),
    ...(filterData.dateFrom && { dateFrom: filterData.dateFrom }),
    ...(filterData.dateTo && { dateTo: filterData.dateTo }),
    ...(filterData.sortBy && { sortBy: filterData.sortBy }),
    ...(filterData.sortOrder && { sortOrder: filterData.sortOrder }),
  });

  const { deletePurchase } = useDeletePurchase();
  const updateStatusMutation = useUpdatePurchaseStatus();

  const tableData = purchases.map(mapPurchaseToTableRow);

  const handleFilterChange = (data: PurchaseFilterData) => {
    setFilterData(data);
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setFilterData(initialPurchaseFilterData);
    setCurrentPage(1);
  };

  const handleViewRow = (row: PurchaseTableRow) => {
    router.push(`/dashboard/warehouse/purchase/${row.id}`);
  };

  const handleEditRow = (row: PurchaseTableRow) => {
    setEditPurchaseId(row.id);
  };

  const handleDeleteRow = (row: PurchaseTableRow) => {
    setPurchaseToDelete(row);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (purchaseToDelete) {
      deletePurchase(purchaseToDelete.id);
      setDeleteConfirmOpen(false);
      setPurchaseToDelete(null);
    }
  };

  const handleDeleteFromEdit = (id: string) => {
    deletePurchase(id);
  };

  const handleStatusChange = (id: string, status: PurchaseStatus) => {
    updateStatusMutation.mutate({ id, status });
  };

  const handleAddProduct = (data: {
    supplier: string;
    metalThickness: string;
    type: string;
    size: string;
    expectedQuantity: string;
    purchasePrice: string;
    salePrice: string;
  }) => {
    console.log("Add product:", data);
    setIsAddProductDialogOpen(false);
  };

  const totalCount = meta?.total || 0;

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <h1 className="text-[#3A4754] text-[32px] font-[700]">
          Закупки{" "}
          <span className="text-[#B6BDC3]">
            ({totalCount.toLocaleString()})
          </span>
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="balck"
            size="lg"
            onClick={() => setIsAddDialogOpen(true)}>
            <PlusSquareIcon className="w-5 h-5" /> Додати закупку
          </Button>
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
              <DropdownMenuItem>
                <Link href="/dashboard/warehouse/purchase/acsept">
                  Прийняти закупку
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsAddProductDialogOpen(true)}>
                Додати товар
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <PurchaseFilter
        filterData={filterData}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilter}
        isLoading={isLoading}
      />

      <PurchaseTable
        data={tableData}
        meta={meta}
        isLoading={isLoading}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onViewRow={handleViewRow}
        onEditRow={handleEditRow}
        onDeleteRow={handleDeleteRow}
        onStatusChange={handleStatusChange}
      />

      {/* Add Purchase Dialog */}
      <AddPurchaseDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      {/* Edit Purchase Dialog */}
      <EditPurchaseDialog
        isOpen={!!editPurchaseId}
        onClose={() => setEditPurchaseId(null)}
        purchaseId={editPurchaseId}
        onDelete={handleDeleteFromEdit}
      />

      {/* Add Product Dialog */}
      <AddProductDialog
        isOpen={isAddProductDialogOpen}
        onClose={() => setIsAddProductDialogOpen(false)}
        onSave={handleAddProduct}
      />

      {/* Confirm Dialog for delete */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => {
          setDeleteConfirmOpen(false);
          setPurchaseToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Видалити закупку?"
        description={`Ви впевнені, що хочете видалити закупку "${purchaseToDelete?.purchaseId || ""}"? Цю дію неможливо скасувати.`}
      />
    </div>
  );
}
