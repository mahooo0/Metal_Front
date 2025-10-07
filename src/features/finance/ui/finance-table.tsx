"use client";

import React, { useState } from "react";

import {
  Check,
  ChevronDown,
  FileText,
  MoreVertical,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

import { mockFinanceData } from "../mocks/finance.mock";
import { FinanceColumn, FinanceItem } from "../types/finance.types";

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Планування":
        return "bg-pink-100 text-pink-800";
      case "Пауза":
        return "bg-orange-100 text-orange-800";
      case "У процесі":
        return "bg-green-100 text-green-800";
      case "На розгляді":
        return "bg-blue-100 text-blue-800";
      case "Запуск":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

// Column definitions for finance table
const financeColumns: FinanceColumn[] = [
  {
    key: "date",
    label: "Дата",
    visible: true,
    sortable: true,
    width: "120px",
    type: "date",
  },
  {
    key: "accountNumber",
    label: "№ рахунку",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "counterparty",
    label: "Контрагент",
    visible: true,
    sortable: true,
    width: "180px",
    type: "text",
  },
  {
    key: "amount",
    label: "Сума рахунку",
    visible: true,
    sortable: true,
    width: "150px",
    type: "number",
  },
  {
    key: "type",
    label: "Тип",
    visible: true,
    sortable: true,
    width: "100px",
    type: "select",
    options: [
      { value: "б/г", label: "б/г" },
      { value: "готівка", label: "готівка" },
    ],
  },
  {
    key: "status",
    label: "Статус",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
    render: (value: string) => <StatusBadge status={value} />,
  },
  {
    key: "files",
    label: "Файли",
    visible: true,
    sortable: false,
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
    key: "comment",
    label: "Коментар",
    visible: true,
    sortable: false,
    width: "250px",
    type: "text",
  },
];

export default function FinanceTable() {
  const [columns, setColumns] = useState<FinanceColumn[]>(financeColumns);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [activeTab, setActiveTab] = useState<"all" | "debit" | "credit">("all");

  // Filter data based on active tab
  const filteredData = mockFinanceData.filter(item => {
    if (activeTab === "all") return true;
    if (activeTab === "debit") return item.type === "б/г";
    if (activeTab === "credit") return item.type === "готівка";
    return true;
  });

  // Calculate total pages based on filtered data length
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof FinanceItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<FinanceItem>[] = columns
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

  const handleViewRow = (_row: FinanceItem) => {
    // TODO: Implement view row functionality
  };

  const handleSaveRow = (_row: FinanceItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (_row: FinanceItem) => {
    // This will trigger edit mode in DataTable
  };

  const handleDeleteRow = (_row: FinanceItem) => {
    // TODO: Implement delete row functionality
  };

  const handlePrint = () => {
    // TODO: Implement print functionality
    window.print();
  };

  const handleDownload = () => {
    // TODO: Implement download functionality
  };

  return (
    <div className="max-w-full bg-white rounded-[16px] mt-5">
      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={value => {
          setActiveTab(value as "all" | "debit" | "credit");
          setCurrentPage(1); // Reset to first page when switching tabs
        }}
        className="w-full">
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
          </div>

          {/* Tabs */}
          <div className="border-b w-full">
            <TabsList className="w-full justify-start rounded-none bg-transparent p-0 h-auto">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent data-[state=active]:text-[#1D96F9] data-[state=active]:border-[#1D96F9] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-8  text-base font-medium">
                Всі рахунки
              </TabsTrigger>
              <TabsTrigger
                value="debit"
                className="rounded-none border-b-2 border-transparent data-[state=active]:text-[#1D96F9] data-[state=active]:border-[#1D96F9] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-8  text-base font-medium">
                Дебіт
              </TabsTrigger>
              <TabsTrigger
                value="credit"
                className="rounded-none border-b-2 border-transparent data-[state=active]:text-[#1D96F9] data-[state=active]:border-[#1D96F9] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-8  text-base font-medium">
                Кредіт
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Tab Contents */}
        <TabsContent value="all" className="m-0">
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

        <TabsContent value="debit" className="m-0">
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

        <TabsContent value="credit" className="m-0">
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
