"use client";

import React, { useMemo, useState } from "react";

import { SquarePlus } from "lucide-react";
import { useQueryState } from "nuqs";

import {
  CategorySheet,
  MaterialCategoriesFilter,
  MaterialCategoriesTable,
  MaterialCategoryItem,
} from "@/features/warehouse/material-categories";
import { ConfirmDialog } from "@/features/users/ui/delete-role-confirm-dialog";

import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteMaterialCategory } from "@/hooks/use-delete-material-category";
import { useMaterialCategories } from "@/hooks/use-material-categories";

import { Button } from "@/shared/ui/button";

export default function MaterialCategoriesPageClient() {
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

  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "",
  });

  const [sortDirection, setSortDirection] = useQueryState("sortDirection", {
    defaultValue: "",
  });

  const [createCategory, setCreateCategory] = useQueryState("createCategory", {
    defaultValue: "false",
  });

  const [editCategoryId, setEditCategoryId] = useQueryState("editCategory");

  // Data fetching
  const pageNumber = parseInt(page || "1", 10);
  const limit = 20;

  const { data: categoriesData, isLoading } = useMaterialCategories({
    page: pageNumber,
    limit,
    ...(search && { search }),
    ...(sortBy && { sortBy: sortBy as "name" | "createdAt" }),
    ...(sortDirection && { sortDirection: sortDirection as "asc" | "desc" }),
  });

  // Data transformation
  const tableData = useMemo(() => {
    if (!categoriesData?.data) return [];
    return categoriesData.data.map(category => ({
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
    }));
  }, [categoriesData]);

  const totalPages = categoriesData?.meta?.totalPages || 1;
  const total = categoriesData?.meta?.total || 0;

  // Delete functionality
  const { deleteCategory, isPending: isDeleting } = useDeleteMaterialCategory();
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(
    null
  );

  const confirmDelete = useConfirm({
    onConfirm: () => {
      if (deletingCategoryId) {
        deleteCategory(deletingCategoryId);
        setDeletingCategoryId(null);
      }
    },
    defaultTitle: "Видалити категорію?",
    defaultDescription:
      "Ви впевнені, що хочете видалити цю категорію? Цю дію неможливо скасувати.",
  });

  // Event handlers
  const handleOpenCreateSheet = () => {
    setEditCategoryId(null);
    setCreateCategory("true");
  };

  const handleEditRow = (row: MaterialCategoryItem) => {
    setEditCategoryId(row.id);
    setCreateCategory("true");
  };

  const handleDeleteRow = (row: MaterialCategoryItem) => {
    setDeletingCategoryId(row.id);
    confirmDelete.open({
      title: "Видалити категорію?",
      description: `Ви впевнені, що хочете видалити категорію "${row.name}"?`,
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(String(newPage));
  };

  const handleFilterChange = (filters: {
    search?: string;
    sortBy?: string;
    sortDirection?: string;
  }) => {
    if (filters.search !== undefined) {
      setSearch(filters.search || "");
    }
    if (filters.sortBy !== undefined) {
      setSortBy(filters.sortBy || "");
    }
    if (filters.sortDirection !== undefined) {
      setSortDirection(filters.sortDirection || "");
    }
    setPage("1");
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <h1 className="text-[#3A4754] text-[32px] font-bold">
          Категорії матеріалів <span className="text-[#B6BDC3]">({total})</span>
        </h1>
        <Button variant="balck" size="lg" onClick={handleOpenCreateSheet}>
          <SquarePlus className="w-5 h-5" /> Додати
        </Button>
      </div>

      {/* Filter Component */}
      <MaterialCategoriesFilter
        onFilterChange={handleFilterChange}
        initialFilters={{
          search: search || undefined,
          sortBy: sortBy || undefined,
          sortDirection: sortDirection || undefined,
        }}
      />

      {/* Table Component */}
      <MaterialCategoriesTable
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
      <CategorySheet />

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
