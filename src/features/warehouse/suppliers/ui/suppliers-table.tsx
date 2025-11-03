"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { Check, ChevronDown, Download, Settings, Upload } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Pagination } from "@/shared/ui/pagination";

import { mockSuppliers } from "../mocks/suppliers.mock";
import type {
  SupplierColumn,
  SupplierItem,
  SuppliersTableProps,
} from "../types/supplier.types";

// Определения колонок в стиле MaterialsTable
const suppliersColumns: SupplierColumn[] = [
  {
    key: "date" as unknown as keyof SupplierItem, // placeholder to keep order; overridden below
    label: "↑↓ Дата створення",
    visible: true,
    sortable: true,
    width: "160px",
    type: "date",
  },
  {
    key: "name",
    label: "Назва",
    visible: true,
    sortable: true,
    width: "280px",
    type: "text",
  },
  {
    key: "supplierId",
    label: "ID",
    visible: true,
    sortable: true,
    width: "160px",
    type: "text",
  },
  {
    key: "contacts",
    label: "Контакти",
    visible: true,
    sortable: false,
    width: "180px",
    type: "text",
  },
];

export default function SuppliersTable({ onSaveRow }: SuppliersTableProps) {
  const router = useRouter();
  const [columns, setColumns] = React.useState<SupplierColumn[]>([
    { ...suppliersColumns[0], key: "creationDate" },
    suppliersColumns[1],
    suppliersColumns[2],
    suppliersColumns[3],
  ] as unknown as SupplierColumn[]);
  const [data] = React.useState<SupplierItem[]>(mockSuppliers);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize] = React.useState(10);

  // Пагинация как в MaterialsTable
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof SupplierItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<SupplierItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
    }));

  const handleSaveRow = (row: SupplierItem) => {
    onSaveRow?.(row);
  };

  const handleEditRow = (_row: SupplierItem) => {};
  const handleDeleteRow = (_row: SupplierItem) => {};
  const handleViewRow = (row: SupplierItem) => {
    router.push(`/dashboard/warehouse/suppliers/${row.id}`);
  };

  return (
    <div className="max-w-full bg-white rounded-[16px] mt-5">
      {/* Header с контролами как в MaterialsTable */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          {/* Дропдаун видимости колонок */}
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
                  key={String(column.key)}
                  onClick={() => toggleColumnVisibility(column.key)}
                  className="flex items-center justify-between">
                  <span>{column.label}</span>
                  {column.visible && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Zoom (макет, как в MaterialsTable) */}
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

          {/* Кнопки действий */}
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

        <div className="flex items-center gap-2" />
      </div>

      {/* Таблица */}
      <div className="max-w-[100vw] overflow-x-auto">
        <DataTable
          data={currentPageData}
          columns={visibleColumns}
          idField="id"
          onSaveRow={handleSaveRow}
          onViewRow={handleViewRow}
          onEditRow={handleEditRow}
          onDeleteRow={handleDeleteRow}
          className="rounded-none"
          showActionsColumn={true}
        />
      </div>

      {/* Пагинация */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Показано {startIndex + 1}-{Math.min(endIndex, data.length)} з{" "}
            {data.length} записів
          </div>
          <div className="w-fit">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
