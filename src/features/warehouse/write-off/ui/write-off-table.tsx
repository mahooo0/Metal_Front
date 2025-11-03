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

import { mockWriteOffData } from "../mocks/write-off.mock";
import type { WriteOffColumn, WriteOffItem } from "../types/write-off.types";
import AddSupplierDialog from "./add-supplier-dialog";
import ConfirmWriteOffDialog from "./confirm-write-off-dialog";

export default function WriteOffTable() {
  const router = useRouter();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<WriteOffItem | null>(null);

  const getWriteOffColumns = (): WriteOffColumn[] => [
    {
      key: "deliveryDate",
      label: "↑↓ Дата поставки",
      visible: true,
      sortable: true,
      width: "150px",
      type: "date",
    },
    {
      key: "writeOffId",
      label: "↑↓ ID",
      visible: true,
      sortable: true,
      width: "150px",
      type: "text",
    },
    {
      key: "quantity",
      label: "Кількість товару",
      visible: true,
      sortable: false,
      width: "150px",
      type: "text",
    },
    {
      key: "weight",
      label: "Вага товару в списанні",
      visible: true,
      sortable: false,
      width: "180px",
      type: "text",
    },
    {
      key: "amount",
      label: "Списано на суму",
      visible: true,
      sortable: false,
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

  const [columns, setColumns] =
    useState<WriteOffColumn[]>(getWriteOffColumns());
  const [data] = useState<WriteOffItem[]>(mockWriteOffData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Calculate total pages based on data length
  const totalPages = Math.ceil(data.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof WriteOffItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<WriteOffItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
    }));

  const handleEditRow = (row: WriteOffItem) => {
    setSelectedRow(row);
    setIsSupplierDialogOpen(true);
  };

  const handleDeleteRow = (_row: WriteOffItem) => {
    // TODO: Implement delete row functionality
  };

  const handleViewRow = (row: WriteOffItem) => {
    router.push(`/dashboard/warehouse/write-off/${row.id}`);
  };

  const handleConfirmClick = (row: WriteOffItem) => {
    setSelectedRow(row);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmWriteOff = (comment: string) => {
    console.log("Confirm write-off:", selectedRow, "Comment:", comment);
    // TODO: Implement confirm write-off logic
    setIsConfirmDialogOpen(false);
    setSelectedRow(null);
  };

  const handleDeleteFromDialog = () => {
    console.log("Delete write-off:", selectedRow);
    // TODO: Implement delete logic
    setIsConfirmDialogOpen(false);
    setSelectedRow(null);
  };

  const handleSaveSupplier = (name: string) => {
    console.log("Save supplier:", name, "for row:", selectedRow);
    // TODO: Implement save supplier logic
    setIsSupplierDialogOpen(false);
    setSelectedRow(null);
  };

  const handleDeleteSupplier = () => {
    console.log("Delete supplier for row:", selectedRow);
    // TODO: Implement delete supplier logic
    setIsSupplierDialogOpen(false);
    setSelectedRow(null);
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
          onSaveRow={handleViewRow}
          onEditRow={handleEditRow}
          onDeleteRow={handleDeleteRow}
          className="rounded-none"
          showActionsColumn={true}
          customActions={row => (
            <Button
              variant="balck"
              size="sm"
              onClick={() => handleConfirmClick(row)}
              className="h-8 px-3 rounded-full">
              Підтвердити
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

      {/* Confirm Write-Off Dialog */}
      <ConfirmWriteOffDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => {
          setIsConfirmDialogOpen(false);
          setSelectedRow(null);
        }}
        onConfirm={handleConfirmWriteOff}
        onDelete={handleDeleteFromDialog}
        writeOffData={selectedRow}
      />

      {/* Add Supplier Dialog */}
      <AddSupplierDialog
        isOpen={isSupplierDialogOpen}
        onClose={() => {
          setIsSupplierDialogOpen(false);
          setSelectedRow(null);
        }}
        onSave={handleSaveSupplier}
        onDelete={handleDeleteSupplier}
        writeOffData={selectedRow}
      />
    </div>
  );
}
