"use client";

import React, { useState } from "react";

import { PurchaseItemStatus } from "@/service/purchase-items.service";
import { Check, ChevronDown, Download, Settings, Upload } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import type {
  PurchaseDetailColumn,
  PurchaseDetailTableRow,
} from "../types/purchase-detail.types";

const getItemStatusLabel = (status: PurchaseItemStatus) => {
  switch (status) {
    case "ORDERED":
      return "Замовлено";
    case "PARTIALLY_RECEIVED":
      return "Частково отримано";
    case "READY":
      return "Готово";
    case "RECEIVED":
      return "Отримано";
    case "CANCELLED":
      return "Скасовано";
    default:
      return status;
  }
};

const getItemStatusStyles = (status: PurchaseItemStatus) => {
  switch (status) {
    case "ORDERED":
      return "bg-blue-100 text-blue-800";
    case "PARTIALLY_RECEIVED":
      return "bg-yellow-100 text-yellow-800";
    case "READY":
      return "bg-green-100 text-green-800";
    case "RECEIVED":
      return "bg-emerald-100 text-emerald-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

interface ItemStatusDropdownProps {
  status: PurchaseItemStatus;
  onStatusChange: (status: PurchaseItemStatus) => void;
  disabled?: boolean;
}

const ItemStatusDropdown = ({
  status,
  onStatusChange,
  disabled,
}: ItemStatusDropdownProps) => {
  return (
    <Select
      value={status}
      onValueChange={value => onStatusChange(value as PurchaseItemStatus)}
      disabled={disabled}>
      <SelectTrigger className="w-fit h-auto border-0 bg-transparent p-0 focus:ring-0 shadow-none">
        <SelectValue>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getItemStatusStyles(status)}`}>
            {getItemStatusLabel(status)}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ORDERED">Замовлено</SelectItem>
        <SelectItem value="PARTIALLY_RECEIVED">Частково отримано</SelectItem>
        <SelectItem value="READY">Готово</SelectItem>
        <SelectItem value="RECEIVED">Отримано</SelectItem>
        <SelectItem value="CANCELLED">Скасовано</SelectItem>
      </SelectContent>
    </Select>
  );
};

interface EditableQuantityProps {
  value: number;
  orderedQuantity: number;
  onSave: (value: number) => void;
  disabled?: boolean;
}

const EditableQuantity = ({
  value,
  orderedQuantity,
  onSave,
  disabled,
}: EditableQuantityProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());

  const handleSave = () => {
    const numValue = parseInt(inputValue, 10);
    if (!isNaN(numValue) && numValue >= 0) {
      onSave(numValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setInputValue(value.toString());
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <Input
        type="number"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        min={0}
        max={orderedQuantity}
        autoFocus
        className="w-20 h-8 text-center"
      />
    );
  }

  return (
    <button
      onClick={() => !disabled && setIsEditing(true)}
      disabled={disabled}
      className={`px-2 py-1 rounded hover:bg-gray-100 transition-colors ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}>
      {value} / {orderedQuantity}
    </button>
  );
};

const getInitialColumns = (): PurchaseDetailColumn[] => [
  {
    key: "productName",
    label: "Назва товару",
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
    type: "text",
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
    key: "sheetType",
    label: "Тип листа",
    visible: true,
    sortable: true,
    width: "120px",
    type: "text",
  },
  {
    key: "dimensions",
    label: "Розмір",
    visible: true,
    sortable: true,
    width: "120px",
    type: "text",
  },
  {
    key: "orderedQuantity",
    label: "Замовлено",
    visible: true,
    sortable: true,
    width: "100px",
    type: "number",
  },
  {
    key: "receivedQuantity",
    label: "Отримано",
    visible: true,
    sortable: true,
    width: "120px",
    type: "editable",
  },
  {
    key: "purchasePrice",
    label: "Ціна закупки",
    visible: true,
    sortable: true,
    width: "120px",
    type: "number",
  },
  {
    key: "salePrice",
    label: "Ціна продажу",
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
    type: "status",
  },
];

interface PurchaseDetailTableProps {
  data: PurchaseDetailTableRow[];
  isLoading?: boolean;
  purchaseId: string;
  onEditRow?: (row: PurchaseDetailTableRow) => void;
  onDeleteRow?: (row: PurchaseDetailTableRow) => void;
  onStatusChange?: (itemId: string, status: PurchaseItemStatus) => void;
  onReceive?: (itemId: string, receivedQuantity: number) => void;
  isUpdating?: boolean;
}

export default function PurchaseDetailTable({
  data,
  isLoading,
  onEditRow,
  onDeleteRow,
  onStatusChange,
  onReceive,
  isUpdating,
}: PurchaseDetailTableProps) {
  const [columns, setColumns] = useState<PurchaseDetailColumn[]>(
    getInitialColumns()
  );

  const toggleColumnVisibility = (columnKey: keyof PurchaseDetailTableRow) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<PurchaseDetailTableRow>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type === "editable" || col.type === "status" ? "text" : col.type,
      render:
        col.key === "status"
          ? (value: unknown, item: PurchaseDetailTableRow) => (
              <ItemStatusDropdown
                status={value as PurchaseItemStatus}
                onStatusChange={newStatus =>
                  onStatusChange?.(item.id, newStatus)
                }
                disabled={isUpdating}
              />
            )
          : col.key === "receivedQuantity"
            ? (value: unknown, item: PurchaseDetailTableRow) => (
                <EditableQuantity
                  value={value as number}
                  orderedQuantity={item.orderedQuantity}
                  onSave={newValue => onReceive?.(item.id, newValue)}
                  disabled={isUpdating}
                />
              )
            : col.key === "purchasePrice" || col.key === "salePrice"
              ? (value: unknown) =>
                  value ? `${(value as number).toLocaleString("uk-UA")} грн` : "-"
              : undefined,
    }));

  const handleEditRow = (row: PurchaseDetailTableRow) => {
    onEditRow?.(row);
  };

  const handleDeleteRow = (row: PurchaseDetailTableRow) => {
    onDeleteRow?.(row);
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

        {/* Status legend */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm text-[#3A4754]">Замовлено</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="text-sm text-[#3A4754]">Частково</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm text-[#3A4754]">Готово</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span className="text-sm text-[#3A4754]">Отримано</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span className="text-sm text-[#3A4754]">Скасовано</span>
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
            Товари не знайдено
          </div>
        ) : (
          <DataTable
            data={data}
            columns={visibleColumns}
            idField="id"
            onEditRow={handleEditRow}
            onDeleteRow={handleDeleteRow}
            className="rounded-none"
            showActionsColumn={true}
          />
        )}
      </div>
    </div>
  );
}
