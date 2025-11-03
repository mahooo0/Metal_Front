"use client";

import React, { useState } from "react";

import { Check, ChevronDown, Plus, Printer, Upload } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Pagination } from "@/shared/ui/pagination";

import { mockProductionData } from "../mocks/production.mock";
import { ProductionColumn, ProductionItem } from "../types/production.types";

// Column definitions for current tasks table
const currentTasksColumns: ProductionColumn[] = [
  {
    key: "creationDate",
    label: "Дата створення",
    visible: true,
    sortable: true,
    width: "120px",
    type: "date",
  },
  {
    key: "processingStartDate",
    label: "Дата поч. обробки",
    visible: true,
    sortable: true,
    width: "140px",
    type: "date",
  },
  {
    key: "orderNumber",
    label: "Номер замовлення",
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
    width: "150px",
    type: "text",
  },
  {
    key: "customerOrderNumber",
    label: "Найменування уп",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "activePlannedTime",
    label: "Ативний пл. час, хв.",
    visible: true,
    sortable: true,
    width: "140px",
    type: "text",
  },
  {
    key: "activeActualTime",
    label: "Ативний факт. час хв.",
    visible: true,
    sortable: true,
    width: "160px",
    type: "text",
  },
  {
    key: "startTime",
    label: "Час початку вик.",
    visible: true,
    sortable: true,
    width: "130px",
    type: "text",
  },
  {
    key: "endTime",
    label: "Час зак.вик.",
    visible: true,
    sortable: true,
    width: "120px",
    type: "text",
  },
  {
    key: "comment",
    label: "Коментар",
    visible: true,
    sortable: false,
    width: "150px",
    type: "text",
  },
];

export default function CurrentTasksTable() {
  const [columns, setColumns] =
    useState<ProductionColumn[]>(currentTasksColumns);
  const [data] = useState<ProductionItem[]>(mockProductionData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Calculate total pages based on data length
  const totalPages = Math.ceil(data.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof ProductionItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<ProductionItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
      options: col.options,
    }));

  const handleSaveRow = (_row: ProductionItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (_row: ProductionItem) => {
    // This will trigger edit mode in DataTable
  };

  const handleDeleteRow = (_row: ProductionItem) => {
    // TODO: Implement delete row functionality
  };

  return (
    <div className="max-w-full bg-white rounded-[16px] mt-5">
      {/* Header with controls */}
      <div className="flex items-center justify-end p-4 border-b">
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
          <Button
            variant="outline"
            size="icon"
            className="h-[42px] w-[42px] rounded-full">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-[91vw] overflow-x-auto">
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
    </div>
  );
}
