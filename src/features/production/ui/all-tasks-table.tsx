"use client";

import React, { useMemo, useState } from "react";

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

import { mockAllTasksData } from "../mocks/all-tasks.mock";
import type { AllTasksColumn, AllTasksItem } from "../types/all-tasks.types";
import TaskDetailsSheet, { TaskDetailsData } from "./task-details-sheet";

// Column definitions for all tasks table
const allTasksColumns: AllTasksColumn[] = [
  {
    key: "creationDate",
    label: "↑↓ Дата створення",
    visible: true,
    sortable: true,
    width: "140px",
    type: "date",
  },
  {
    key: "processingStartDate",
    label: "↑↓ Дата поч. обробки",
    visible: true,
    sortable: true,
    width: "160px",
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
    key: "customerOrderNumber",
    label: "Найменування уп",
    visible: true,
    sortable: false,
    width: "180px",
    type: "text",
  },
  {
    key: "activePlannedTime",
    label: "Активний пл. час. хв.",
    visible: true,
    sortable: true,
    width: "160px",
    type: "text",
  },
  {
    key: "activeActualTime",
    label: "Активний факт. час хв.",
    visible: true,
    sortable: true,
    width: "180px",
    type: "text",
  },
  {
    key: "startTime",
    label: "Час початку вик.",
    visible: true,
    sortable: true,
    width: "140px",
    type: "text",
  },
  {
    key: "endTime",
    label: "Час зак.вик.",
    visible: true,
    sortable: true,
    width: "130px",
    type: "text",
  },
  {
    key: "comment",
    label: "Коментар",
    visible: true,
    sortable: false,
    width: "180px",
    type: "text",
  },
];

type TabValue = "all" | "new" | "in-progress" | "completed";

export default function AllTasksTable() {
  const [columns, setColumns] = useState<AllTasksColumn[]>(allTasksColumns);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<AllTasksItem | null>(null);

  // Filter data based on active tab
  const filteredData = useMemo(() => {
    if (activeTab === "all") {
      return mockAllTasksData;
    }
    return mockAllTasksData.filter(item => {
      if (activeTab === "new") {
        return item.status === "new";
      }
      if (activeTab === "in-progress") {
        return item.status === "in-progress";
      }
      if (activeTab === "completed") {
        return item.status === "completed";
      }
      return true;
    });
  }, [activeTab]);

  // Calculate total pages based on filtered data length
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  // Reset to page 1 when tab changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const toggleColumnVisibility = (columnKey: keyof AllTasksItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<AllTasksItem>[] = columns
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

  const handleSaveRow = (_row: AllTasksItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (_row: AllTasksItem) => {
    // TODO: Implement edit row functionality
  };

  const handleDeleteRow = (_row: AllTasksItem) => {
    // TODO: Implement delete row functionality
  };

  const handleOpenSheet = (row: AllTasksItem) => {
    setSelectedTask(row);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedTask(null);
  };

  const handleSaveTaskDetails = (_data: TaskDetailsData) => {
    // TODO: Implement save task details functionality
  };

  const handleCancelTaskDetails = () => {
    // TODO: Implement cancel task details functionality
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

          {/* Action buttons */}
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
            <Upload className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* Action button */}
          <Button variant="blue" size="lg" className="h-[42px]">
            <SquarePlus className="h-4 w-4" />
            Додати нову
          </Button>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="px-4 pt-4 border-b">
        <div className="flex items-center gap-4 pb-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 px-4 py-2 transition-colors ${
              activeTab === "all"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-gray-900"
            }`}>
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Нові задачі
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`flex items-center gap-2 px-4 py-2 transition-colors ${
              activeTab === "new"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-gray-900"
            }`}>
            <span className="w-2 h-2 rounded-full bg-pink-400" />
            Lorem ipsum
          </button>
          <button
            onClick={() => setActiveTab("in-progress")}
            className={`flex items-center gap-2 px-4 py-2 transition-colors ${
              activeTab === "in-progress"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-gray-900"
            }`}>
            <span className="w-2 h-2 rounded-full bg-gray-400" />
            Lorem ipsum
          </button>
        </div>
      </div>

      {/* Table */}
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
          customActions={(row: AllTasksItem) => (
            <Button
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
              onClick={() => handleOpenSheet(row)}>
              +
            </Button>
          )}
        />
      </div>

      {/* Pagination */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Показано {startIndex + 1}-{Math.min(endIndex, filteredData.length)}{" "}
            з {filteredData.length} записів
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

      {/* Task Details Sheet */}
      <TaskDetailsSheet
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        task={selectedTask}
        onSave={handleSaveTaskDetails}
        onCancel={handleCancelTaskDetails}
      />
    </div>
  );
}
