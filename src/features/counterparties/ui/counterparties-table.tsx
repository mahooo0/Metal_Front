"use client";

import * as React from "react";

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

import { mockCounterparties } from "../mocks/counterparties.mock";
import {
  CounterpartiesTableProps,
  CounterpartyItem,
} from "../types/counterparty.types";

interface ColumnConfig extends DataTableColumn<CounterpartyItem> {
  visible: boolean;
}

export default function CounterpartiesTable({
  data = mockCounterparties,
  onSaveRow,
  onPageChange,
  onLimitChange,
  onDeleteRow,
  currentPage = 1,
  totalPages = 1,
  total,
  limit = 20,
}: CounterpartiesTableProps) {
  const router = useRouter();
  const [columns, setColumns] = React.useState<ColumnConfig[]>([
    {
      key: "createdAt",
      label: "Дата створення",
      sortable: true,
      width: "w-40",
      type: "date",
      visible: true,
      render: (value: string) => {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          return value;
        }
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
      },
    },
    {
      key: "name",
      label: "Назва",
      sortable: true,
      width: "w-48",
      type: "text",
      visible: true,
    },
    {
      key: "id",
      label: "ID",
      sortable: false,
      width: "w-36",
      type: "text",
      visible: true,
      render: (value: string) => (
        <span className="text-xs text-gray-500 font-mono">
          {value.substring(0, 8)}...
        </span>
      ),
    },
    {
      key: "comment",
      label: "Коментар",
      sortable: false,
      width: "w-64",
      type: "text",
      visible: true,
      render: (value: string | null) => (
        <span className="text-sm text-gray-600">
          {value || <span className="text-gray-400">Немає коментаря</span>}
        </span>
      ),
    },
    {
      key: "edrpou",
      label: "ЄДРПОУ",
      sortable: false,
      width: "w-32",
      type: "text",
      visible: true,
      render: (value: string | null) => (
        <span className="text-sm text-gray-600 font-mono">
          {value || <span className="text-gray-400">—</span>}
        </span>
      ),
    },
    {
      key: "ipn",
      label: "ІПН",
      sortable: false,
      width: "w-32",
      type: "text",
      visible: true,
      render: (value: string | null) => (
        <span className="text-sm text-gray-600 font-mono">
          {value || <span className="text-gray-400">—</span>}
        </span>
      ),
    },
  ]);

  const toggleColumnVisibility = (columnKey: string) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleSaveRow = (row: CounterpartyItem) => {
    if (onSaveRow) {
      onSaveRow(row);
    }
  };

  const handleEditRow = (row: CounterpartyItem) => {
    console.log("Edit counterparty:", row);
    // This will trigger edit mode in DataTable
  };

  const handleDeleteRow = (row: CounterpartyItem) => {
    if (onDeleteRow) {
      onDeleteRow(row);
    }
  };

  const handleViewRow = (row: CounterpartyItem) => {
    router.push(`/dashboard/counterparties/${row.id}`);
  };

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

          {/* Limit selector */}
          {onLimitChange && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex h-[42px] items-center gap-2">
                  {limit} на сторінці
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem
                  onClick={() => onLimitChange(10)}
                  className={limit === 10 ? "bg-gray-100" : ""}>
                  <span className="flex items-center gap-2">
                    10
                    {limit === 10 && <Check className="h-4 w-4" />}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onLimitChange(20)}
                  className={limit === 20 ? "bg-gray-100" : ""}>
                  <span className="flex items-center gap-2">
                    20
                    {limit === 20 && <Check className="h-4 w-4" />}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onLimitChange(50)}
                  className={limit === 50 ? "bg-gray-100" : ""}>
                  <span className="flex items-center gap-2">
                    50
                    {limit === 50 && <Check className="h-4 w-4" />}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onLimitChange(100)}
                  className={limit === 100 ? "bg-gray-100" : ""}>
                  <span className="flex items-center gap-2">
                    100
                    {limit === 100 && <Check className="h-4 w-4" />}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Zoom dropdown */}
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
      <div className="max-w-[95vw] overflow-x-auto">
        <DataTable
          data={data}
          columns={columns.filter(col => col.visible)}
          idField="id"
          onSaveRow={handleSaveRow}
          onViewRow={handleViewRow}
          onEditRow={handleEditRow}
          onDeleteRow={handleDeleteRow}
          onRowDoubleClick={row => {
            router.push(`/dashboard/counterparties/${row.id}`);
          }}
          className="cursor-pointer rounded-none"
          showActionsColumn={true}
          currentPage={1}
          totalPages={1}
        />
      </div>

      {/* Pagination */}
      {totalPages > 1 && onPageChange && (
        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Показано {(currentPage - 1) * limit + 1}-
              {Math.min(currentPage * limit, total || data.length)} з{" "}
              {total || data.length} записів
            </div>
            <div className="w-fit">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
