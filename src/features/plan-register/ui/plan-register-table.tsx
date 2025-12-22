"use client";

import React, { useState } from "react";

import { Check, ChevronDown, FileText, Printer, Upload } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Pagination } from "@/shared/ui/pagination";

import {
  PlanRegisterColumn,
  PlanRegisterItem,
} from "../types/plan-register.types";
import { mapPlanRecordToTableItem } from "../utils/map-plan-record-to-table";

interface PlanRegisterTableProps {
  data?: PlanRegisterItem[];
  currentPage?: number;
  totalPages?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  onEditRow?: (row: PlanRegisterItem) => void;
  onDeleteRow?: (row: PlanRegisterItem) => void;
  isLoading?: boolean;
}

// Column definitions for plan register
const planRegisterColumns: PlanRegisterColumn[] = [
  {
    key: "registrationDate",
    label: "Дата реєстрації",
    visible: true,
    sortable: true,
    width: "150px",
    type: "date",
  },
  {
    key: "planNumber",
    label: "№ плану",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "orderNumber",
    label: "№ замовлення",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "customer",
    label: "Замовник",
    visible: true,
    sortable: true,
    width: "200px",
    type: "text",
  },
  {
    key: "metalGrade",
    label: "Марка металу",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "metalThickness",
    label: "Товщина металу",
    visible: true,
    sortable: true,
    width: "150px",
    type: "number",
  },
  {
    key: "files",
    label: "Файли",
    visible: true,
    sortable: false,
    width: "150px",
    type: "text",
    render: (value: string | number) => (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-blue-600" />
        <span className="text-sm">{value}</span>
      </div>
    ),
  },
];

export default function PlanRegisterTable({
  data = [],
  currentPage: externalCurrentPage,
  totalPages: externalTotalPages,
  total: externalTotal,
  onPageChange: externalOnPageChange,
  onEditRow: externalOnEditRow,
  onDeleteRow: externalOnDeleteRow,
  isLoading = false,
}: PlanRegisterTableProps) {
  const [columns, setColumns] =
    useState<PlanRegisterColumn[]>(planRegisterColumns);
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const [zoom, setZoom] = useState<number>(100);

  const currentPage = externalCurrentPage ?? internalCurrentPage;
  const totalPages = externalTotalPages ?? 1;
  const total = externalTotal ?? data.length;
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
  const currentPageData = data.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof PlanRegisterItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<PlanRegisterItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
      options: col.options,
    }));

  const handleSaveRow = (_row: PlanRegisterItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (row: PlanRegisterItem) => {
    if (externalOnEditRow) {
      externalOnEditRow(row);
    }
  };

  const handleDeleteRow = (row: PlanRegisterItem) => {
    if (externalOnDeleteRow) {
      externalOnDeleteRow(row);
    }
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
      {isEmpty ? (
        <div className="flex items-center justify-center py-10 text-gray-500">
          Nothing found
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
