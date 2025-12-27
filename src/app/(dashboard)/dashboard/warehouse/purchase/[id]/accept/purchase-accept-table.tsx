"use client";

import React, { useEffect, useState } from "react";

import { PurchaseItemStatus } from "@/service/purchase-items.service";
import { Check, ChevronDown, Download, Settings, Upload } from "lucide-react";

import { PurchaseDetailTableRow } from "@/features/warehouse/purchase";

import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";

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
  const getDisplayValue = (val: number) => (val === 0 ? "" : val.toString());
  const [inputValue, setInputValue] = useState(getDisplayValue(value));

  // Синхронизируем inputValue с value, когда не редактируется
  useEffect(() => {
    if (!isEditing) {
      setInputValue(getDisplayValue(value));
    }
  }, [value, isEditing]);

  const handleStartEdit = () => {
    if (!disabled) {
      setInputValue(getDisplayValue(value));
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    const numValue = inputValue === "" ? 0 : parseInt(inputValue, 10);
    if (!isNaN(numValue) && numValue >= 0) {
      onSave(numValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setInputValue(getDisplayValue(value));
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    // Разрешаем только цифры
    if (inputVal === "" || /^\d+$/.test(inputVal)) {
      setInputValue(inputVal);
    }
  };

  if (isEditing) {
    return (
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        autoFocus
        className="w-24 h-8 text-center"
        inputMode="numeric"
      />
    );
  }

  const isComplete = value >= orderedQuantity;

  return (
    <button
      onClick={handleStartEdit}
      disabled={disabled}
      className={`px-3 py-1 rounded font-medium transition-colors ${
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer hover:bg-gray-100"
      } ${
        isComplete
          ? "bg-green-100 text-green-800"
          : value > 0
            ? "bg-yellow-100 text-yellow-800"
            : "bg-gray-100 text-gray-600"
      }`}>
      {value} / {orderedQuantity}
    </button>
  );
};

interface AcceptColumn {
  key: keyof PurchaseDetailTableRow;
  label: string;
  visible: boolean;
  sortable: boolean;
  width?: string;
  type: "text" | "number" | "status" | "editable";
}

const getInitialColumns = (): AcceptColumn[] => [
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
    width: "140px",
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
    key: "status",
    label: "Статус",
    visible: true,
    sortable: true,
    width: "140px",
    type: "status",
  },
];

interface PurchaseAcceptTableProps {
  data: PurchaseDetailTableRow[];
  isLoading?: boolean;
  onReceive: (itemId: string, receivedQuantity: number) => void;
  isUpdating?: boolean;
  isReadOnly?: boolean;
}

export default function PurchaseAcceptTable({
  data,
  isLoading,
  onReceive,
  isUpdating,
  isReadOnly,
}: PurchaseAcceptTableProps) {
  const [columns, setColumns] = useState<AcceptColumn[]>(getInitialColumns());

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
      type:
        col.type === "editable" || col.type === "status" ? "text" : col.type,
      render:
        col.key === "status"
          ? (value: unknown) => (
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getItemStatusStyles(value as PurchaseItemStatus)}`}>
                {getItemStatusLabel(value as PurchaseItemStatus)}
              </span>
            )
          : col.key === "receivedQuantity"
            ? (value: unknown, item: PurchaseDetailTableRow) => (
                <EditableQuantity
                  value={value as number}
                  orderedQuantity={item.orderedQuantity}
                  onSave={newValue => onReceive(item.id, newValue)}
                  disabled={isUpdating || isReadOnly}
                />
              )
            : col.key === "purchasePrice"
              ? (value: unknown) =>
                  value
                    ? `${(value as number).toLocaleString("uk-UA")} грн`
                    : "-"
              : undefined,
    }));

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

        {/* Legend */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded"></div>
            <span className="text-sm text-[#3A4754]">Не отримано</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-200 rounded"></div>
            <span className="text-sm text-[#3A4754]">Частково</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-200 rounded"></div>
            <span className="text-sm text-[#3A4754]">Повністю</span>
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
            className="rounded-none"
            showActionsColumn={false}
          />
        )}
      </div>
    </div>
  );
}
