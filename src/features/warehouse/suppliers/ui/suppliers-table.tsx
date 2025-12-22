"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { Check, ChevronDown, Printer, Upload } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Pagination } from "@/shared/ui/pagination";

import type {
  SupplierColumn,
  SupplierTableRow,
  SuppliersTableProps,
} from "../types/supplier.types";

const supplierColumns: SupplierColumn[] = [
  {
    key: "name",
    label: "Назва",
    visible: true,
    sortable: true,
    width: "200px",
    type: "text",
  },
  {
    key: "edrpou",
    label: "ЄДРПОУ",
    visible: true,
    sortable: false,
    width: "120px",
    type: "text",
  },
  {
    key: "ipn",
    label: "ІПН",
    visible: true,
    sortable: false,
    width: "140px",
    type: "text",
  },
  {
    key: "legalAddress",
    label: "Юридична адреса",
    visible: true,
    sortable: false,
    width: "250px",
    type: "text",
  },
  {
    key: "contactsCount",
    label: "Контакти",
    visible: true,
    sortable: false,
    width: "100px",
    type: "number",
  },
  {
    key: "createdAt",
    label: "Дата створення",
    visible: true,
    sortable: true,
    width: "150px",
    type: "date",
  },
];

export default function SuppliersTable({
  data = [],
  currentPage: externalCurrentPage,
  totalPages: externalTotalPages,
  onPageChange: externalOnPageChange,
  onEditRow: externalOnEditRow,
  onDeleteRow: externalOnDeleteRow,
  isLoading = false,
}: SuppliersTableProps) {
  const router = useRouter();
  const [columns, setColumns] = useState<SupplierColumn[]>(supplierColumns);
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const [zoom, setZoom] = useState<number>(100);

  const currentPage = externalCurrentPage ?? internalCurrentPage;
  const totalPages = externalTotalPages ?? 1;
  const pageSize = 20;

  const handlePageChange = (page: number) => {
    if (externalOnPageChange) {
      externalOnPageChange(page);
    } else {
      setInternalCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = externalOnPageChange
    ? data
    : data.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof SupplierTableRow) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<SupplierTableRow>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
    }));

  const handleSaveRow = (_row: SupplierTableRow) => {
    // Save is handled by the sheet
  };

  const handleEditRow = (row: SupplierTableRow) => {
    if (externalOnEditRow) {
      externalOnEditRow(row);
    }
  };

  const handleDeleteRow = (row: SupplierTableRow) => {
    if (externalOnDeleteRow) {
      externalOnDeleteRow(row);
    }
  };

  const handleViewRow = (row: SupplierTableRow) => {
    router.push(`/dashboard/warehouse/suppliers/${row.id}`);
  };

  const isEmpty = currentPageData.length === 0;

  return (
    <div className="bg-white rounded-2xl p-6 mt-5">
      {/* Top Actions Bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          {/* Columns dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="flex h-[42px] items-center gap-2">
                Колонки
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {columns.map(column => (
                <DropdownMenuItem
                  key={column.key}
                  onClick={() => toggleColumnVisibility(column.key)}
                  className="flex items-center justify-between">
                  <span>{column.label}</span>
                  {column.visible && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Zoom dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="flex h-[42px] items-center gap-2">
                {zoom}%
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setZoom(50)}>
                50%
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setZoom(75)}>
                75%
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setZoom(100)}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setZoom(125)}>
                125%
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setZoom(150)}>
                150%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-[42px] w-[42px] rounded-full">
            <Printer className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-[42px] w-[42px] rounded-full">
            <Upload className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* DataTable */}
      {isEmpty && !isLoading ? (
        <div className="flex items-center justify-center py-10 text-gray-500">
          Нічого не знайдено
        </div>
      ) : (
        <div className="w-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-[#6D7A87]">Завантаження...</p>
            </div>
          ) : (
            <DataTable
              data={currentPageData}
              columns={visibleColumns}
              idField="id"
              enableEditOnDoubleClick={false}
              fontSize={
                zoom <= 60
                  ? "xs"
                  : zoom <= 85
                    ? "sm"
                    : zoom <= 110
                      ? "base"
                      : zoom <= 135
                        ? "lg"
                        : "xl"
              }
              onSaveRow={handleSaveRow}
              onViewRow={handleViewRow}
              onEditRow={handleEditRow}
              onDeleteRow={handleDeleteRow}
              className="cursor-pointer"
              showActionsColumn={true}
            />
          )}
        </div>
      )}

      {/* Pagination */}
      {!isEmpty && (
        <div className="flex justify-end mt-6 w-full">
          <div className="w-fit">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
