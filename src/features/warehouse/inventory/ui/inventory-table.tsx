"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { Check, ChevronDown, Download, Settings, Upload } from "lucide-react";

import { useDeleteInventory } from "@/hooks/use-delete-inventory";

import { Inventory, InventoryStatus } from "@/service/inventories.service";

import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Pagination } from "@/shared/ui/pagination";

interface InventoryColumn {
  key: keyof InventoryTableRow;
  label: string;
  visible: boolean;
  sortable: boolean;
  width?: string;
  type: "text" | "number" | "date" | "status";
}

interface InventoryTableRow {
  id: string;
  date: string;
  inventoryNumber: string;
  status: InventoryStatus;
  itemsCount: number;
  comment?: string;
}

interface InventoryTableProps {
  inventories: Inventory[];
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  total: number;
}

const STATUS_LABELS: Record<InventoryStatus, string> = {
  IN_PROGRESS: "В процесі",
  PENDING: "На розгляді",
  APPROVED: "Затверджено",
  REJECTED: "Відхилено",
};

const STATUS_COLORS: Record<InventoryStatus, string> = {
  IN_PROGRESS: "bg-yellow-100 text-yellow-800",
  PENDING: "bg-blue-100 text-blue-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

function mapInventoryToTableRow(inventory: Inventory): InventoryTableRow {
  return {
    id: inventory.id,
    date: inventory.date,
    inventoryNumber: inventory.inventoryNumber,
    status: inventory.status,
    itemsCount: inventory._count?.items ?? inventory.items?.length ?? 0,
    comment: inventory.comment,
  };
}

const defaultColumns: InventoryColumn[] = [
  {
    key: "date",
    label: "Дата",
    visible: true,
    sortable: true,
    width: "120px",
    type: "date",
  },
  {
    key: "inventoryNumber",
    label: "Номер",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "status",
    label: "Статус",
    visible: true,
    sortable: true,
    width: "140px",
    type: "status",
  },
  {
    key: "itemsCount",
    label: "Кількість позицій",
    visible: true,
    sortable: false,
    width: "150px",
    type: "number",
  },
  {
    key: "comment",
    label: "Коментар",
    visible: true,
    sortable: false,
    width: "200px",
    type: "text",
  },
];

export default function InventoryTable({
  inventories,
  isLoading = false,
  currentPage,
  totalPages,
  onPageChange,
  total,
}: InventoryTableProps) {
  const router = useRouter();
  const [columns, setColumns] = useState<InventoryColumn[]>(defaultColumns);
  const { deleteInventory } = useDeleteInventory();

  const pageSize = 20;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);

  const tableData = inventories.map(mapInventoryToTableRow);

  const toggleColumnVisibility = (columnKey: keyof InventoryTableRow) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<InventoryTableRow>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type as "text" | "number" | "date",
      render:
        col.key === "date"
          ? (value: string) => format(new Date(value), "dd.MM.yyyy")
          : col.key === "status"
            ? (value: InventoryStatus) => (
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[value]}`}>
                  {STATUS_LABELS[value]}
                </span>
              )
            : col.key === "comment"
              ? (value: string) => value || "-"
              : undefined,
    }));

  const handleViewRow = (row: InventoryTableRow) => {
    router.push(`/dashboard/warehouse/inventory/${row.id}`);
  };

  const handleEditRow = (row: InventoryTableRow) => {
    if (row.status === "IN_PROGRESS" || row.status === "REJECTED") {
      router.push(`/dashboard/warehouse/inventory/${row.id}`);
    }
  };

  const handleDeleteRow = (row: InventoryTableRow) => {
    if (row.status !== "APPROVED") {
      deleteInventory(row.id);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-full bg-white rounded-[16px] mt-5 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3A4754]" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full bg-white rounded-[16px] mt-5">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="flex h-[42px] items-center gap-2">
                100%
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>50%</DropdownMenuItem>
              <DropdownMenuItem>75%</DropdownMenuItem>
              <DropdownMenuItem>100%</DropdownMenuItem>
              <DropdownMenuItem>125%</DropdownMenuItem>
              <DropdownMenuItem>150%</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="icon"
            className="h-[42px] w-[42px] rounded-full">
            <Upload className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-[42px] w-[42px] rounded-full">
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-[42px] w-[42px] rounded-full">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="max-w-[100vw] overflow-x-auto">
        <DataTable
          data={tableData}
          columns={visibleColumns}
          idField="id"
          onViewRow={handleViewRow}
          onEditRow={handleEditRow}
          onDeleteRow={handleDeleteRow}
          className="rounded-none"
          showActionsColumn={true}
          enableEditOnDoubleClick={false}
        />
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Показано {startIndex + 1}-{endIndex} з {total} записів
          </div>
          {totalPages > 1 && (
            <div className="w-fit">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
