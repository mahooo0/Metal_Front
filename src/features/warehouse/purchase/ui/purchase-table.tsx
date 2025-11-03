"use client";

import React, { useState } from "react";

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

import { mockPurchaseData } from "../mocks/purchase.mock";
import type {
  PurchaseColumn,
  PurchaseItem,
  PurchaseStatus,
} from "../types/purchase.types";
import EditPurchaseDialog from "./edit-purchase-dialog";

// Status badge component
const StatusBadge = ({ status }: { status: PurchaseStatus }) => {
  const getStatusStyles = (status: PurchaseStatus) => {
    switch (status) {
      case "У процесі":
        return "bg-green-100 text-green-800";
      case "На розгляді":
        return "bg-blue-100 text-blue-800";
      case "Планування":
        return "bg-pink-100 text-pink-800";
      case "Прорахунок":
        return "bg-purple-100 text-purple-800";
      case "Запуск":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(status)}`}>
      {status}
    </span>
  );
};

// Column definitions for purchase table
const purchaseColumns: PurchaseColumn[] = [
  {
    key: "date",
    label: "↑↓ Дата",
    visible: true,
    sortable: true,
    width: "120px",
    type: "date",
  },
  {
    key: "idNumber",
    label: "ID",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "quantity",
    label: "Кількість",
    visible: true,
    sortable: true,
    width: "120px",
    type: "text",
  },
  {
    key: "amount",
    label: "Сума",
    visible: true,
    sortable: true,
    width: "120px",
    type: "text",
  },
  {
    key: "status",
    label: "↑↓ Статус",
    visible: true,
    sortable: true,
    width: "140px",
    type: "text",
    render: (value: PurchaseStatus) => <StatusBadge status={value} />,
  },
  {
    key: "supplier",
    label: "↑↓ Постачальник",
    visible: true,
    sortable: true,
    width: "250px",
    type: "text",
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

export default function PurchaseTable() {
  const router = useRouter();
  const [columns, setColumns] = useState<PurchaseColumn[]>(purchaseColumns);
  const [data, setData] = useState<PurchaseItem[]>(mockPurchaseData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<PurchaseItem | null>(null);

  // Calculate total pages based on data length
  const totalPages = Math.ceil(data.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof PurchaseItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<PurchaseItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
      render: col.render,
    }));

  const handleSaveRow = (_row: PurchaseItem) => {
    router.push(`/dashboard/warehouse/purchase/${_row.id}`);

    // TODO: Implement save row functionality
  };

  const handleEditRow = (row: PurchaseItem) => {
    setSelectedRow(row);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = (updatedData: {
    supplier: string;
    comment: string;
  }) => {
    if (selectedRow) {
      setData(prevData =>
        prevData.map(item =>
          item.id === selectedRow.id ? { ...item, ...updatedData } : item
        )
      );
    }
    setIsEditDialogOpen(false);
    setSelectedRow(null);
  };

  const handleDeleteRow = (_row: PurchaseItem) => {
    // TODO: Implement delete row functionality
  };

  return (
    <div className="max-w-full bg-white rounded-[16px] mt-5">
      {/* Header with controls */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          {/* Column visibility dropdown */}
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

          {/* Action buttons */}
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

      {/* Table */}
      <div className="max-w-[100vw] overflow-x-auto">
        <DataTable
          data={currentPageData}
          columns={visibleColumns}
          idField="id"
          onSaveRow={handleSaveRow}
          onEditRow={handleEditRow}
          onDeleteRow={handleDeleteRow}
          className="rounded-none"
          showActionsColumn={true}
        />
      </div>

      {/* Pagination */}
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

      {/* Edit Dialog */}
      <EditPurchaseDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedRow(null);
        }}
        onSave={handleSaveEdit}
        initialData={selectedRow}
      />
    </div>
  );
}
