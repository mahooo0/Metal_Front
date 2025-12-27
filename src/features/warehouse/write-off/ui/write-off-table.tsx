"use client";

import React, { useState } from "react";

import { format } from "date-fns";
import { Check, ChevronDown, Download, Settings, Upload } from "lucide-react";

import { WriteOff, WriteOffStatus } from "@/service/write-offs.service";

import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Pagination } from "@/shared/ui/pagination";

import type { WriteOffTableRow, WriteOffColumn } from "../types/write-off.types";

interface WriteOffTableProps {
  data: WriteOff[];
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

const STATUS_LABELS: Record<WriteOffStatus, string> = {
  DRAFT: "Чернетка",
  PENDING: "На розгляді",
  COMPLETED: "Завершено",
};

const STATUS_COLORS: Record<WriteOffStatus, string> = {
  DRAFT: "bg-gray-100 text-gray-700",
  PENDING: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
};

function mapWriteOffToTableRow(writeOff: WriteOff): WriteOffTableRow {
  return {
    id: writeOff.id,
    writeOffNumber: writeOff.writeOffNumber,
    date: writeOff.date,
    status: writeOff.status,
    totalQuantity: writeOff.totalQuantity,
    totalAmount: writeOff.totalAmount,
    itemsCount: writeOff._count?.items ?? writeOff.items?.length ?? 0,
    comment: writeOff.comment,
    createdAt: writeOff.createdAt,
  };
}

export default function WriteOffTable({
  data,
  isLoading,
  currentPage,
  totalPages,
  total,
  onPageChange,
  onDelete,
  onView,
  onEdit,
}: WriteOffTableProps) {
  const getWriteOffColumns = (): WriteOffColumn[] => [
    {
      key: "writeOffNumber",
      label: "Номер списання",
      visible: true,
      sortable: true,
      width: "150px",
      type: "text",
    },
    {
      key: "date",
      label: "Дата",
      visible: true,
      sortable: true,
      width: "120px",
      type: "date",
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
      key: "totalQuantity",
      label: "Кількість",
      visible: true,
      sortable: false,
      width: "100px",
      type: "number",
    },
    {
      key: "totalAmount",
      label: "Сума",
      visible: true,
      sortable: true,
      width: "120px",
      type: "number",
    },
    {
      key: "itemsCount",
      label: "Позицій",
      visible: true,
      sortable: false,
      width: "100px",
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

  const [columns, setColumns] = useState<WriteOffColumn[]>(getWriteOffColumns());

  const tableData = data.map(mapWriteOffToTableRow);

  const toggleColumnVisibility = (columnKey: keyof WriteOffTableRow) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<WriteOffTableRow>[] = columns
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
            ? (value: WriteOffStatus) => (
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[value]}`}>
                  {STATUS_LABELS[value]}
                </span>
              )
            : col.key === "totalAmount"
              ? (value: number) => `${value.toLocaleString()} грн`
              : undefined,
    }));

  const handleDeleteRow = (row: WriteOffTableRow) => {
    if (row.status === "DRAFT") {
      onDelete(row.id);
    }
  };

  const handleViewRow = (row: WriteOffTableRow) => {
    onView(row.id);
  };

  const handleEditRow = (row: WriteOffTableRow) => {
    if (row.status === "DRAFT") {
      onEdit(row.id);
    }
  };

  const pageSize = 20;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);

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
          <div className="w-fit">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
