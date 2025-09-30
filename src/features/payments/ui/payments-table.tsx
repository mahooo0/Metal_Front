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

// Types for payments table
export interface PaymentItem {
  id: string;
  date: string;
  accountNumber: string;
  amount: number;
  paymentMethod: string;
  paymentType: string;
  responsible: string;
  comment: string;
}

export interface PaymentColumn {
  key: keyof PaymentItem;
  label: string;
  visible: boolean;
  sortable?: boolean;
  width?: string;
  type?: "text" | "date" | "select" | "number";
  options?: { value: string; label: string }[];
}

// Mock data for payments
const mockPayments: PaymentItem[] = [
  {
    id: "1",
    date: "18/09/2016",
    accountNumber: "4349",
    amount: 19897,
    paymentMethod: "б/г",
    paymentType: "передоплата",
    responsible: "Darlene Robertson",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "2",
    date: "28/10/2012",
    accountNumber: "5560",
    amount: 73143,
    paymentMethod: "готівка",
    paymentType: "передоплата",
    responsible: "Marvin McKinney",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "3",
    date: "15/03/2018",
    accountNumber: "7891",
    amount: 45231,
    paymentMethod: "б/г",
    paymentType: "передоплата",
    responsible: "John Smith",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "4",
    date: "22/07/2019",
    accountNumber: "1234",
    amount: 67890,
    paymentMethod: "готівка",
    paymentType: "передоплата",
    responsible: "Jane Doe",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "5",
    date: "05/12/2020",
    accountNumber: "9876",
    amount: 34567,
    paymentMethod: "б/г",
    paymentType: "передоплата",
    responsible: "Bob Johnson",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

// Column definitions for payments
const paymentColumns: PaymentColumn[] = [
  {
    key: "date",
    label: "↑↓ Дата",
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
    width: "120px",
    type: "text",
  },
  {
    key: "amount",
    label: "Сума",
    visible: true,
    sortable: true,
    width: "120px",
    type: "number",
  },
  {
    key: "paymentMethod",
    label: "Спосіб оплати",
    visible: true,
    sortable: true,
    width: "140px",
    type: "select",
    options: [
      { value: "б/г", label: "Безналичный" },
      { value: "готівка", label: "Наличные" },
    ],
  },
  {
    key: "paymentType",
    label: "Тип оплати",
    visible: true,
    sortable: true,
    width: "140px",
    type: "select",
    options: [
      { value: "передоплата", label: "Предоплата" },
      { value: "повна", label: "Полная оплата" },
    ],
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
    width: "300px",
    type: "text",
  },
];

export default function PaymentsTable() {
  const [columns, setColumns] = useState<PaymentColumn[]>(paymentColumns);
  const [data] = useState<PaymentItem[]>(mockPayments);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Calculate total pages based on data length
  const totalPages = Math.ceil(data.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof PaymentItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<PaymentItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
      options: col.options,
    }));

  const handleSaveRow = (_row: PaymentItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (_row: PaymentItem) => {
    // This will trigger edit mode in DataTable
  };

  const handleDeleteRow = (_row: PaymentItem) => {
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

        <div className="flex items-center gap-2">
          {/* Action buttons */}
          <Button variant="blue" size="lg" className="h-[42px]">
            <SquarePlus className="h-4 w-4" />
            Додати оплату
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-[91vw] overflow-x-auto ">
        <DataTable
          data={currentPageData}
          columns={visibleColumns}
          idField="id"
          onSaveRow={handleSaveRow}
          onEditRow={handleEditRow}
          onDeleteRow={handleDeleteRow}
          className=" rounded-none"
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
    </div>
  );
}
