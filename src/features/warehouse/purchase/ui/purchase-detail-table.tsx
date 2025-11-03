"use client";

import React, { useState } from "react";

import { Check, ChevronDown, Download, Settings, Upload } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import { mockPurchaseDetailData } from "../mocks/purchase-detail.mock";
import type {
  PurchaseDetailColumn,
  PurchaseDetailItem,
} from "../types/purchase-detail.types";

// Column definitions for purchase detail table
const purchaseDetailColumns: PurchaseDetailColumn[] = [
  {
    key: "productName",
    label: "↑↓ Назва товару",
    visible: true,
    sortable: true,
    width: "250px",
    type: "text",
  },
  {
    key: "thickness",
    label: "Товщина",
    visible: true,
    sortable: true,
    width: "120px",
    type: "text",
  },
  {
    key: "type",
    label: "Тип",
    visible: true,
    sortable: true,
    width: "200px",
    type: "text",
  },
  {
    key: "size",
    label: "Розмір",
    visible: true,
    sortable: true,
    width: "120px",
    type: "text",
  },
  {
    key: "expected",
    label: "Очікуємо",
    visible: true,
    sortable: true,
    width: "120px",
    type: "text",
  },
  {
    key: "purchasePrice",
    label: "Ціна закупки",
    visible: true,
    sortable: true,
    width: "140px",
    type: "text",
  },
  {
    key: "salePrice",
    label: "Ціна продажу",
    visible: true,
    sortable: true,
    width: "140px",
    type: "text",
  },
  {
    key: "costAmount",
    label: "Сума собівартості",
    visible: true,
    sortable: true,
    width: "160px",
    type: "text",
  },
];

export default function PurchaseDetailTable() {
  const [columns, setColumns] = useState<PurchaseDetailColumn[]>(
    purchaseDetailColumns
  );
  const [data] = useState<PurchaseDetailItem[]>(mockPurchaseDetailData);

  const toggleColumnVisibility = (columnKey: keyof PurchaseDetailItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<PurchaseDetailItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
    }));

  const handleSaveRow = (_row: PurchaseDetailItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (row: PurchaseDetailItem) => {
    console.log("Edit row:", row);
    // TODO: Implement edit row functionality
  };

  const handleDeleteRow = (_row: PurchaseDetailItem) => {
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
      <div className="max-w-[90vw] overflow-x-auto">
        <DataTable
          data={data}
          columns={visibleColumns}
          idField="id"
          onSaveRow={handleSaveRow}
          onEditRow={handleEditRow}
          onDeleteRow={handleDeleteRow}
          className="rounded-none"
          showActionsColumn={true}
        />
      </div>
    </div>
  );
}
