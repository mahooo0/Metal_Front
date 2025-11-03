"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { Check, ChevronDown, Download, Settings, Upload } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Pagination } from "@/shared/ui/pagination";

import { mockInventoryData } from "../mocks/inventory.mock";
import type { InventoryColumn, InventoryItem } from "../types/inventory.types";
import EditInventoryDialog from "./edit-inventory-dialog";

// Column definitions for inventory table
const inventoryColumns: InventoryColumn[] = [
  {
    key: "date",
    label: "↑↓ Дата",
    visible: true,
    sortable: true,
    width: "120px",
    type: "date",
  },
  {
    key: "idNumber",
    label: "ID",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "actualAvailability",
    label: "Факт. наявність",
    visible: true,
    sortable: true,
    width: "140px",
    type: "text",
  },
  {
    key: "actualWeight",
    label: "Фактична вага",
    visible: true,
    sortable: true,
    width: "140px",
    type: "text",
  },
  {
    key: "deficiencyRemainder",
    label: "Недолік/ залишок",
    visible: true,
    sortable: true,
    width: "160px",
    type: "text",
  },
  {
    key: "metalAmountInStock",
    label: "Сума металу на складі",
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
    width: "200px",
    type: "text",
  },
];

export default function InventoryTable() {
  const router = useRouter();
  const [columns, setColumns] = useState<InventoryColumn[]>(inventoryColumns);
  const [data, setData] = useState<InventoryItem[]>(mockInventoryData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<InventoryItem | null>(null);

  // Calculate total pages based on data length
  const totalPages = Math.ceil(data.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof InventoryItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<InventoryItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
    }));

  const handleSaveRow = (row: InventoryItem) => {
    // TODO: Implement save row functionality
    router.push(`/dashboard/warehouse/inventory/${row.id}`);
  };

  const handleEditRow = (row: InventoryItem) => {
    setSelectedRow(row);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    // TODO: Implement save edit logic
    console.log("Save edit for:", selectedRow);
    setIsEditDialogOpen(false);
    setSelectedRow(null);
  };

  const handleDeleteFromDialog = () => {
    if (selectedRow) {
      setData(prevData => prevData.filter(item => item.id !== selectedRow.id));
    }
    setIsEditDialogOpen(false);
    setSelectedRow(null);
  };

  const handleDeleteRow = (_row: InventoryItem) => {
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

          {/* Action buttons */}
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
          <Button
            variant="outline"
            size="icon"
            className="h-[42px] w-[42px] rounded-full">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-[100vw] overflow-x-auto">
        <DataTable
          data={currentPageData}
          columns={visibleColumns}
          idField="id"
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

      {/* Edit Inventory Dialog */}
      <EditInventoryDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedRow(null);
        }}
        onSave={handleSaveEdit}
        onDelete={handleDeleteFromDialog}
        inventoryData={selectedRow}
      />
    </div>
  );
}
