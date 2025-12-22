"use client";

import React, { useMemo, useState } from "react";

import { SquarePlus } from "lucide-react";
import { useQueryState } from "nuqs";

import {
  MaterialItemSheet,
  MaterialItemsFilter,
  MaterialItemsTable,
  MaterialItemTableRow,
} from "@/features/warehouse/material-items";
import { ConfirmDialog } from "@/features/users/ui/delete-role-confirm-dialog";

import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteMaterialItem } from "@/hooks/use-delete-material-item";
import { useMaterialItems } from "@/hooks/use-material-items";

import { Button } from "@/shared/ui/button";

export default function MaterialItemsPageClient() {
  // Query parameters for URL-based state
  const [page, setPage] = useQueryState("page", {
    defaultValue: "1",
    parse: value => {
      const num = parseInt(value, 10);
      return isNaN(num) || num < 1 ? "1" : value;
    },
  });

  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
  });

  const [typeId, setTypeId] = useQueryState("typeId", {
    defaultValue: "",
  });

  const [thickness, setThickness] = useQueryState("thickness", {
    defaultValue: "",
  });

  const [sheetType, setSheetType] = useQueryState("sheetType", {
    defaultValue: "",
  });

  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "",
  });

  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "",
  });

  const [createItem, setCreateItem] = useQueryState("createItem", {
    defaultValue: "false",
  });

  const [editItemId, setEditItemId] = useQueryState("editItem");

  // Data fetching
  const pageNumber = parseInt(page || "1", 10);
  const limit = 20;

  const { data: itemsData, isLoading } = useMaterialItems({
    page: pageNumber,
    limit,
    ...(search && { search }),
    ...(typeId && { typeId }),
    ...(thickness && { thickness: parseFloat(thickness) }),
    ...(sheetType && { sheetType }),
    ...(sortBy && { sortBy: sortBy as "name" | "thickness" | "createdAt" }),
    ...(sortOrder && { sortOrder: sortOrder as "asc" | "desc" }),
  });

  // Data transformation
  const tableData = useMemo(() => {
    if (!itemsData?.data) return [];
    return itemsData.data.map(item => ({
      id: item.id,
      name: item.name,
      thickness: item.thickness,
      typeId: item.typeId,
      typeName: item.type?.name || "-",
      sheetType: item.sheetType,
      cuttingSupply: item.cuttingSupply,
      cuttingTime: item.cuttingTime,
      description: item.description,
      createdAt: item.createdAt,
    }));
  }, [itemsData]);

  const totalPages = itemsData?.meta?.totalPages || 1;
  const total = itemsData?.meta?.total || 0;

  // Delete functionality
  const { deleteItem, isPending: isDeleting } = useDeleteMaterialItem();
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);

  const confirmDelete = useConfirm({
    onConfirm: () => {
      if (deletingItemId) {
        deleteItem(deletingItemId);
        setDeletingItemId(null);
      }
    },
    defaultTitle: "Видалити матеріал?",
    defaultDescription:
      "Ви впевнені, що хочете видалити цей матеріал? Цю дію неможливо скасувати.",
  });

  // Event handlers
  const handleOpenCreateSheet = () => {
    setEditItemId(null);
    setCreateItem("true");
  };

  const handleEditRow = (row: MaterialItemTableRow) => {
    setEditItemId(row.id);
    setCreateItem("true");
  };

  const handleDeleteRow = (row: MaterialItemTableRow) => {
    setDeletingItemId(row.id);
    confirmDelete.open({
      title: "Видалити матеріал?",
      description: `Ви впевнені, що хочете видалити матеріал "${row.name}"?`,
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(String(newPage));
  };

  const handleFilterChange = (filters: {
    search?: string;
    typeId?: string;
    thickness?: number;
    sheetType?: string;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    if (filters.search !== undefined) {
      setSearch(filters.search || "");
    }
    if (filters.typeId !== undefined) {
      setTypeId(filters.typeId || "");
    }
    if (filters.thickness !== undefined) {
      setThickness(filters.thickness ? String(filters.thickness) : "");
    }
    if (filters.sheetType !== undefined) {
      setSheetType(filters.sheetType || "");
    }
    if (filters.sortBy !== undefined) {
      setSortBy(filters.sortBy || "");
    }
    if (filters.sortOrder !== undefined) {
      setSortOrder(filters.sortOrder || "");
    }
    setPage("1");
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <h1 className="text-[#3A4754] text-[32px] font-bold">
          Довідник матеріалів <span className="text-[#B6BDC3]">({total})</span>
        </h1>
        <Button variant="balck" size="lg" onClick={handleOpenCreateSheet}>
          <SquarePlus className="w-5 h-5" /> Додати
        </Button>
      </div>

      {/* Filter Component */}
      <MaterialItemsFilter
        onFilterChange={handleFilterChange}
        initialFilters={{
          search: search || undefined,
          typeId: typeId || undefined,
          thickness: thickness || undefined,
          sheetType: sheetType || undefined,
          sortBy: sortBy || undefined,
          sortOrder: sortOrder || undefined,
        }}
      />

      {/* Table Component */}
      <MaterialItemsTable
        data={tableData}
        currentPage={pageNumber}
        totalPages={totalPages}
        total={total}
        onPageChange={handlePageChange}
        onEditRow={handleEditRow}
        onDeleteRow={handleDeleteRow}
        isLoading={isLoading}
      />

      {/* Sheet for create/edit */}
      <MaterialItemSheet />

      {/* Confirmation dialog for delete */}
      <ConfirmDialog
        isOpen={confirmDelete.isOpen}
        onClose={confirmDelete.close}
        onConfirm={confirmDelete.confirm}
        title={confirmDelete.title}
        description={confirmDelete.description}
      />
    </div>
  );
}
