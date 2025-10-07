"use client";

import React, { useState } from "react";

import {
  Check,
  ChevronDown,
  Copy,
  FileText,
  Printer,
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

import { mockHydraulicAnalytics } from "../mocks/hydraulic-analytics.mock";
import {
  HydraulicAnalyticsColumn,
  HydraulicAnalyticsItem,
} from "../types/hydraulic-analytics.types";

// Column definitions for hydraulic analytics table
const hydraulicAnalyticsColumns: HydraulicAnalyticsColumn[] = [
  {
    key: "createdDate",
    label: "Дата створення",
    visible: true,
    sortable: true,
    width: "120px",
    type: "date",
  },
  {
    key: "startProcessingDate",
    label: "Дата поч. обробки",
    visible: true,
    sortable: true,
    width: "150px",
    type: "date",
  },
  {
    key: "endProcessingDate",
    label: "Дата зав. обр.",
    visible: true,
    sortable: true,
    width: "150px",
    type: "date",
  },
  {
    key: "orderNumber",
    label: "Номер замовлення",
    visible: true,
    sortable: true,
    width: "180px",
    type: "text",
  },
  {
    key: "layoutName",
    label: "Найменування розкладки",
    visible: true,
    sortable: true,
    width: "200px",
    type: "text",
  },
  {
    key: "startExecutionTime",
    label: "Час початку вик.",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "endExecutionTime",
    label: "Час зак.вик.",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "plannedTimeMinutes",
    label: "Ативний пл. час, хв.",
    visible: true,
    sortable: true,
    width: "180px",
    type: "number",
  },
  {
    key: "actualCuttingTimeMinutes",
    label: "Факт час порізки, хв",
    visible: true,
    sortable: true,
    width: "180px",
    type: "number",
  },
  {
    key: "actualCuttingTimeHours",
    label: "Факт час порізки, ч.",
    visible: true,
    sortable: true,
    width: "180px",
    type: "number",
  },
  {
    key: "cutQuality",
    label: "Якість різу",
    visible: true,
    sortable: true,
    width: "120px",
    type: "number",
  },
  {
    key: "comment",
    label: "Коментар",
    visible: true,
    sortable: false,
    width: "250px",
    type: "text",
  },
  {
    key: "files",
    label: "Файли",
    visible: true,
    sortable: false,
    width: "80px",
    type: "text",
    render: () => (
      <Button variant="ghost" size="icon" className="w-6 h-6 rounded-full">
        <FileText className="w-4 h-4 text-red-500" />
      </Button>
    ),
  },
];

export default function HydraulicAnalyticsTable() {
  const [columns, setColumns] = useState<HydraulicAnalyticsColumn[]>(
    hydraulicAnalyticsColumns
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [zoomLevel, setZoomLevel] = useState("100%");

  // Calculate total pages
  const totalPages = Math.ceil(mockHydraulicAnalytics.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = mockHydraulicAnalytics.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof HydraulicAnalyticsItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<HydraulicAnalyticsItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
      options: col.options,
      render: col.render,
    }));

  const handleViewRow = (_row: HydraulicAnalyticsItem) => {
    // TODO: Implement view row functionality
  };

  const handleSaveRow = (_row: HydraulicAnalyticsItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (_row: HydraulicAnalyticsItem) => {
    // This will trigger edit mode in DataTable
  };

  const handleDeleteRow = (_row: HydraulicAnalyticsItem) => {
    // TODO: Implement delete row functionality
  };

  const handlePrint = () => {
    // TODO: Implement print functionality
    window.print();
  };

  const handleDownload = () => {
    // TODO: Implement download functionality
  };

  const handleCopy = () => {
    // TODO: Implement copy functionality
  };

  return (
    <div className="max-w-full bg-white rounded-[16px] mt-5">
      {/* Header with controls */}
      <div className="flex items-center justify-between p-4 border-b gap-2">
        <h2 className="text-lg font-semibold text-[#3A4754]">
          Майбутні задачі
        </h2>
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
                {zoomLevel}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setZoomLevel("50%")}>
                50%
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setZoomLevel("75%")}>
                75%
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setZoomLevel("100%")}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setZoomLevel("125%")}>
                125%
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setZoomLevel("150%")}>
                150%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Action buttons */}
          <Button
            variant="outline"
            size="icon"
            className="h-[42px] w-[42px] rounded-full"
            onClick={handlePrint}>
            <Printer className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-[42px] w-[42px] rounded-full"
            onClick={handleDownload}>
            <Upload className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-[42px] w-[42px] rounded-full"
            onClick={handleCopy}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-[91vw] overflow-x-auto">
        <DataTable
          data={currentPageData}
          columns={visibleColumns}
          idField="id"
          onViewRow={handleViewRow}
          onSaveRow={handleSaveRow}
          onEditRow={handleEditRow}
          onDeleteRow={handleDeleteRow}
          className="rounded-none"
          showActionsColumn={false} // No explicit actions column, 'files' column acts as one
        />
      </div>

      {/* Pagination */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Показано {startIndex + 1}-
            {Math.min(endIndex, mockHydraulicAnalytics.length)} з{" "}
            {mockHydraulicAnalytics.length} записів
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
