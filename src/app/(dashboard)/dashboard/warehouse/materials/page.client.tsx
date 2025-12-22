"use client";

import React, { useState } from "react";

import { PlusSquareIcon } from "lucide-react";
import { useQueryState } from "nuqs";

import { useDeleteMaterial } from "@/hooks/use-delete-material";
import { useMaterials } from "@/hooks/use-materials";
import { useUpdateMaterial } from "@/hooks/use-update-material";

import {
  mapMaterialToTableRow,
  MaterialSheet,
  MaterialsFilter,
  MaterialsTable,
} from "@/features/warehouse/materials";
import type {
  MaterialsFilterData,
  MaterialStatus,
  MaterialTableRow,
} from "@/features/warehouse/materials";

import { Button } from "@/shared/ui/button";

const initialFilterData: MaterialsFilterData = {
  search: "",
  status: "",
  sortBy: "",
  sortOrder: "",
};

export default function MaterialsPageClient() {
  const [filterData, setFilterData] =
    useState<MaterialsFilterData>(initialFilterData);
  const [currentPage, setCurrentPage] = useState(1);

  // URL state for sheet
  const [createMaterial, setCreateMaterial] = useQueryState("create");
  const [editMaterialId, setEditMaterialId] = useQueryState("edit");

  // Fetch materials
  const { materials, meta, isLoading } = useMaterials({
    page: currentPage,
    limit: 20,
    ...(filterData.search && { search: filterData.search }),
    ...(filterData.status && { status: filterData.status }),
    ...(filterData.sortBy && { sortBy: filterData.sortBy }),
    ...(filterData.sortOrder && { sortOrder: filterData.sortOrder }),
  });

  // Mutations
  const { deleteMaterial } = useDeleteMaterial();
  const updateMutation = useUpdateMaterial();

  // Map API data to table rows
  const tableData: MaterialTableRow[] = materials.map(mapMaterialToTableRow);

  const handleFilterChange = (data: MaterialsFilterData) => {
    setFilterData(data);
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setFilterData(initialFilterData);
    setCurrentPage(1);
  };

  const handleAddMaterial = () => {
    setEditMaterialId(null);
    setCreateMaterial("true");
  };

  const handleEditRow = (row: MaterialTableRow) => {
    setEditMaterialId(row.id);
    setCreateMaterial("true");
  };

  const handleDeleteRow = (row: MaterialTableRow) => {
    if (confirm("Ви впевнені, що хочете видалити цей матеріал?")) {
      deleteMaterial(row.id);
    }
  };

  const handleStatusChange = (id: string, status: MaterialStatus) => {
    updateMutation.mutate({ id, data: { status } });
  };

  const handleCloseSheet = () => {
    setCreateMaterial(null);
    setEditMaterialId(null);
  };

  const isSheetOpen = createMaterial === "true";

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <h1 className="text-[#3A4754] text-[32px] font-[700]">
          Матеріали{" "}
          <span className="text-[#B6BDC3]">({meta?.total || 0})</span>
        </h1>
        <Button variant="balck" size="lg" onClick={handleAddMaterial}>
          <PlusSquareIcon className="w-5 h-5" /> Додати матеріал
        </Button>
      </div>

      <MaterialsFilter
        filterData={filterData}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilter}
        isLoading={isLoading}
      />

      <MaterialsTable
        data={tableData}
        meta={meta}
        isLoading={isLoading}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onEditRow={handleEditRow}
        onDeleteRow={handleDeleteRow}
        onStatusChange={handleStatusChange}
      />

      <MaterialSheet
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        editMaterialId={editMaterialId}
      />
    </div>
  );
}
