"use client";

import React, { useState, useCallback } from "react";

import { Check, ChevronDown, Download, Settings, Upload } from "lucide-react";

import { InventoryItem } from "@/service/inventories.service";

import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";
import { Pagination } from "@/shared/ui/pagination";

interface InventoryDetailColumn {
  key: string;
  label: string;
  visible: boolean;
  sortable: boolean;
  width?: string;
}

interface InventoryDetailTableProps {
  items: InventoryItem[];
  inventoryId: string;
  isEditable: boolean;
  onUpdateItem: (itemId: string, data: { actualQuantity: number; comment?: string }) => void;
  isUpdating?: boolean;
}

interface LocalItemData {
  actualQuantity: string;
  comment: string;
}

const defaultColumns: InventoryDetailColumn[] = [
  { key: "productName", label: "Назва товару", visible: true, sortable: true, width: "200px" },
  { key: "type", label: "Тип", visible: true, sortable: false, width: "120px" },
  { key: "thickness", label: "Товщина", visible: true, sortable: false, width: "100px" },
  { key: "systemQuantity", label: "Повинно бути", visible: true, sortable: true, width: "120px" },
  { key: "actualQuantity", label: "Факт. наявність", visible: true, sortable: false, width: "140px" },
  { key: "difference", label: "Різниця", visible: true, sortable: true, width: "120px" },
  { key: "comment", label: "Коментар", visible: true, sortable: false, width: "200px" },
];

export default function InventoryDetailTable({
  items,
  inventoryId,
  isEditable,
  onUpdateItem,
  isUpdating = false,
}: InventoryDetailTableProps) {
  const [columns, setColumns] = useState<InventoryDetailColumn[]>(defaultColumns);
  const [currentPage, setCurrentPage] = useState(1);
  const [localData, setLocalData] = useState<Record<string, LocalItemData>>({});
  const pageSize = 20;

  const totalPages = Math.ceil(items.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageItems = items.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: string) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const getLocalData = useCallback((item: InventoryItem): LocalItemData => {
    if (localData[item.id]) {
      return localData[item.id];
    }
    return {
      actualQuantity: item.actualQuantity !== null ? String(item.actualQuantity) : "",
      comment: item.comment || "",
    };
  }, [localData]);

  const handleLocalChange = (itemId: string, field: keyof LocalItemData, value: string) => {
    setLocalData(prev => ({
      ...prev,
      [itemId]: {
        ...getLocalData(items.find(i => i.id === itemId)!),
        [field]: value,
      },
    }));
  };

  const handleSave = (item: InventoryItem) => {
    const data = getLocalData(item);
    const actualQuantity = parseInt(data.actualQuantity, 10);

    if (isNaN(actualQuantity) || actualQuantity < 0) {
      return;
    }

    onUpdateItem(item.id, {
      actualQuantity,
      comment: data.comment || undefined,
    });

    // Clear local data for this item after save
    setLocalData(prev => {
      const newData = { ...prev };
      delete newData[item.id];
      return newData;
    });
  };

  const hasLocalChanges = (item: InventoryItem): boolean => {
    const local = localData[item.id];
    if (!local) return false;

    const originalActual = item.actualQuantity !== null ? String(item.actualQuantity) : "";
    const originalComment = item.comment || "";

    return local.actualQuantity !== originalActual || local.comment !== originalComment;
  };

  const getDifferenceColor = (difference: number | null): string => {
    if (difference === null) return "text-gray-400";
    if (difference < 0) return "text-red-600";
    if (difference > 0) return "text-green-600";
    return "text-gray-600";
  };

  const formatDifference = (difference: number | null): string => {
    if (difference === null) return "-";
    if (difference > 0) return `+${difference}`;
    return String(difference);
  };

  const visibleColumns = columns.filter(col => col.visible);

  if (items.length === 0) {
    return (
      <div className="max-w-full bg-white rounded-[16px] mt-5 p-8">
        <div className="flex flex-col items-center justify-center text-gray-500">
          <p>Немає товарів для відображення</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full bg-white rounded-[16px] mt-5">
      {/* Header with controls */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
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
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              {visibleColumns.map(col => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-600"
                  style={{ width: col.width }}
                >
                  {col.label}
                </th>
              ))}
              {isEditable && <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-[100px]">Дії</th>}
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map(item => {
              const local = getLocalData(item);
              const hasChanges = hasLocalChanges(item);

              return (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  {visibleColumns.map(col => (
                    <td key={col.key} className="px-4 py-3 text-sm">
                      {col.key === "productName" && (
                        <span className="font-medium text-gray-900">
                          {item.material?.materialItem?.name || "-"}
                        </span>
                      )}
                      {col.key === "type" && (
                        <span className="text-gray-600">
                          {item.material?.materialItem?.type?.name || "-"}
                        </span>
                      )}
                      {col.key === "thickness" && (
                        <span className="text-gray-600">
                          {item.material?.materialItem?.thickness ? `${item.material.materialItem.thickness} мм` : "-"}
                        </span>
                      )}
                      {col.key === "systemQuantity" && (
                        <span className="text-gray-600">{item.systemQuantity}</span>
                      )}
                      {col.key === "actualQuantity" && (
                        isEditable ? (
                          <Input
                            type="number"
                            min="0"
                            value={local.actualQuantity}
                            onChange={e => handleLocalChange(item.id, "actualQuantity", e.target.value)}
                            className="w-24 h-8 text-sm"
                            placeholder="0"
                          />
                        ) : (
                          <span className={item.actualQuantity !== null ? "text-gray-900" : "text-gray-400"}>
                            {item.actualQuantity !== null ? item.actualQuantity : "-"}
                          </span>
                        )
                      )}
                      {col.key === "difference" && (
                        <span className={`font-medium ${getDifferenceColor(item.difference)}`}>
                          {formatDifference(item.difference)}
                        </span>
                      )}
                      {col.key === "comment" && (
                        isEditable ? (
                          <Input
                            type="text"
                            value={local.comment}
                            onChange={e => handleLocalChange(item.id, "comment", e.target.value)}
                            className="w-full h-8 text-sm"
                            placeholder="Коментар"
                          />
                        ) : (
                          <span className="text-gray-600">{item.comment || "-"}</span>
                        )
                      )}
                    </td>
                  ))}
                  {isEditable && (
                    <td className="px-4 py-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSave(item)}
                        disabled={!hasChanges || isUpdating}
                        className="h-8"
                      >
                        Зберегти
                      </Button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Показано {startIndex + 1}-{Math.min(endIndex, items.length)} з {items.length} записів
          </div>
          {totalPages > 1 && (
            <div className="w-fit">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
