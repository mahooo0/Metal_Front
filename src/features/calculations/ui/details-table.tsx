"use client";

import React, { useState } from "react";

import { Check, ChevronDown, Printer, SquarePlus, Upload } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Pagination } from "@/shared/ui/pagination";

// Types for details table
export interface DetailItem {
  id: string;
  order: number;
  detailName: string;
  material: string;
  quantity: number;
  cutLength: number;
  cutPoints: number;
  cutTime: number;
  materialThickness: number;
  metalPrice: number;
  actualWeight: number;
  bends: number;
}

export interface DetailColumn {
  key: keyof DetailItem;
  label: string;
  visible: boolean;
  sortable?: boolean;
  width?: string;
  type?: "text" | "date" | "select" | "number";
  options?: { value: string; label: string }[];
}

// Mock data for details
const mockDetails: DetailItem[] = [
  {
    id: "1",
    order: 45463,
    detailName: "Скоба -14 шт...",
    material: "н/ж: 504 28 [...]",
    quantity: 826,
    cutLength: 540,
    cutPoints: 274,
    cutTime: 423,
    materialThickness: 1577,
    metalPrice: 429,
    actualWeight: 429,
    bends: 429,
  },
  {
    id: "2",
    order: 45464,
    detailName: "Кронштейн -8 шт...",
    material: "алюміній: 6061 15 [...]",
    quantity: 450,
    cutLength: 320,
    cutPoints: 180,
    cutTime: 280,
    materialThickness: 1200,
    metalPrice: 380,
    actualWeight: 320,
    bends: 180,
  },
  {
    id: "3",
    order: 45465,
    detailName: "Пластина -25 шт...",
    material: "сталь: 316L 12 [...]",
    quantity: 1200,
    cutLength: 850,
    cutPoints: 450,
    cutTime: 650,
    materialThickness: 2100,
    metalPrice: 520,
    actualWeight: 750,
    bends: 320,
  },
  {
    id: "4",
    order: 45466,
    detailName: "Корпус -6 шт...",
    material: "титан: Grade 2 20 [...]",
    quantity: 180,
    cutLength: 1200,
    cutPoints: 600,
    cutTime: 950,
    materialThickness: 2800,
    metalPrice: 1200,
    actualWeight: 980,
    bends: 450,
  },
  {
    id: "5",
    order: 45467,
    detailName: "Кільце -50 шт...",
    material: "латунь: C36000 8 [...]",
    quantity: 2000,
    cutLength: 150,
    cutPoints: 100,
    cutTime: 120,
    materialThickness: 800,
    metalPrice: 280,
    actualWeight: 150,
    bends: 80,
  },
  {
    id: "6",
    order: 45468,
    detailName: "Втулка -12 шт...",
    material: "мідь: C10100 10 [...]",
    quantity: 600,
    cutLength: 200,
    cutPoints: 120,
    cutTime: 180,
    materialThickness: 1000,
    metalPrice: 450,
    actualWeight: 200,
    bends: 100,
  },
  {
    id: "7",
    order: 45469,
    detailName: "Фланець -4 шт...",
    material: "нерж. сталь: 304 25 [...]",
    quantity: 80,
    cutLength: 1800,
    cutPoints: 900,
    cutTime: 1400,
    materialThickness: 3500,
    metalPrice: 680,
    actualWeight: 1200,
    bends: 600,
  },
  {
    id: "8",
    order: 45470,
    detailName: "Шайба -100 шт...",
    material: "алюміній: 2024 5 [...]",
    quantity: 5000,
    cutLength: 80,
    cutPoints: 40,
    cutTime: 60,
    materialThickness: 500,
    metalPrice: 180,
    actualWeight: 80,
    bends: 30,
  },
  {
    id: "9",
    order: 45471,
    detailName: "Корпус -2 шт...",
    material: "сталь: S355 30 [...]",
    quantity: 60,
    cutLength: 2500,
    cutPoints: 1200,
    cutTime: 2000,
    materialThickness: 4200,
    metalPrice: 450,
    actualWeight: 1800,
    bends: 800,
  },
];

const initialColumns: DetailColumn[] = [
  {
    key: "order",
    label: "Замовлення",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "detailName",
    label: "Найменування деталі",
    visible: true,
    sortable: true,
    type: "text",
  },
  {
    key: "material",
    label: "Матеріал, товщ.",
    visible: true,
    sortable: true,
    type: "text",
  },
  {
    key: "quantity",
    label: "Кількість, шт",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "cutLength",
    label: "Довжина різу, мп",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "cutPoints",
    label: "Точки врізання, шт.",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "cutTime",
    label: "Час різу деталі, хв",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "materialThickness",
    label: "Товщина матеріалу, мм",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "metalPrice",
    label: "Ціна металу, грн/кг",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "actualWeight",
    label: "Вага деталей факт. кг",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "bends",
    label: "Загинів (1-1000мм)",
    visible: true,
    sortable: true,
    type: "number",
  },
];

export default function DetailsTable() {
  const [columns, setColumns] = useState<DetailColumn[]>(initialColumns);
  const [data] = useState<DetailItem[]>(mockDetails);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Calculate total pages based on data length
  const totalPages = Math.ceil(data.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof DetailItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<DetailItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
      options: col.options,
    }));

  const handleSaveRow = (_row: DetailItem) => {
    // TODO: Implement save row functionality
  };

  const handleSelectAsMain = (_row: DetailItem) => {
    // TODO: Implement select as main functionality
  };

  const handleEditRow = (_row: DetailItem) => {
    // This will trigger edit mode in DataTable
  };

  const handleDeleteRow = (_row: DetailItem) => {
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

        <div className="flex items-center gap-2">
          {/* Action buttons */}

          <Button variant="blue" size="lg" className="h-[42px]">
            <SquarePlus className="h-4 w-4" />
            Додати деталь
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-[91vw] overflow-x-auto ">
        <DataTable
          data={currentPageData}
          columns={visibleColumns}
          idField="id"
          onSaveRow={handleSaveRow}
          onEditRow={handleEditRow}
          onDeleteRow={handleDeleteRow}
          className=" rounded-none"
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
