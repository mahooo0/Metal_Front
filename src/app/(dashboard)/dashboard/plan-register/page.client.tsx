"use client";

import React, { useMemo, useState } from "react";

import { useConfirm } from "@/hooks/use-confirm";
import { useDeletePlanRecord } from "@/hooks/use-delete-plan-record";
import { usePlanRecords } from "@/hooks/use-plan-records";
import { SquarePlus } from "lucide-react";
import { useQueryState } from "nuqs";

import type { PlanRegisterItem } from "@/features/plan-register/types/plan-register.types";
import {
  AddPlanDialog,
  PlanRegisterFilter,
  PlanRegisterTable,
} from "@/features/plan-register/ui";
import { mapPlanRecordToTableItem } from "@/features/plan-register/utils/map-plan-record-to-table";
import { ConfirmDialog } from "@/features/users/ui/delete-role-confirm-dialog";

import { Button } from "@/shared/ui/button";

export default function PlanRegisterPageClient() {
  const [isAddPlanDialogOpen, setIsAddPlanDialogOpen] = useState(false);
  const [editingPlanRecordId, setEditingPlanRecordId] = useState<string | null>(
    null
  );

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

  const [dateFrom, setDateFrom] = useQueryState("dateFrom", {
    defaultValue: "",
  });

  const [dateTo, setDateTo] = useQueryState("dateTo", {
    defaultValue: "",
  });

  const [counterpartyId, setCounterpartyId] = useQueryState("counterpartyId", {
    defaultValue: "",
  });

  const [createdById, setCreatedById] = useQueryState("createdById", {
    defaultValue: "",
  });

  const [metalBrandId, setMetalBrandId] = useQueryState("metalBrandId", {
    defaultValue: "",
  });

  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "",
  });

  const [sortDirection, setSortDirection] = useQueryState("sortDirection", {
    defaultValue: "",
  });

  const pageNumber = parseInt(page || "1", 10);
  const limit = 20;

  const { data: planRecordsData, isLoading } = usePlanRecords({
    page: pageNumber,
    limit,
    ...(search && { search }),
    ...(dateFrom && { dateFrom }),
    ...(dateTo && { dateTo }),
    ...(counterpartyId && { counterpartyId }),
    ...(createdById && { createdById }),
    ...(metalBrandId && { metalBrandId }),
    ...(sortBy && { sortBy }),
    ...(sortDirection && { sortDirection: sortDirection as "asc" | "desc" }),
  });

  const tableData = useMemo(() => {
    if (!planRecordsData?.data) return [];
    return planRecordsData.data.map(mapPlanRecordToTableItem);
  }, [planRecordsData]);

  const totalPages = planRecordsData?.meta?.totalPages || 1;
  const total = planRecordsData?.meta?.total || 0;

  const { deletePlanRecord, isPending: isDeleting } = useDeletePlanRecord();
  const [deletingPlanRecordId, setDeletingPlanRecordId] = useState<
    string | null
  >(null);

  const confirmDelete = useConfirm({
    onConfirm: () => {
      if (deletingPlanRecordId) {
        deletePlanRecord(deletingPlanRecordId);
        setDeletingPlanRecordId(null);
      }
    },
    defaultTitle: "Видалити план?",
    defaultDescription:
      "Ви впевнені, що хочете видалити цей план? Цю дію неможливо скасувати.",
  });

  const handleOpenAddPlanDialog = () => {
    setEditingPlanRecordId(null);
    setIsAddPlanDialogOpen(true);
  };

  const handleCloseAddPlanDialog = () => {
    setIsAddPlanDialogOpen(false);
    setEditingPlanRecordId(null);
  };

  const handleEditRow = (row: PlanRegisterItem) => {
    setEditingPlanRecordId(row.id);
    setIsAddPlanDialogOpen(true);
  };

  const handleDeleteRow = (row: PlanRegisterItem) => {
    setDeletingPlanRecordId(row.id);
    confirmDelete.open({
      title: "Видалити план?",
      description: `Ви впевнені, що хочете видалити план "${row.planNumber || row.id}"? Цю дію неможливо скасувати.`,
    });
  };

  const handleSavePlan = () => {
    // Data is already saved in the dialog via mutation
    // This callback is optional and can be used for additional logic
  };

  const handlePageChange = (newPage: number) => {
    setPage(String(newPage));
  };

  const handleFilterChange = (filters: {
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    counterpartyId?: string;
    createdById?: string;
    metalBrandId?: string;
    sortBy?: string;
    sortDirection?: string;
  }) => {
    // Clear all filters if undefined is passed
    if (filters.search !== undefined) {
      setSearch(filters.search || "");
    } else {
      setSearch("");
    }
    if (filters.dateFrom !== undefined) {
      setDateFrom(filters.dateFrom || "");
    } else {
      setDateFrom("");
    }
    if (filters.dateTo !== undefined) {
      setDateTo(filters.dateTo || "");
    } else {
      setDateTo("");
    }
    if (filters.counterpartyId !== undefined) {
      setCounterpartyId(filters.counterpartyId || "");
    } else {
      setCounterpartyId("");
    }
    if (filters.createdById !== undefined) {
      setCreatedById(filters.createdById || "");
    } else {
      setCreatedById("");
    }
    if (filters.metalBrandId !== undefined) {
      setMetalBrandId(filters.metalBrandId || "");
    } else {
      setMetalBrandId("");
    }
    if (filters.sortBy !== undefined) {
      setSortBy(filters.sortBy || "");
    } else {
      setSortBy("");
    }
    if (filters.sortDirection !== undefined) {
      setSortDirection(filters.sortDirection || "");
    } else {
      setSortDirection("");
    }
    setPage("1"); // Reset to first page when filters change
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <h1 className="text-[#3A4754] text-[32px] font-bold">
          Реєстр планів <span className="text-[#B6BDC3]">({total})</span>
        </h1>
        <Button variant="balck" size="lg" onClick={handleOpenAddPlanDialog}>
          <SquarePlus className="w-5 h-5" /> Додати новий
        </Button>
      </div>
      <PlanRegisterFilter
        onFilterChange={handleFilterChange}
        initialFilters={{
          search,
          dateFrom,
          dateTo,
          counterpartyId,
          createdById,
          metalBrandId,
          sortBy,
          sortDirection,
        }}
      />
      <PlanRegisterTable
        data={tableData}
        currentPage={pageNumber}
        totalPages={totalPages}
        total={total}
        onPageChange={handlePageChange}
        onEditRow={handleEditRow}
        onDeleteRow={handleDeleteRow}
        isLoading={isLoading}
      />

      <AddPlanDialog
        isOpen={isAddPlanDialogOpen}
        onClose={handleCloseAddPlanDialog}
        planRecordId={editingPlanRecordId || undefined}
        onSave={handleSavePlan}
      />

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
