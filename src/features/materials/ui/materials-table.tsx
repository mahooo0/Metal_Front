"use client";

import React, { useState } from "react";

import {
  Check,
  ChevronDown,
  MoreVertical,
  Printer,
  SquarePlus,
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

// Types for materials table
export interface MaterialItem {
  id: string;
  name: string;
  thickness: number;
  weight: number;
  length: number;
  width: number;
  quantity: number;
  comment: string;
}

export interface MaterialColumn {
  key: keyof MaterialItem;
  label: string;
  visible: boolean;
  sortable?: boolean;
  width?: string;
  type?: "text" | "date" | "select" | "number";
  options?: { value: string; label: string }[];
}

// Mock data for materials
const mockMaterials: MaterialItem[] = [
  {
    id: "1",
    name: "н/ж: 504 28 [мат) 6,00...",
    thickness: 4,
    weight: 177,
    length: 123,
    width: 123,
    quantity: 56,
    comment: "Lorem ipsum...",
  },
  {
    id: "2",
    name: "н/ж: 504 28 [мат) 6,00...",
    thickness: 1,
    weight: 56,
    length: 179,
    width: 131,
    quantity: 44,
    comment: "Lorem ipsum...",
  },
  {
    id: "3",
    name: "н/ж: 504 28 [мат) 6,00...",
    thickness: 3,
    weight: 123,
    length: 131,
    width: 140,
    quantity: 177,
    comment: "Lorem ipsum...",
  },
  {
    id: "4",
    name: "н/ж: 504 28 [мат) 6,00...",
    thickness: 0,
    weight: 140,
    length: 56,
    width: 177,
    quantity: 131,
    comment: "Lorem ipsum...",
  },
  {
    id: "5",
    name: "н/ж: 504 28 [мат) 6,00...",
    thickness: 5,
    weight: 179,
    length: 177,
    width: 56,
    quantity: 175,
    comment: "Lorem ipsum...",
  },
  {
    id: "6",
    name: "н/ж: 504 28 [мат) 6,00...",
    thickness: 2,
    weight: 175,
    length: 175,
    width: 44,
    quantity: 123,
    comment: "Lorem ipsum...",
  },
  {
    id: "7",
    name: "н/ж: 504 28 [мат) 6,00...",
    thickness: 4,
    weight: 123,
    length: 44,
    width: 175,
    quantity: 56,
    comment: "Lorem ipsum...",
  },
  {
    id: "8",
    name: "н/ж: 504 28 [мат) 6,00...",
    thickness: 1,
    weight: 56,
    length: 179,
    width: 179,
    quantity: 44,
    comment: "Lorem ipsum...",
  },
  {
    id: "9",
    name: "н/ж: 504 28 [мат) 6,00...",
    thickness: 3,
    weight: 123,
    length: 131,
    width: 140,
    quantity: 177,
    comment: "Lorem ipsum...",
  },
  {
    id: "10",
    name: "н/ж: 504 28 [мат) 6,00...",
    thickness: 0,
    weight: 140,
    length: 56,
    width: 177,
    quantity: 131,
    comment: "Lorem ipsum...",
  },
  {
    id: "11",
    name: "н/ж: 504 28 [мат) 6,00...",
    thickness: 5,
    weight: 179,
    length: 177,
    width: 56,
    quantity: 175,
    comment: "Lorem ipsum...",
  },
  {
    id: "12",
    name: "н/ж: 504 28 [мат) 6,00...",
    thickness: 2,
    weight: 175,
    length: 175,
    width: 44,
    quantity: 123,
    comment: "Lorem ipsum...",
  },
  {
    id: "13",
    name: "н/ж: 504 28 [мат) 6,00...",
    thickness: 4,
    weight: 123,
    length: 44,
    width: 175,
    quantity: 56,
    comment: "Lorem ipsum...",
  },
];

// Column definitions for materials
const materialColumns: MaterialColumn[] = [
  {
    key: "name",
    label: " Назва",
    visible: true,
    sortable: true,
    width: "400px",
    type: "text",
  },
  {
    key: "thickness",
    label: " товщина",
    visible: true,
    sortable: true,
    width: "40px",
    type: "number",
  },
  {
    key: "weight",
    label: " вага",
    visible: true,
    sortable: true,
    width: "40px",
    type: "number",
  },
  {
    key: "length",
    label: " довжина",
    visible: true,
    sortable: true,
    width: "40px",
    type: "number",
  },
  {
    key: "width",
    label: " ширина",
    visible: true,
    sortable: true,
    width: "40px",
    type: "number",
  },
  {
    key: "quantity",
    label: " Кількість",
    visible: true,
    sortable: true,
    width: "80px",
    type: "number",
  },
  {
    key: "comment",
    label: " Коментар",
    visible: true,
    sortable: true,
    width: "200px",
    type: "text",
  },
];

export default function MaterialsTable() {
  const [columns, setColumns] = useState<MaterialColumn[]>(materialColumns);
  const [data] = useState<MaterialItem[]>(mockMaterials);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Calculate total pages based on data length
  const totalPages = Math.ceil(data.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof MaterialItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<MaterialItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
      options: col.options,
    }));

  const handleSaveRow = (_row: MaterialItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (_row: MaterialItem) => {
    // This will trigger edit mode in DataTable
  };

  const handleDeleteRow = (_row: MaterialItem) => {
    // TODO: Implement delete row functionality
  };

  const renderActionsCell = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Редагувати</DropdownMenuItem>
          <DropdownMenuItem>Видалити</DropdownMenuItem>
          <DropdownMenuItem>Копіювати</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
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
