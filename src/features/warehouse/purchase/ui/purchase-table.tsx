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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import type {
  PurchaseColumn,
  PurchaseStatus,
  PurchaseTableRow,
} from "../types/purchase.types";

const StatusBadge = ({ status }: { status: PurchaseStatus }) => {
  const getStatusStyles = (status: PurchaseStatus) => {
    switch (status) {
      case "IN_PROCESS":
        return "bg-green-100 text-green-800";
      case "UNDER_REVIEW":
        return "bg-blue-100 text-blue-800";
      case "PLANNING":
        return "bg-pink-100 text-pink-800";
      case "CALCULATION":
        return "bg-purple-100 text-purple-800";
      case "LAUNCH":
        return "bg-cyan-100 text-cyan-800";
      case "RECEIVED":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: PurchaseStatus) => {
    switch (status) {
      case "IN_PROCESS":
        return "У процесі";
      case "UNDER_REVIEW":
        return "На розгляді";
      case "PLANNING":
        return "Планування";
      case "CALCULATION":
        return "Прорахунок";
      case "LAUNCH":
        return "Запуск";
      case "RECEIVED":
        return "Отримано";
      default:
        return status;
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(status)}`}>
      {getStatusLabel(status)}
    </span>
  );
};

interface StatusDropdownProps {
  status: PurchaseStatus;
  onStatusChange: (status: PurchaseStatus) => void;
  disabled?: boolean;
}

const StatusDropdown = ({
  status,
  onStatusChange,
  disabled,
}: StatusDropdownProps) => {
  return (
    <Select
      value={status}
      onValueChange={value => onStatusChange(value as PurchaseStatus)}
      disabled={disabled}>
      <SelectTrigger className="w-fit h-auto border-0 bg-transparent p-0 focus:ring-0 shadow-none">
        <SelectValue>
          <StatusBadge status={status} />
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="IN_PROCESS">У процесі</SelectItem>
        <SelectItem value="UNDER_REVIEW">На розгляді</SelectItem>
        <SelectItem value="PLANNING">Планування</SelectItem>
        <SelectItem value="CALCULATION">Прорахунок</SelectItem>
        <SelectItem value="LAUNCH">Запуск</SelectItem>
        <SelectItem value="RECEIVED">Отримано</SelectItem>
      </SelectContent>
    </Select>
  );
};

const getInitialColumns = (): PurchaseColumn[] => [
  {
    key: "date",
    label: "Дата",
    visible: true,
    sortable: true,
    width: "120px",
    type: "date",
  },
  {
    key: "purchaseId",
    label: "ID закупки",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "supplierName",
    label: "Постачальник",
    visible: true,
    sortable: true,
    width: "200px",
    type: "text",
  },
  {
    key: "totalAmount",
    label: "Сума",
    visible: true,
    sortable: true,
    width: "120px",
    type: "number",
  },
  {
    key: "status",
    label: "Статус",
    visible: true,
    sortable: true,
    width: "150px",
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

interface PurchaseTableProps {
  data: PurchaseTableRow[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  isLoading?: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  onViewRow?: (row: PurchaseTableRow) => void;
  onEditRow?: (row: PurchaseTableRow) => void;
  onDeleteRow?: (row: PurchaseTableRow) => void;
  onStatusChange?: (id: string, status: PurchaseStatus) => void;
}

export default function PurchaseTable({
  data,
  meta,
  isLoading,
  currentPage,
  onPageChange,
  onViewRow,
  onEditRow,
  onDeleteRow,
  onStatusChange,
}: PurchaseTableProps) {
  const [columns, setColumns] = useState<PurchaseColumn[]>(getInitialColumns());

  const toggleColumnVisibility = (columnKey: keyof PurchaseTableRow) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<PurchaseTableRow>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
      render:
        col.key === "status"
          ? (value: unknown, item: PurchaseTableRow) => (
              <StatusDropdown
                status={value as PurchaseStatus}
                onStatusChange={newStatus =>
                  onStatusChange?.(item.id, newStatus)
                }
                disabled={isLoading}
              />
            )
          : col.key === "date"
            ? (value: unknown) =>
                value
                  ? new Date(value as string).toLocaleDateString("uk-UA")
                  : "-"
            : col.key === "totalAmount"
              ? (value: unknown) => (value ? `${value} грн` : "-")
              : col.render,
    }));

  const handleViewRow = (row: PurchaseTableRow) => {
    onViewRow?.(row);
  };

  const handleEditRow = (row: PurchaseTableRow) => {
    onEditRow?.(row);
  };

  const handleDeleteRow = (row: PurchaseTableRow) => {
    onDeleteRow?.(row);
  };

  const totalPages = meta?.totalPages || 1;
  const total = meta?.total || data.length;
  const limit = meta?.limit || 20;
  const startIndex = (currentPage - 1) * limit;
  const endIndex = Math.min(startIndex + limit, total);

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
            <DropdownMenuContent
              align="start"
              className="w-56 max-h-[400px] overflow-y-auto">
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

        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm text-[#3A4754]">У процесі</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm text-[#3A4754]">На розгляді</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
            <span className="text-sm text-[#3A4754]">Планування</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-sm text-[#3A4754]">Прорахунок</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <span className="text-sm text-[#3A4754]">Запуск</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span className="text-sm text-[#3A4754]">Отримано</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-[90vw] overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3A4754]"></div>
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center py-20 text-gray-500">
            Закупки не знайдено
          </div>
        ) : (
          <DataTable
            data={data}
            columns={visibleColumns}
            idField="id"
            onViewRow={handleViewRow}
            onEditRow={handleEditRow}
            onDeleteRow={handleDeleteRow}
            className="rounded-none"
            showActionsColumn={true}
          />
        )}
      </div>

      {/* Pagination */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Показано {total > 0 ? startIndex + 1 : 0}-{endIndex} з {total}{" "}
            записів
          </div>
          <div className="w-fit">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
