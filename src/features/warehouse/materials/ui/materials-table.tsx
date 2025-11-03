"use client";

import React, { useState } from "react";

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

import { mockMaterialsData } from "../mocks/materials.mock";
import type { MaterialsSheetData } from "../types/materials-sheet.types";
import type {
  MaterialColumn,
  MaterialItem,
  MaterialStatus,
} from "../types/materials.types";

// Status badge component
const StatusBadge = ({ status }: { status: MaterialStatus }) => {
  const getStatusStyles = (status: MaterialStatus) => {
    switch (status) {
      case "У процесі":
        return "bg-green-100 text-green-800";
      case "На розгляді":
        return "bg-blue-100 text-blue-800";
      case "Планування":
        return "bg-pink-100 text-pink-800";
      case "Прорахунок":
        return "bg-purple-100 text-purple-800";
      case "Запуск":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(status)}`}>
      {status}
    </span>
  );
};

// Column definitions for materials table
const materialsColumns: MaterialColumn[] = [
  {
    key: "date",
    label: "↑↓ Дата",
    visible: true,
    sortable: true,
    width: "120px",
    type: "date",
  },
  {
    key: "materialName",
    label: "Назва матеріалу",
    visible: true,
    sortable: true,
    width: "200px",
    type: "text",
  },
  {
    key: "thickness",
    label: "Товщина",
    visible: true,
    sortable: true,
    width: "100px",
    type: "number",
  },
  {
    key: "type",
    label: "Тип",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "width",
    label: "Ширина",
    visible: true,
    sortable: true,
    width: "100px",
    type: "number",
  },
  {
    key: "length",
    label: "Довжина",
    visible: true,
    sortable: true,
    width: "100px",
    type: "number",
  },
  {
    key: "volume",
    label: "Об'єм",
    visible: true,
    sortable: true,
    width: "100px",
    type: "number",
  },
  {
    key: "weight",
    label: "Вага",
    visible: true,
    sortable: true,
    width: "100px",
    type: "number",
  },
  {
    key: "sheetType",
    label: "Тип листу",
    visible: true,
    sortable: true,
    width: "120px",
    type: "text",
  },
  {
    key: "status",
    label: "Статус",
    visible: true,
    sortable: true,
    width: "120px",
    type: "text",
    render: (value: MaterialStatus) => <StatusBadge status={value} />,
  },
  {
    key: "quantity",
    label: "Кількість",
    visible: true,
    sortable: true,
    width: "100px",
    type: "number",
  },
  {
    key: "comment",
    label: "Коментар",
    visible: true,
    sortable: false,
    width: "150px",
    type: "text",
  },
];

interface MaterialsTableProps {
  onViewDetails?: (material: MaterialsSheetData) => void;
}

export default function MaterialsTable({ onViewDetails }: MaterialsTableProps) {
  const [columns, setColumns] = useState<MaterialColumn[]>(materialsColumns);
  const [data] = useState<MaterialItem[]>(mockMaterialsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Calculate total pages based on data length
  const totalPages = Math.ceil(data.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof MaterialItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<MaterialItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
      render: col.render,
    }));

  const handleSaveRow = (_row: MaterialItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (row: MaterialItem) => {
    // Convert MaterialItem to MaterialsSheetData and open sheet
    const materialData: MaterialsSheetData = {
      id: row.id,
      created: row.date,
      name: row.materialName,
      thickness: row.thickness,
      type: row.type,
      size: `${row.width}*${row.length}`,
      volume: row.volume,
      weight: row.weight,
      status: row.status,
      quantity: row.quantity,
      description: row.comment,
      priceFrom100: "",
      priceFrom50to100: "",
      priceFrom10to50: "",
      priceFrom10: "",
      feedCut: "",
      cutTime: "",
    };

    if (onViewDetails) {
      onViewDetails(materialData);
    }
  };

  const handleDeleteRow = (_row: MaterialItem) => {
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

        <div className="flex items-center gap-2">
          {/* Minimum balance indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
            <span className="text-sm text-[#3A4754]">
              Мінімально допустимий залишок
            </span>
          </div>
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
