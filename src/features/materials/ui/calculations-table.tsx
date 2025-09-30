"use client";

import React, { useState } from "react";

import {
  AccordionContent,
  AccordionHeader,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import {
  Check,
  ChevronDown,
  MoreVertical,
  Printer,
  SquarePlus,
  Upload,
} from "lucide-react";

import { cn } from "@/shared/lib";
import { Accordion, AccordionItem } from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Pagination } from "@/shared/ui/pagination";

// Types for calculations table
export interface CalculationItem {
  id: string;
  partName: string;
  materialThickness: string;
  quantity: number;
  cutLength: number;
  piercingPoints: number;
  totalCutLength: number;
  materialThicknessMm: number;
  metalPrice: number;
  partWeight: number;
  bends: number;
}

export interface CalculationColumn {
  key: keyof CalculationItem;
  label: string;
  visible: boolean;
  sortable?: boolean;
  width?: string;
  type?: "text" | "date" | "select" | "number";
  options?: { value: string; label: string }[];
}

// Mock data for calculations
const mockCalculations: CalculationItem[] = [
  {
    id: "1",
    partName: "Скоба -14 шт 06 мм нерж",
    materialThickness: "н/ж: 504 28 [мат) 6,00 mm",
    quantity: 826,
    cutLength: 540,
    piercingPoints: 274,
    totalCutLength: 423,
    materialThicknessMm: 1577,
    metalPrice: 429,
    partWeight: 429,
    bends: 429,
  },
  {
    id: "2",
    partName: "Скоба -14 шт 06 мм нерж",
    materialThickness: "н/ж: 504 28 [мат) 6,00 mm",
    quantity: 447,
    cutLength: 536,
    piercingPoints: 703,
    totalCutLength: 816,
    materialThicknessMm: 6065,
    metalPrice: 922,
    partWeight: 922,
    bends: 922,
  },
  {
    id: "3",
    partName: "Скоба -14 шт 06 мм нерж",
    materialThickness: "н/ж: 504 28 [мат) 6,00 mm",
    quantity: 922,
    cutLength: 703,
    piercingPoints: 447,
    totalCutLength: 738,
    materialThicknessMm: 9462,
    metalPrice: 177,
    partWeight: 177,
    bends: 177,
  },
  {
    id: "4",
    partName: "Скоба -14 шт 06 мм нерж",
    materialThickness: "н/ж: 504 28 [мат) 6,00 mm",
    quantity: 154,
    cutLength: 423,
    piercingPoints: 816,
    totalCutLength: 798,
    materialThicknessMm: 9261,
    metalPrice: 447,
    partWeight: 447,
    bends: 447,
  },
  {
    id: "5",
    partName: "Скоба -14 шт 06 мм нерж",
    materialThickness: "н/ж: 504 28 [мат) 6,00 mm",
    quantity: 177,
    cutLength: 274,
    piercingPoints: 561,
    totalCutLength: 994,
    materialThicknessMm: 8829,
    metalPrice: 357,
    partWeight: 357,
    bends: 357,
  },
  {
    id: "6",
    partName: "Скоба -14 шт 06 мм нерж",
    materialThickness: "н/ж: 504 28 [мат) 6,00 mm",
    quantity: 423,
    cutLength: 816,
    piercingPoints: 740,
    totalCutLength: 426,
    materialThicknessMm: 2798,
    metalPrice: 738,
    partWeight: 738,
    bends: 738,
  },
  {
    id: "7",
    partName: "Скоба -14 шт 06 мм нерж",
    materialThickness: "н/ж: 504 28 [мат) 6,00 mm",
    quantity: 429,
    cutLength: 177,
    piercingPoints: 738,
    totalCutLength: 274,
    materialThicknessMm: 1148,
    metalPrice: 423,
    partWeight: 423,
    bends: 423,
  },
  {
    id: "8",
    partName: "Скоба -14 шт 06 мм нерж",
    materialThickness: "н/ж: 504 28 [мат) 6,00 mm",
    quantity: 447,
    cutLength: 540,
    piercingPoints: 556,
    totalCutLength: 600,
    materialThicknessMm: 3933,
    metalPrice: 453,
    partWeight: 453,
    bends: 453,
  },
];

// Column definitions for calculations
const calculationColumns: CalculationColumn[] = [
  {
    key: "partName",
    label: "Найменування деталі",
    visible: true,
    sortable: true,
    width: "200px",
    type: "text",
  },
  {
    key: "materialThickness",
    label: "Матеріал, товщ.",
    visible: true,
    sortable: true,
    width: "180px",
    type: "text",
  },
  {
    key: "quantity",
    label: "Кількість, шт",
    visible: true,
    sortable: true,
    width: "80px",
    type: "number",
  },
  {
    key: "cutLength",
    label: "Довжина різу, мп",
    visible: true,
    sortable: true,
    width: "80px",
    type: "number",
  },
  {
    key: "piercingPoints",
    label: "Точки врізання, шт.",
    visible: true,
    sortable: true,
    width: "80px",
    type: "number",
  },
  {
    key: "totalCutLength",
    label: "Довжина різу +т.в. мп",
    visible: true,
    sortable: true,
    width: "80px",
    type: "number",
  },
  {
    key: "materialThicknessMm",
    label: "Товщина матеріалу, мм",
    visible: true,
    sortable: true,
    width: "80px",
    type: "number",
  },
  {
    key: "metalPrice",
    label: "Ціна металу, грн/кг",
    visible: true,
    sortable: true,
    width: "80px",
    type: "number",
  },
  {
    key: "partWeight",
    label: "Вага деталей, факт. кг",
    visible: true,
    sortable: true,
    width: "80px",
    type: "number",
  },
  {
    key: "bends",
    label: "Загинів (1-1000мм)",
    visible: true,
    sortable: true,
    width: "80px",
    type: "number",
  },
];

export default function CalculationsTable() {
  const [columns, setColumns] =
    useState<CalculationColumn[]>(calculationColumns);
  const [data] = useState<CalculationItem[]>(mockCalculations);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  // Calculate total pages based on data length
  const totalPages = Math.ceil(data.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof CalculationItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<CalculationItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
      options: col.options,
    }));

  const handleSaveRow = (_row: CalculationItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (_row: CalculationItem) => {
    // This will trigger edit mode in DataTable
  };

  const handleDeleteRow = (_row: CalculationItem) => {
    // TODO: Implement delete row functionality
  };

  return (
    <div className="max-w-full bg-white rounded-[16px] mt-5">
      {/* Header with controls */}
      <Accordion type="single" collapsible defaultValue="calculations">
        <AccordionItem value="calculations">
          <AccordionHeader
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer">
            <div className="flex items-center justify-between p-4 border-b">
              <h1>Прорахунок</h1>
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
                <AccordionTrigger>
                  <Button
                    variant="balck"
                    size="icon"
                    className={cn(
                      "h-[42px] w-[42px] rounded-full ml-[56px]",
                      !isOpen && "rotate-180"
                    )}>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </AccordionTrigger>
              </div>
            </div>
          </AccordionHeader>
          <AccordionContent>
            <div className="max-w-[90vw] overflow-x-auto">
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Table */}
    </div>
  );
}
