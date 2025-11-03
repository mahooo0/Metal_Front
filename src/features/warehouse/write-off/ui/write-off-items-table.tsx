import React, { useState } from "react";

import {
  Check,
  ChevronDown,
  Download,
  MoreHorizontal,
  Settings,
  Upload,
} from "lucide-react";

import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Pagination } from "@/shared/ui/pagination";

import { mockWriteOffItemsData } from "../mocks/write-off-items.mock";
import type {
  WriteOffItem,
  WriteOffItemColumn,
} from "../types/write-off-items.types";

export default function WriteOffItemsTable() {
  const getWriteOffItemColumns = (): WriteOffItemColumn[] => [
    {
      key: "deliveryDate",
      label: "↑↓ Дата поставки",
      visible: true,
      sortable: true,
      width: "150px",
      type: "date",
    },
    {
      key: "productName",
      label: "↑↓ Назва товару",
      visible: true,
      sortable: true,
      width: "200px",
      type: "text",
    },
    {
      key: "size",
      label: "Розмір",
      visible: true,
      sortable: false,
      width: "150px",
      type: "text",
    },
    {
      key: "quantity",
      label: "Кількість",
      visible: true,
      sortable: false,
      width: "100px",
      type: "number",
    },
    {
      key: "actualWeight",
      label: "Фактична вага",
      visible: true,
      sortable: false,
      width: "150px",
      type: "text",
    },
    {
      key: "metalAmount",
      label: "Сума металу",
      visible: true,
      sortable: false,
      width: "150px",
      type: "number",
    },
    {
      key: "costPerTon",
      label: "Вартість на тону, кг.",
      visible: true,
      sortable: false,
      width: "180px",
      type: "number",
    },
  ];

  const [columns, setColumns] = useState<WriteOffItemColumn[]>(
    getWriteOffItemColumns()
  );
  const [data] = useState<WriteOffItem[]>(mockWriteOffItemsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof WriteOffItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<WriteOffItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
    }));

  const handleSaveRow = (_row: WriteOffItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (_row: WriteOffItem) => {
    // TODO: Implement edit row functionality
  };

  const handleDeleteRow = (_row: WriteOffItem) => {
    // TODO: Implement delete row functionality
  };

  const customActions = (row: WriteOffItem) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 p-0 hover:bg-gray-100">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleEditRow(row)}>
          Редагувати
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDeleteRow(row)}>
          Видалити
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

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
          customActions={customActions}
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

