"use client";

import React, { useState } from "react";

import {
  Check,
  ChevronDown,
  Download,
  Settings,
  Trash2,
  Upload,
} from "lucide-react";

import { WriteOffItem } from "@/service/write-offs.service";

import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";
import { Pagination } from "@/shared/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

import type { WriteOffItemColumn } from "../types/write-off-items.types";

interface WriteOffItemsTableProps {
  items: WriteOffItem[];
  onUpdateItem: (
    itemId: string,
    data: { quantity: number; comment: string }
  ) => void;
  onRemoveItem: (itemId: string) => void;
  isLoading?: boolean;
  isDraft?: boolean;
}

export default function WriteOffItemsTable({
  items,
  onUpdateItem,
  onRemoveItem,
  isLoading = false,
  isDraft = true,
}: WriteOffItemsTableProps) {
  const getColumns = (): WriteOffItemColumn[] => [
    {
      key: "productName",
      label: "Назва товару",
      visible: true,
      sortable: true,
      width: "200px",
      type: "text",
    },
    {
      key: "type",
      label: "Тип",
      visible: true,
      sortable: true,
      width: "120px",
      type: "text",
    },
    {
      key: "dimensions",
      label: "Розмір",
      visible: true,
      sortable: false,
      width: "120px",
      type: "text",
    },
    {
      key: "stockQuantity",
      label: "На складі",
      visible: true,
      sortable: true,
      width: "100px",
      type: "number",
    },
    {
      key: "writeOffQuantity",
      label: "До списання",
      visible: true,
      sortable: false,
      width: "120px",
      type: "editable",
    },
    {
      key: "pricePerUnit",
      label: "Ціна за од.",
      visible: true,
      sortable: false,
      width: "120px",
      type: "number",
    },
    {
      key: "amount",
      label: "Сума",
      visible: true,
      sortable: false,
      width: "120px",
      type: "number",
    },
    {
      key: "comment",
      label: "Коментар",
      visible: true,
      sortable: false,
      width: "200px",
      type: "editable",
    },
    {
      key: "actions",
      label: "",
      visible: true,
      sortable: false,
      width: "60px",
      type: "text",
    },
  ];

  const [columns, setColumns] = useState<WriteOffItemColumn[]>(getColumns());
  const [currentPage, setCurrentPage] = useState(1);
  const [localEdits, setLocalEdits] = useState<
    Map<string, { quantity: number; comment: string }>
  >(new Map());
  const pageSize = 20;

  const totalPages = Math.ceil(items.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = items.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: string) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const getLocalValue = (item: WriteOffItem) => {
    const local = localEdits.get(item.id);
    return {
      quantity: local?.quantity ?? item.quantity,
      comment: local?.comment ?? item.comment ?? "",
    };
  };

  const handleQuantityChange = (itemId: string, value: string, item: WriteOffItem) => {
    const quantity = parseInt(value, 10) || 0;
    const current = getLocalValue(item);
    setLocalEdits(prev => {
      const newMap = new Map(prev);
      newMap.set(itemId, { ...current, quantity });
      return newMap;
    });
  };

  const handleCommentChange = (itemId: string, value: string, item: WriteOffItem) => {
    const current = getLocalValue(item);
    setLocalEdits(prev => {
      const newMap = new Map(prev);
      newMap.set(itemId, { ...current, comment: value });
      return newMap;
    });
  };

  const handleBlur = (itemId: string, item: WriteOffItem) => {
    const local = localEdits.get(itemId);
    if (local) {
      onUpdateItem(itemId, local);
      setLocalEdits(prev => {
        const newMap = new Map(prev);
        newMap.delete(itemId);
        return newMap;
      });
    }
  };

  const visibleColumns = columns.filter(col => col.visible);

  if (isLoading) {
    return (
      <div className="max-w-full bg-white rounded-[16px] mt-5 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3A4754]" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full bg-white rounded-[16px] mt-5">
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
              {columns
                .filter(col => col.key !== "actions")
                .map(column => (
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

      <div className="max-w-[100vw] overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-100">
              {visibleColumns.map(column => (
                <TableHead
                  key={column.key}
                  className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs"
                  style={{ width: column.width }}>
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={visibleColumns.length}
                  className="text-center py-12 text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <p>Немає товарів у списанні</p>
                    <p className="text-sm">
                      Натисніть &quot;Додати товар&quot; щоб додати товари
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              currentPageData.map(item => {
                const localValue = getLocalValue(item);
                const material = item.material;
                const productName = material?.materialItem?.name || "-";
                const type = material?.materialItem?.type?.name || "-";
                const dimensions = `${material?.width || 0} x ${material?.length || 0}`;
                const stockQuantity = material?.quantity || 0;

                return (
                  <TableRow key={item.id} className="border-gray-100 hover:bg-[#EBFBFF]">
                    {visibleColumns.map(column => (
                      <TableCell
                        key={column.key}
                        className="px-4 py-3 text-sm"
                        style={{ width: column.width }}>
                        {column.key === "productName" ? (
                          <span>{productName}</span>
                        ) : column.key === "type" ? (
                          <span>{type}</span>
                        ) : column.key === "dimensions" ? (
                          <span>{dimensions}</span>
                        ) : column.key === "stockQuantity" ? (
                          <span>{stockQuantity}</span>
                        ) : column.key === "writeOffQuantity" ? (
                          <Input
                            type="number"
                            min={1}
                            max={stockQuantity}
                            value={localValue.quantity || ""}
                            onChange={e =>
                              handleQuantityChange(item.id, e.target.value, item)
                            }
                            onBlur={() => handleBlur(item.id, item)}
                            disabled={!isDraft}
                            className="w-20 h-8 text-center"
                          />
                        ) : column.key === "pricePerUnit" ? (
                          <span>
                            {item.pricePerUnit.toLocaleString("uk-UA")} грн
                          </span>
                        ) : column.key === "amount" ? (
                          <span>
                            {item.amount.toLocaleString("uk-UA")} грн
                          </span>
                        ) : column.key === "comment" ? (
                          <Input
                            type="text"
                            value={localValue.comment}
                            onChange={e =>
                              handleCommentChange(item.id, e.target.value, item)
                            }
                            onBlur={() => handleBlur(item.id, item)}
                            disabled={!isDraft}
                            className="w-full h-8"
                            placeholder="Коментар"
                          />
                        ) : column.key === "actions" ? (
                          isDraft && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onRemoveItem(item.id)}
                              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )
                        ) : null}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {items.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Показано {startIndex + 1}-{Math.min(endIndex, items.length)} з{" "}
              {items.length} записів
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
      )}
    </div>
  );
}
