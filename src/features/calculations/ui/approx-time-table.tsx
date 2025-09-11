"use client";

import React, { useState } from "react";

import { ChevronDown, Clock, Download, RefreshCw, Upload } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Pagination } from "@/shared/ui/pagination";

// Types for approx time table
export interface ApproxTimeItem {
  id: string;
  approxCutTime: string;
  material: string;
  totalCutLength: number;
  totalCutPoints: number;
  feedCut: number;
  piercingTime: number;
}

export interface ApproxTimeColumn {
  key: keyof ApproxTimeItem;
  label: string;
  visible: boolean;
  sortable?: boolean;
  width?: string;
  type?: "text" | "date" | "select" | "number";
  options?: { value: string; label: string }[];
}

// Mock data for approx time
const mockApproxTime: ApproxTimeItem[] = [
  {
    id: "1",
    approxCutTime: "13:11:35",
    material: "н/ж: 504 28 [мат) 6,00 mm",
    totalCutLength: 423,
    totalCutPoints: 6065,
    feedCut: 6065,
    piercingTime: 6065,
  },
  {
    id: "2",
    approxCutTime: "02:33:48",
    material: "н/ж: 504 28 [мат) 6,00 mm",
    totalCutLength: 816,
    totalCutPoints: 5028,
    feedCut: 5028,
    piercingTime: 5028,
  },
  {
    id: "3",
    approxCutTime: "05:30:21",
    material: "н/ж: 504 28 [мат) 6,00 mm",
    totalCutLength: 738,
    totalCutPoints: 8829,
    feedCut: 8829,
    piercingTime: 8829,
  },
  {
    id: "4",
    approxCutTime: "08:15:42",
    material: "н/ж: 504 28 [мат) 6,00 mm",
    totalCutLength: 650,
    totalCutPoints: 7200,
    feedCut: 7200,
    piercingTime: 7200,
  },
  {
    id: "5",
    approxCutTime: "12:33:18",
    material: "н/ж: 504 28 [мат) 6,00 mm",
    totalCutLength: 492,
    totalCutPoints: 0,
    feedCut: 0,
    piercingTime: 0,
  },
];

const initialColumns: ApproxTimeColumn[] = [
  {
    key: "approxCutTime",
    label: "Приблизний час порізки, хв",
    visible: true,
    sortable: true,
    type: "text",
  },
  {
    key: "material",
    label: "Матеріал, товщина",
    visible: true,
    sortable: true,
    type: "text",
  },
  {
    key: "totalCutLength",
    label: "ВСЬОГО довжина різу",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "totalCutPoints",
    label: "ВСЬОГО точки врізу",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "feedCut",
    label: "Подача, різка, мм/хв",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "piercingTime",
    label: "Час врізки, сек",
    visible: true,
    sortable: true,
    type: "number",
  },
];

export default function ApproxTimeTable() {
  const [columns] = useState<ApproxTimeColumn[]>(initialColumns);
  const [data] = useState<ApproxTimeItem[]>(mockApproxTime);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Calculate total pages based on data length
  const totalPages = Math.ceil(data.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  const visibleColumns: DataTableColumn<ApproxTimeItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
      options: col.options,
    }));

  const handleSaveRow = (_row: ApproxTimeItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (_row: ApproxTimeItem) => {
    // This will trigger edit mode in DataTable
  };

  const handleDeleteRow = (_row: ApproxTimeItem) => {
    // TODO: Implement delete row functionality
  };

  return (
    <div className="max-w-full bg-white rounded-[16px] mt-5">
      {/* Header with title and controls */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex   flex-col w-fit justify-between gap-10">
          <h2 className="text-[32px] font-bold text-[#3A4754]">Результати</h2>

          <div className="flex items-center gap-4">
            {/* Controls */}
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
              <RefreshCw className="h-4 w-4" />
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
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Timer Box */}
        <div className="bg-[#EBFBFF] rounded-lg p-4 py-3 flex items-center gap-3">
          <div>
            <div className="text-sm text-[#3A4754] font-medium flex items-center gap-2 min-w-[300px]">
              <Clock className="h-5 w-5 text-[#3A4754]" />
              <p className="text-[18px] text-[#3A4754] font-medium">
                Приблизний час порізки
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="bg-[#FFFFFF] h-[53px] w-[72px] text-[#6D7A87] text-[28px] font-bold flex items-center justify-center px-2 py-1 rounded-[18px] ">
                00
              </div>
              <span className="text-[#929BA5] text-[28px] font-bold">:</span>
              <div className="bg-[#FFFFFF] h-[53px] w-[72px] text-[#6D7A87] text-[28px] font-bold flex items-center justify-center px-2 py-1 rounded-[18px] ">
                57
              </div>
              <span className="text-[#929BA5] text-[28px] font-bold">:</span>
              <div className="bg-[#FFFFFF] h-[53px] w-[72px] text-[#6D7A87] text-[28px] font-bold flex items-center justify-center px-2 py-1 rounded-[18px] ">
                11
              </div>
            </div>
          </div>
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
          showActionsColumn={false}
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
