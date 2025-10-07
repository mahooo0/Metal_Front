"use client";

import React, { useState } from "react";

import {
  Check,
  ChevronDown,
  Copy,
  Printer,
  SquarePlus,
  Upload,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Pagination } from "@/shared/ui/pagination";

import { mockLaserAnalytics } from "../mocks/laser-analytics.mock";
import {
  LaserAnalyticsColumn,
  LaserAnalyticsItem,
} from "../types/laser-analytics.types";

// Column definitions for laser analytics table
const laserAnalyticsColumns: LaserAnalyticsColumn[] = [
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
    key: "orderNumber",
    label: "Номер замовлення",
    visible: true,
    sortable: true,
    width: "180px",
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
    key: "productName",
    label: "Найменування уп",
    visible: true,
    sortable: true,
    width: "180px",
    type: "text",
  },
  {
    key: "plannedTimeMinutes",
    label: "Активний пл. час, хв.",
    visible: true,
    sortable: true,
    width: "180px",
    type: "number",
  },
  {
    key: "actualTimeMinutes",
    label: "Активний факт. час хв.",
    visible: true,
    sortable: true,
    width: "180px",
    type: "number",
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
    key: "comment",
    label: "Коментар",
    visible: true,
    sortable: false,
    width: "250px",
    type: "text",
  },
];

export default function LaserAnalyticsAccordionTable() {
  const [columns, setColumns] = useState<LaserAnalyticsColumn[]>(
    laserAnalyticsColumns
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [zoomLevel, setZoomLevel] = useState("100%");

  // Calculate total pages
  const totalPages = Math.ceil(mockLaserAnalytics.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = mockLaserAnalytics.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof LaserAnalyticsItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<LaserAnalyticsItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
      options: col.options,
    }));

  const handleViewRow = (_row: LaserAnalyticsItem) => {
    // TODO: Implement view row functionality
  };

  const handleSaveRow = (_row: LaserAnalyticsItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (_row: LaserAnalyticsItem) => {
    // This will trigger edit mode in DataTable
  };

  const handleDeleteRow = (_row: LaserAnalyticsItem) => {
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
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="laser-analytics" className="border-none">
          {/* Header with controls */}
          <AccordionTrigger
            showIcon={false}
            className="flex group items-center justify-between p-4 border-b gap-2 hover:no-underline">
            <h2 className="text-lg font-semibold text-[#3A4754]">
              Поточні задачі
            </h2>
            {/* <div className="flex items-center gap-4">
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
            </div> */}
            <div className="flex items-center gap-2">
              <p>згорнути</p>
              <Button
                variant="balck"
                size="icon"
                className="w-9 h-9 rounded-full group-data-[state=open]:rotate-180">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </AccordionTrigger>

          <AccordionContent className="p-0">
            {/* Table */}
            <div className="max-w-[92vw] overflow-x-auto">
              <DataTable
                data={currentPageData}
                columns={visibleColumns}
                idField="id"
                onViewRow={handleViewRow}
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
                  Показано {startIndex + 1}-
                  {Math.min(endIndex, mockLaserAnalytics.length)} з{" "}
                  {mockLaserAnalytics.length} записів
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
    </div>
  );
}
