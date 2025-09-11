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

// Types for commercial proposal table
export interface CommercialProposalItem {
  id: string;
  detailName: string;
  material: string;
  quantity: number;
  cuttingPrice: number;
  metalPrice: number;
  bendingPrice: number;
  priceWithVAT: number;
  totalWithVAT: number;
  technologistComment: string;
}

export interface CommercialProposalColumn {
  key: keyof CommercialProposalItem;
  label: string;
  visible: boolean;
  sortable?: boolean;
  width?: string;
  type?: "text" | "date" | "select" | "number";
  options?: { value: string; label: string }[];
}

// Mock data for commercial proposal
const mockCommercialProposal: CommercialProposalItem[] = [
  {
    id: "1",
    detailName: "Скоба -14 шт 06 мм нерж",
    material: "н/ж: 504 28 [мат) 6,00 mm",
    quantity: 826,
    cuttingPrice: 540,
    metalPrice: 274,
    bendingPrice: 423,
    priceWithVAT: 429,
    totalWithVAT: 429,
    technologistComment: "Lorem ipsum dolor sit amet, con...",
  },
  {
    id: "2",
    detailName: "Скоба -14 шт 06 мм нерж",
    material: "н/ж: 504 28 [мат) 6,00 mm",
    quantity: 826,
    cuttingPrice: 540,
    metalPrice: 274,
    bendingPrice: 423,
    priceWithVAT: 429,
    totalWithVAT: 429,
    technologistComment: "Lorem ipsum dolor sit amet, con...",
  },
  {
    id: "3",
    detailName: "Скоба -14 шт 06 мм нерж",
    material: "н/ж: 504 28 [мат) 6,00 mm",
    quantity: 826,
    cuttingPrice: 540,
    metalPrice: 274,
    bendingPrice: 423,
    priceWithVAT: 429,
    totalWithVAT: 429,
    technologistComment: "Lorem ipsum dolor sit amet, con...",
  },
  {
    id: "4",
    detailName: "Скоба -14 шт 06 мм нерж",
    material: "н/ж: 504 28 [мат) 6,00 mm",
    quantity: 826,
    cuttingPrice: 540,
    metalPrice: 274,
    bendingPrice: 423,
    priceWithVAT: 429,
    totalWithVAT: 429,
    technologistComment: "Lorem ipsum dolor sit amet, con...",
  },
  {
    id: "5",
    detailName: "Скоба -14 шт 06 мм нерж",
    material: "н/ж: 504 28 [мат) 6,00 mm",
    quantity: 826,
    cuttingPrice: 540,
    metalPrice: 274,
    bendingPrice: 423,
    priceWithVAT: 429,
    totalWithVAT: 429,
    technologistComment: "Lorem ipsum dolor sit amet, con...",
  },
  {
    id: "6",
    detailName: "СК кронштейн- (2)",
    material: "н/ж: 504 28 [мат) 6,00 mm",
    quantity: 450,
    cuttingPrice: 320,
    metalPrice: 180,
    bendingPrice: 280,
    priceWithVAT: 380,
    totalWithVAT: 320,
    technologistComment: "Lorem ipsum dolor sit amet, con...",
  },
  {
    id: "7",
    detailName: "СК кронштейн- (2)",
    material: "н/ж: 504 28 [мат) 6,00 mm",
    quantity: 450,
    cuttingPrice: 320,
    metalPrice: 180,
    bendingPrice: 280,
    priceWithVAT: 380,
    totalWithVAT: 320,
    technologistComment: "Lorem ipsum dolor sit amet, con...",
  },
  {
    id: "8",
    detailName: "СК кронштейн- (2)",
    material: "н/ж: 504 28 [мат) 6,00 mm",
    quantity: 450,
    cuttingPrice: 320,
    metalPrice: 180,
    bendingPrice: 280,
    priceWithVAT: 380,
    totalWithVAT: 320,
    technologistComment: "Lorem ipsum dolor sit amet, con...",
  },
];

const initialColumns: CommercialProposalColumn[] = [
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
    key: "cuttingPrice",
    label: "Ціна порізки деталі",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "metalPrice",
    label: "Ціна металу в деталі",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "bendingPrice",
    label: "Ціна гнуття деталі",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "priceWithVAT",
    label: "Ціна деталі з ПДВ",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "totalWithVAT",
    label: "Сума грн з ПДВ",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "technologistComment",
    label: "Коментар технолога",
    visible: true,
    sortable: true,
    type: "text",
  },
];

export default function CommercialProposalTable() {
  const [columns, setColumns] =
    useState<CommercialProposalColumn[]>(initialColumns);
  const [data] = useState<CommercialProposalItem[]>(mockCommercialProposal);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Calculate total pages based on data length
  const totalPages = Math.ceil(data.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof CommercialProposalItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<CommercialProposalItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
      options: col.options,
    }));

  const handleSaveRow = (_row: CommercialProposalItem) => {
    // TODO: Implement save row functionality
  };

  const handleSelectAsMain = (_row: CommercialProposalItem) => {
    // TODO: Implement select as main functionality
  };

  const handleEditRow = (_row: CommercialProposalItem) => {
    // This will trigger edit mode in DataTable
  };

  const handleDeleteRow = (_row: CommercialProposalItem) => {
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
            Створити заявку на рахунок
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
