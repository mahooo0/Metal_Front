"use client";

import React, { useState } from "react";

import { Check, ChevronDown, Printer, Upload } from "lucide-react";
import { useQueryState } from "nuqs";

import { Badge } from "@/shared/ui/badge";
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

import { TaskColumn, TaskItem } from "../types/task.types";
import { getTaskStatusConfig } from "../utils/get-task-status-config";

// Function to format date from ISO string to dd/mm/yyyy
const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return dateString;
  }
};

// Column definitions for tasks table
const taskColumns: TaskColumn[] = [
  {
    key: "createdDate",
    label: "Дата створення",
    visible: true,
    sortable: true,
    width: "120px",
    type: "date",
    render: (value: string | number) => {
      return <span className="text-sm">{formatDate(String(value))}</span>;
    },
  },
  {
    key: "startDate",
    label: "Початок виконання",
    visible: true,
    sortable: true,
    width: "150px",
    type: "date",
    render: (value: string | number) => {
      return <span className="text-sm">{formatDate(String(value))}</span>;
    },
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
    key: "status",
    label: "Статус",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
    render: (value: string | number) => {
      const statusConfig = getTaskStatusConfig(value as TaskItem["status"]);
      return (
        <Badge
          variant="secondary"
          className={`rounded-2xl py-1 px-3 inline-block ${statusConfig.bgColor}`}>
          <span className={`text-xs font-medium ${statusConfig.textColor}`}>
            {statusConfig.label}
          </span>
        </Badge>
      );
    },
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

interface TasksTableProps {
  data?: TaskItem[];
  isLoading?: boolean;
  error?: unknown;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onEditRow?: (row: TaskItem) => void;
  onDeleteRow?: (row: TaskItem) => void;
}

export default function TasksTable({
  data = [],
  isLoading = false,
  error,
  currentPage: externalCurrentPage,
  totalPages: externalTotalPages,
  onPageChange: externalOnPageChange,
  onEditRow: externalOnEditRow,
  onDeleteRow: externalOnDeleteRow,
}: TasksTableProps) {
  const [columns, setColumns] = useState<TaskColumn[]>(taskColumns);
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const [zoom, setZoom] = useState<number>(100);
  const [activeTab, setActiveTab] = useState<"current" | "completed">(
    "current"
  );
  const [_viewTask, setViewTask] = useQueryState("viewTask", {
    defaultValue: "false",
  });

  const currentPage = externalCurrentPage ?? internalCurrentPage;
  const totalPages = externalTotalPages ?? 1;

  const handlePageChange = (page: number) => {
    if (externalOnPageChange) {
      externalOnPageChange(page);
    } else {
      setInternalCurrentPage(page);
    }
  };

  // Filter data based on active tab
  const filteredData = data.filter(
    task =>
      task.statusDisplay === (activeTab === "current" ? "current" : "completed")
  );

  // Get counts for each tab (unused for now, but available for future use)
  // const currentCount = mockTasks.filter(
  //   task => task.status === "current"
  // ).length;
  // const completedCount = mockTasks.filter(
  //   task => task.status === "completed"
  // ).length;

  const toggleColumnVisibility = (columnKey: keyof TaskItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<TaskItem>[] = columns
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

  const [taskId, setTaskId] = useQueryState("taskId");

  const handleViewRow = (row: TaskItem) => {
    setTaskId(row.id);
    setViewTask("true");
  };

  const handleSaveRow = (_row: TaskItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (row: TaskItem) => {
    if (externalOnEditRow) {
      externalOnEditRow(row);
    }
  };

  const handleDeleteRow = (row: TaskItem) => {
    if (externalOnDeleteRow) {
      externalOnDeleteRow(row);
    }
  };

  const isEmpty = filteredData.length === 0;

  return (
    <div className="bg-white rounded-2xl p-6 mt-5">
      <Tabs
        defaultValue="current"
        value={activeTab}
        onValueChange={value => {
          setActiveTab(value as "current" | "completed");
          handlePageChange(1); // Reset to first page when switching tabs
        }}
        className="w-full">
        {/* Top Actions Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            {/* Columns dropdown */}
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
                  {zoom}%
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setZoom(50)}>
                  50%
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setZoom(75)}>
                  75%
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setZoom(100)}>
                  100%
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setZoom(125)}>
                  125%
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setZoom(150)}>
                  150%
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-4">
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

        {/* Tabs Header */}
        <div className="border-b mb-6">
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
        {/* Tab Contents */}
        <TabsContent value="current" className="m-0">
          {/* DataTable */}
          {isEmpty ? (
            <div className="flex items-center justify-center py-10 text-gray-500">
              Nothing found
            </div>
          ) : (
            <div className="w-full">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <p className="text-[#6D7A87]">Завантаження...</p>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-64">
                  <p className="text-[#6D7A87]">Помилка завантаження даних</p>
                </div>
              ) : (
                <DataTable
                  data={filteredData}
                  columns={visibleColumns}
                  idField="id"
                  enableEditOnDoubleClick={false}
                  fontSize={
                    zoom <= 60
                      ? "xs"
                      : zoom <= 85
                        ? "sm"
                        : zoom <= 110
                          ? "base"
                          : zoom <= 135
                            ? "lg"
                            : "xl"
                  }
                  onViewRow={handleViewRow}
                  onSaveRow={handleSaveRow}
                  onEditRow={handleEditRow}
                  onDeleteRow={handleDeleteRow}
                  className="cursor-pointer"
                  showActionsColumn={true}
                />
              )}
            </div>
          )}

          {/* Pagination */}
          {!isEmpty && (
            <div className="flex justify-end mt-6 w-full">
              <div className="w-fit">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="m-0">
          {/* DataTable */}
          {isEmpty ? (
            <div className="flex items-center justify-center py-10 text-gray-500">
              Nothing found
            </div>
          ) : (
            <div className="w-full">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <p className="text-[#6D7A87]">Завантаження...</p>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-64">
                  <p className="text-[#6D7A87]">Помилка завантаження даних</p>
                </div>
              ) : (
                <DataTable
                  data={filteredData}
                  columns={visibleColumns}
                  idField="id"
                  enableEditOnDoubleClick={false}
                  fontSize={
                    zoom <= 60
                      ? "xs"
                      : zoom <= 85
                        ? "sm"
                        : zoom <= 110
                          ? "base"
                          : zoom <= 135
                            ? "lg"
                            : "xl"
                  }
                  onViewRow={handleViewRow}
                  onSaveRow={handleSaveRow}
                  onEditRow={handleEditRow}
                  onDeleteRow={handleDeleteRow}
                  className="cursor-pointer"
                  showActionsColumn={true}
                />
              )}
            </div>
          )}

          {/* Pagination */}
          {!isEmpty && (
            <div className="flex justify-end mt-6 w-full">
              <div className="w-fit">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
