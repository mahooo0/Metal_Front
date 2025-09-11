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

import { mockCalculations } from "../mocks/calculations.mock";
import { CalculationColumn, CalculationItem } from "../types/calculation.types";

const initialColumns: CalculationColumn[] = [
  {
    key: "creationDate",
    label: "Дата створення",
    visible: true,
    sortable: true,
    type: "date",
  },
  {
    key: "calculationNumber",
    label: "№ Прорахунку",
    visible: true,
    sortable: true,
    type: "text",
  },
  {
    key: "laserCutting",
    label: "Розкрій лазер",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "hydroCutting",
    label: "Розкрій гідра",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "bending",
    label: "Гібка",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "metal",
    label: "Метал",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "metalAvailability",
    label: "Наявність металу",
    visible: true,
    sortable: true,
    type: "select",
    options: [
      { value: "Так", label: "Так" },
      { value: "Ні", label: "Ні" },
    ],
  },
  {
    key: "additionalWorks",
    label: "Додаткові роботи",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "designerServices",
    label: "Послуги конструктора",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "markup",
    label: "Націнка",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "amountWithVAT",
    label: "Сума з ПДВ",
    visible: true,
    sortable: true,
    type: "number",
  },
  {
    key: "invoiceAmountWithVAT",
    label: "Сума рахунку з ПДВ",
    visible: true,
    sortable: true,
    type: "number",
  },
];

export default function CalculationsTable() {
  const [columns, setColumns] = useState<CalculationColumn[]>(initialColumns);
  const [data] = useState<CalculationItem[]>(mockCalculations);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Calculate total pages based on data length
  const totalPages = Math.ceil(data.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof CalculationItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<CalculationItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
      options: col.options,
    }));

  const handleSaveRow = (_row: CalculationItem) => {
    // TODO: Implement save row functionality
  };

  const handleSelectAsMain = (_row: CalculationItem) => {
    // TODO: Implement select as main functionality
  };

  const handleEditRow = (_row: CalculationItem) => {
    // This will trigger edit mode in DataTable
  };

  const handleDeleteRow = (_row: CalculationItem) => {
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
            Додати новий
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
          customActions={row => (
            <Button
              variant="blueTransparent"
              size="lg"
              className="h-[36px] text-[#3A4754] text-xs px-2 py-1"
              onClick={() => handleSelectAsMain(row)}>
              Обрати як головний
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
    </div>
  );
}
