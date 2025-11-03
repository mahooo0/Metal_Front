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

import { mockPriceCuttingTableData } from "../mocks/price-cutting-table.mock";
import type {
  PriceCuttingTableColumn,
  PriceCuttingTableItem,
} from "../types/price-cutting-table.types";

// Column definitions for price cutting table
const priceCuttingTableColumns: PriceCuttingTableColumn[] = [
  {
    key: "material",
    label: "Матеріал",
    visible: true,
    sortable: true,
    width: "250px",
    type: "text",
  },
  {
    key: "thickness",
    label: "↑↓ Товщина, мм",
    visible: true,
    sortable: true,
    width: "140px",
    type: "text",
  },
  {
    key: "from100ml",
    label: "Від 100 мл",
    visible: true,
    sortable: true,
    width: "130px",
    type: "text",
  },
  {
    key: "from50_100ml",
    label: "Від 50-100 мл",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "from10_50ml",
    label: "Від 10-50 мл",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "to10ml",
    label: "До 10 мл",
    visible: true,
    sortable: true,
    width: "130px",
    type: "text",
  },
  {
    key: "supply",
    label: "Подача, різка",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "cuttingTime",
    label: "Час порізки",
    visible: true,
    sortable: true,
    width: "140px",
    type: "text",
  },
];

export function PriceCuttingTable() {
  const [columns, setColumns] = useState<PriceCuttingTableColumn[]>(
    priceCuttingTableColumns
  );
  const [data] = useState<PriceCuttingTableItem[]>(mockPriceCuttingTableData);
  const router = useRouter();
  const toggleColumnVisibility = (columnKey: keyof PriceCuttingTableItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<PriceCuttingTableItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
    }));

  const handleSaveRow = (_row: PriceCuttingTableItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (row: PriceCuttingTableItem) => {
    router.push(`/dashboard/warehouse/prices/cutting/${row.id}`);
    // TODO: Implement edit row functionality
  };

  const handleDeleteRow = (_row: PriceCuttingTableItem) => {
    // TODO: Implement delete row functionality
  };

  return (
    <div className="max-w-full bg-white rounded-[16px] mt-5 border border-[#E8EDF2]">
      {/* Header with controls */}
      <div className="flex items-center justify-between p-4 border-b border-[#E8EDF2]">
        <h2 className="text-[#3A4754] text-lg font-semibold">
          Ціна в залежності від кількості м/п, грн з НДС
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
