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

import { mockProductionData } from "../mocks/production.mock";
import type {
  ProductionColumn,
  ProductionItem,
} from "../types/production.types";
import AddServiceDialog, { AddServiceDialogData } from "./add-service-dialog";
import EditDialog, { EditDialogData } from "./edit-dialog";
import InvoiceApplicationDialog, {
  InvoiceApplicationDialogData,
} from "./invoice-application-dialog";
import TaskDetailsSheet, { TaskDetailsData } from "./task-details-sheet";

// Column definitions for production table
const productionColumns: ProductionColumn[] = [
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

export default function LaserProductionTable() {
  const [columns, setColumns] = useState<ProductionColumn[]>(productionColumns);
  const [data] = useState<ProductionItem[]>(mockProductionData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProductionItem | null>(null);
  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false);
  const [isInvoiceApplicationDialogOpen, setIsInvoiceApplicationDialogOpen] =
    useState(false);
  const [isTaskDetailsSheetOpen, setIsTaskDetailsSheetOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ProductionItem | null>(null);

  // Calculate total pages based on data length
  const totalPages = Math.ceil(data.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof ProductionItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<ProductionItem>[] = columns
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

  const handleTakeToWork = (row: ProductionItem) => {
    setSelectedTask(row);
    setIsTaskDetailsSheetOpen(true);
  };

  const handleSaveRow = (_row: ProductionItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (row: ProductionItem) => {
    setEditingItem(row);
    setIsEditDialogOpen(true);
  };

  const handleDeleteRow = (_row: ProductionItem) => {
    // TODO: Implement delete row functionality
  };

  const handleSaveEdit = (_editData: EditDialogData) => {
    // TODO: Implement save edit functionality
  };

  const handleDeleteEdit = () => {
    if (editingItem) {
      // TODO: Implement delete functionality
    }
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingItem(null);
  };

  const handleAddService = () => {
    setIsAddServiceDialogOpen(true);
  };

  const handleSaveService = (_serviceData: AddServiceDialogData) => {
    // TODO: Implement save service functionality
  };

  const handleDeleteService = () => {
    // TODO: Implement delete service functionality
  };

  const handleCloseAddServiceDialog = () => {
    setIsAddServiceDialogOpen(false);
  };

  const handleInvoiceApplication = () => {
    setIsInvoiceApplicationDialogOpen(true);
  };

  const handleSaveInvoiceApplication = (
    _invoiceData: InvoiceApplicationDialogData
  ) => {
    // TODO: Implement save invoice application functionality
  };

  const handleDeleteInvoiceApplication = () => {
    // TODO: Implement delete invoice application functionality
  };

  const handleCloseInvoiceApplicationDialog = () => {
    setIsInvoiceApplicationDialogOpen(false);
  };

  const handleCloseTaskDetailsSheet = () => {
    setIsTaskDetailsSheetOpen(false);
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
          {/* Action buttons */}
          <Button
            variant="blue"
            size="lg"
            className="h-[42px]"
            onClick={handleAddService}>
            <SquarePlus className="h-4 w-4" />
            Додати послугу
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-[42px]"
            onClick={handleInvoiceApplication}>
            Заявка на рахунок
          </Button>
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
          customActions={(row: ProductionItem) => (
            <Button
              variant="blueTransparent"
              size="lg"
              onClick={() => handleTakeToWork(row)}
              className="whitespace-nowrap">
              Взяти в роботу
            </Button>
          )}
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

      {/* Edit Dialog */}
      <EditDialog
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        onSave={handleSaveEdit}
        onDelete={handleDeleteEdit}
        title="Редагувати"
      />

      {/* Add Service Dialog */}
      <AddServiceDialog
        isOpen={isAddServiceDialogOpen}
        onClose={handleCloseAddServiceDialog}
        onSave={handleSaveService}
        onDelete={handleDeleteService}
        title="Додати послугу"
      />

      {/* Invoice Application Dialog */}
      <InvoiceApplicationDialog
        isOpen={isInvoiceApplicationDialogOpen}
        onClose={handleCloseInvoiceApplicationDialog}
        onSave={handleSaveInvoiceApplication}
        onDelete={handleDeleteInvoiceApplication}
        title="Заявка на рахунок"
      />

      {/* Task Details Sheet */}
      <TaskDetailsSheet
        isOpen={isTaskDetailsSheetOpen}
        onClose={handleCloseTaskDetailsSheet}
        task={selectedTask}
        onSave={handleSaveTaskDetails}
        onCancel={handleCancelTaskDetails}
      />
    </div>
  );
}
