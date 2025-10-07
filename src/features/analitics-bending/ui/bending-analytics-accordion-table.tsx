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

import { mockBendingAnalytics } from "../mocks/bending-analytics.mock";
import {
  BendingAnalyticsColumn,
  BendingAnalyticsItem,
} from "../types/bending-analytics.types";

// Column definitions for bending analytics table
const bendingAnalyticsColumns: BendingAnalyticsColumn[] = [
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
    key: "drawing",
    label: "Креслення",
    visible: true,
    sortable: true,
    width: "200px",
    type: "text",
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <FileText className="w-4 h-4 text-red-500" />
        <span className="text-sm">{value}</span>
      </div>
    ),
  },
  {
    key: "metalTypeThickness",
    label: "Вид металу, товщина",
    visible: true,
    sortable: true,
    width: "150px",
    type: "number",
  },
  {
    key: "plannedBendsCount",
    label: "Кількість згибів, шт",
    visible: true,
    sortable: true,
    width: "180px",
    type: "number",
  },
  {
    key: "actualBendsCount",
    label: "Кількість згибів факт",
    visible: true,
    sortable: true,
    width: "180px",
    type: "number",
  },
  {
    key: "activeActualTimeMinutes",
    label: "Активний факт. час, хв.",
    visible: true,
    sortable: true,
    width: "180px",
    type: "number",
    render: (value: number) => {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      const seconds = Math.floor((value % 1) * 60);
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    },
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
    label: "Час зак. вик.",
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
  {
    key: "date",
    label: "Дата",
    visible: true,
    sortable: true,
    width: "100px",
    type: "date",
  },
];

export default function BendingAnalyticsAccordionTable() {
  const [columns, setColumns] = useState<BendingAnalyticsColumn[]>(
    bendingAnalyticsColumns
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [zoomLevel, setZoomLevel] = useState("100%");

  // Calculate total pages
  const totalPages = Math.ceil(mockBendingAnalytics.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = mockBendingAnalytics.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof BendingAnalyticsItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<BendingAnalyticsItem>[] = columns
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

  const handleViewRow = (_row: BendingAnalyticsItem) => {
    // TODO: Implement view row functionality
  };

  const handleSaveRow = (_row: BendingAnalyticsItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (_row: BendingAnalyticsItem) => {
    // This will trigger edit mode in DataTable
  };

  const handleDeleteRow = (_row: BendingAnalyticsItem) => {
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
        <AccordionItem value="bending-analytics" className="border-none">
          {/* Header with controls */}
          <AccordionTrigger
            showIcon={false}
            className="flex group items-center justify-between p-4 border-b gap-2 hover:no-underline">
            <h2 className="text-lg font-semibold text-[#3A4754]">
              Майбутні задачі
            </h2>
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
                showActionsColumn={false}
              />
            </div>

            {/* Pagination */}
            <div className="p-4 border-t">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Показано {startIndex + 1}-
                  {Math.min(endIndex, mockBendingAnalytics.length)} з{" "}
                  {mockBendingAnalytics.length} записів
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
