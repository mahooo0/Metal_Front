"use client";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { PlusSquareIcon } from "lucide-react";

import { useWriteOffs } from "@/hooks/use-write-offs";
import { useDeleteWriteOff } from "@/hooks/use-delete-write-off";
import { useConfirm } from "@/hooks/use-confirm";
import { WriteOffStatus } from "@/service/write-offs.service";

import {
  WriteOffFilter,
  WriteOffTable,
  CreateWriteOffSheet,
  EditWriteOffSheet,
} from "@/features/warehouse/write-off";
import { ConfirmDialog } from "@/features/users/ui/delete-role-confirm-dialog";

import { Button } from "@/shared/ui/button";

const SEARCH_DEBOUNCE_MS = 500;

export default function WriteOffPageClient() {
  // URL query parameters with nuqs
  const [searchParam, setSearchParam] = useQueryState("search");
  const [statusParam, setStatusParam] = useQueryState("status");
  const [dateFromParam, setDateFromParam] = useQueryState("dateFrom");
  const [dateToParam, setDateToParam] = useQueryState("dateTo");
  const [pageParam, setPageParam] = useQueryState("page");

  // Local state for search debounce
  const [searchValue, setSearchValue] = useState(searchParam || "");

  // Router for navigation
  const router = useRouter();

  // Sheet state
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Delete state
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { deleteWriteOff } = useDeleteWriteOff();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== (searchParam || "")) {
        setSearchParam(searchValue || null);
        setPageParam("1");
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchValue, searchParam, setSearchParam, setPageParam]);

  // Sync local state with URL param
  useEffect(() => {
    setSearchValue(searchParam || "");
  }, [searchParam]);

  // Current page
  const currentPage = parseInt(pageParam || "1", 10);

  // API call with filters
  const { writeOffs, meta, isLoading } = useWriteOffs({
    page: currentPage,
    limit: 20,
    ...(searchParam && { search: searchParam }),
    ...(statusParam && { status: statusParam as WriteOffStatus }),
    ...(dateFromParam && { dateFrom: dateFromParam }),
    ...(dateToParam && { dateTo: dateToParam }),
  });

  // Confirm delete hook
  const confirmDelete = useConfirm({
    onConfirm: () => {
      if (deletingId) {
        deleteWriteOff(deletingId);
        setDeletingId(null);
      }
    },
    defaultTitle: "Видалити списання?",
    defaultDescription:
      "Ви впевнені, що хочете видалити це списання? Цю дію неможливо скасувати.",
  });

  // Filter data object
  const filterData = {
    search: searchValue,
    status: (statusParam as WriteOffStatus) || "",
    dateFrom: dateFromParam || "",
    dateTo: dateToParam || "",
  };

  // Handlers
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleStatusChange = (value: WriteOffStatus | "") => {
    setStatusParam(value || null);
    setPageParam("1");
  };

  const handleDateFromChange = (value: string) => {
    setDateFromParam(value || null);
    setPageParam("1");
  };

  const handleDateToChange = (value: string) => {
    setDateToParam(value || null);
    setPageParam("1");
  };

  const handleReset = () => {
    setSearchValue("");
    setSearchParam(null);
    setStatusParam(null);
    setDateFromParam(null);
    setDateToParam(null);
    setPageParam("1");
  };

  const handlePageChange = (page: number) => {
    setPageParam(page.toString());
  };

  const handleView = (id: string) => {
    router.push(`/dashboard/warehouse/write-off/${id}`);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    confirmDelete.open();
  };

  const handleCreateNew = () => {
    setIsCreateSheetOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <h1 className="text-[#3A4754] text-[32px] font-[700]">
          Списання товару{" "}
          <span className="text-[#B6BDC3]">({meta?.total || 0})</span>
        </h1>
        <Button variant="balck" size="lg" onClick={handleCreateNew}>
          <PlusSquareIcon className="w-5 h-5" /> Створити нове
        </Button>
      </div>

      <WriteOffFilter
        filterData={filterData}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onDateFromChange={handleDateFromChange}
        onDateToChange={handleDateToChange}
        onReset={handleReset}
      />

      <WriteOffTable
        data={writeOffs}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={meta?.totalPages || 1}
        total={meta?.total || 0}
        onPageChange={handlePageChange}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CreateWriteOffSheet
        isOpen={isCreateSheetOpen}
        onClose={() => setIsCreateSheetOpen(false)}
      />

      <EditWriteOffSheet
        writeOffId={editingId}
        isOpen={!!editingId}
        onClose={() => setEditingId(null)}
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
