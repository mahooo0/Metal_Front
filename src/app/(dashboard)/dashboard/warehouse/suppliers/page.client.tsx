"use client";

import React, { useMemo, useState } from "react";

import { PlusSquareIcon } from "lucide-react";
import { useQueryState } from "nuqs";

import { useDeleteSupplier } from "@/hooks/use-delete-supplier";
import { useSuppliers } from "@/hooks/use-suppliers";

import {
  SupplierSheet,
  SuppliersFilter,
  SuppliersFilterData,
  SuppliersTable,
  SupplierTableRow,
} from "@/features/warehouse/suppliers";

import { Button } from "@/shared/ui";

const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  } catch {
    return dateString;
  }
};

export default function SuppliersPageClient() {
  const [, setCreateSupplier] = useQueryState("createSupplier", {
    defaultValue: "false",
  });
  const [, setEditSupplierId] = useQueryState("editSupplier");

  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState<SuppliersFilterData>({
    search: "",
    sortBy: "",
    sortOrder: "",
  });

  const { suppliers, meta, isLoading } = useSuppliers({
    page: currentPage,
    limit: 20,
    ...(filterData.search && { search: filterData.search }),
    ...(filterData.sortBy && { sortBy: filterData.sortBy }),
    ...(filterData.sortOrder && { sortOrder: filterData.sortOrder as "ASC" | "DESC" }),
  });

  const { deleteSupplier } = useDeleteSupplier();

  const tableData: SupplierTableRow[] = useMemo(() => {
    return suppliers.map(supplier => ({
      id: supplier.id,
      name: supplier.name,
      edrpou: supplier.edrpou || "",
      ipn: supplier.ipn || "",
      legalAddress: supplier.legalAddress || "",
      contactsCount: supplier.contacts?.length || 0,
      createdAt: formatDate(supplier.createdAt),
    }));
  }, [suppliers]);

  const handleAddSupplier = () => {
    setCreateSupplier("true");
  };

  const handleEditRow = (row: SupplierTableRow) => {
    setEditSupplierId(row.id);
    setCreateSupplier("true");
  };

  const handleDeleteRow = (row: SupplierTableRow) => {
    if (confirm("Ви впевнені, що хочете видалити цього постачальника?")) {
      deleteSupplier(row.id);
    }
  };

  const handleFilterChange = (data: SuppliersFilterData) => {
    setFilterData(data);
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setFilterData({
      search: "",
      sortBy: "",
      sortOrder: "",
    });
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <h1 className="text-[#3A4754] text-[32px] font-[700]">
          Постачальники{" "}
          <span className="text-[#181e24]">({meta?.total || 0})</span>
        </h1>
        <Button variant="balck" size="lg" onClick={handleAddSupplier}>
          <PlusSquareIcon className="w-5 h-5" /> Додати постачальника
        </Button>
      </div>

      <SuppliersFilter
        filterData={filterData}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilter}
      />

      <SuppliersTable
        data={tableData}
        currentPage={currentPage}
        totalPages={meta?.totalPages || 1}
        total={meta?.total}
        onPageChange={setCurrentPage}
        onEditRow={handleEditRow}
        onDeleteRow={handleDeleteRow}
        isLoading={isLoading}
      />

      <SupplierSheet />
    </div>
  );
}
