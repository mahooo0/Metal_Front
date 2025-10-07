"use client";

import React, { useState } from "react";

import { Check, ChevronDown, Printer, Upload } from "lucide-react";
import { useQueryState } from "nuqs";

import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Pagination } from "@/shared/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

import { mockApplications } from "../mocks/applications.mock";
import { ApplicationColumn, ApplicationItem } from "../types/application.types";

// Column definitions for tasks table
const applicationColumns: ApplicationColumn[] = [
  {
    key: "createdDate",
    label: "Дата створення",
    visible: true,
    sortable: true,
    width: "120px",
    type: "date",
  },
  {
    key: "startDate",
    label: "Початок виконання",
    visible: true,
    sortable: true,
    width: "150px",
    type: "date",
  },
  {
    key: "entity",
    label: "Сутність",
    visible: true,
    sortable: true,
    width: "180px",
    type: "text",
  },
  {
    key: "taskType",
    label: "Тип задачі",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "creator",
    label: "Створив",
    visible: true,
    sortable: true,
    width: "180px",
    type: "text",
  },
  {
    key: "responsible",
    label: "Відповідальний",
    visible: true,
    sortable: true,
    width: "180px",
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

export default function ApplicationsTable() {
  const [columns, setColumns] =
    useState<ApplicationColumn[]>(applicationColumns);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [activeTab, setActiveTab] = useState<"current" | "completed">(
    "current"
  );
  const [_viewTask, setViewTask] = useQueryState("viewTask", {
    defaultValue: "false",
  });

  // Filter data based on active tab
  const filteredData = mockApplications.filter(
    application => application.status === activeTab
  );

  // Calculate total pages based on filtered data length
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  // Get counts for each tab (unused for now, but available for future use)
  // const currentCount = mockApplications.filter(
  //   application => application.status === "current"
  // ).length;
  // const completedCount = mockApplications.filter(
  //   application => application.status === "completed"
  // ).length;

  const toggleColumnVisibility = (columnKey: keyof ApplicationItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<ApplicationItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
      options: col.options,
    }));

  const handleViewRow = (_row: ApplicationItem) => {
    setViewTask("true");
  };

  const handleSaveRow = (_row: ApplicationItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (_row: ApplicationItem) => {
    // This will trigger edit mode in DataTable
  };

  const handleDeleteRow = (_row: ApplicationItem) => {
    // TODO: Implement delete row functionality
  };

  return (
    <div className="max-w-full bg-white rounded-[16px] mt-5">
      <Tabs
        defaultValue="current"
        value={activeTab}
        onValueChange={value => {
          setActiveTab(value as "current" | "completed");
          setCurrentPage(1); // Reset to first page when switching tabs
        }}
        className="w-full">
        {/* Tabs Header */}

        {/* Header with controls */}
        <div className="flex items-center justify-between p-4 border-b gap-2">
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
          <div className="border-b w-full">
            <TabsList className="w-full justify-start rounded-none bg-transparent p-0 h-auto">
              <TabsTrigger
                value="current"
                className="rounded-none border-b-2 border-transparent data-[state=active]:text-[#1D96F9] data-[state=active]:border-[#1D96F9] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-8 py-4 text-base font-medium">
                Поточні
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="rounded-none border-b-2 border-transparent data-[state=active]:text-[#1D96F9] data-[state=active]:border-[#1D96F9] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-8 py-4 text-base font-medium">
                Завершені
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        <div className="flex  mb-3 mt-5 w-fit gap-8 px-4">
          <div className="flex-1  rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full border border-[#8AE4FD] flex items-center justify-center">
                <div className="w-[9px] h-[9px] rounded-full bg-[#8AE4FD]"></div>
              </div>
              <span className="text-sm text-[#3A4754]">Lorem ipsum</span>
            </div>
          </div>
          <div className="flex-1  rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full border border-[#8AE4FD] flex items-center justify-center">
                <div className="w-[9px] h-[9px] rounded-full bg-[#8AE4FD]"></div>
              </div>
              <span className="text-sm text-[#3A4754]">Lorem ipsum</span>
            </div>
          </div>
        </div>

        {/* Tab Contents */}
        <TabsContent value="current" className="m-0">
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
              showActionsColumn={true}
            />
          </div>

          {/* Pagination */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Показано {startIndex + 1}-
                {Math.min(endIndex, filteredData.length)} з{" "}
                {filteredData.length} записів
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
        </TabsContent>

        <TabsContent value="completed" className="m-0">
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
              showActionsColumn={true}
            />
          </div>

          {/* Pagination */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Показано {startIndex + 1}-
                {Math.min(endIndex, filteredData.length)} з{" "}
                {filteredData.length} записів
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
