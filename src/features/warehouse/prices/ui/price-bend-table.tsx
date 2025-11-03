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

import { mockPriceTableData } from "../mocks/price-table.mock";
import type {
  PriceTableColumn,
  PriceTableItem,
} from "../types/price-table.types";

// Column definitions for price table
const priceTableColumns: PriceTableColumn[] = [
  {
    key: "thickness",
    label: "↑↓ Товщина, довжина",
    visible: true,
    sortable: true,
    width: "200px",
    type: "text",
  },
  {
    key: "range0_1000",
    label: "0-1000",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "range1001_2000",
    label: "1001-2000",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "range2001_3000",
    label: "2001-3000",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
];

export function PriceBendTable() {
  const [columns, setColumns] = useState<PriceTableColumn[]>(priceTableColumns);
  const [data] = useState<PriceTableItem[]>(mockPriceTableData);

  const toggleColumnVisibility = (columnKey: keyof PriceTableItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<PriceTableItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
    }));

  const handleSaveRow = (_row: PriceTableItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (row: PriceTableItem) => {
    console.log("Edit row:", row);
    // TODO: Implement edit row functionality
  };

  const handleDeleteRow = (_row: PriceTableItem) => {
    // TODO: Implement delete row functionality
  };

  return (
    <div className="max-w-full bg-white rounded-[16px] mt-5 border border-[#E8EDF2]">
      {/* Header with controls */}
      <div className="flex items-center justify-between p-4 border-b border-[#E8EDF2]">
        <h2 className="text-[#3A4754] text-lg font-semibold">
          Ціна за один згиб в залежності від товщини та довжини, грн з НДС
        </h2>
        <div className="flex items-center gap-2">
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
