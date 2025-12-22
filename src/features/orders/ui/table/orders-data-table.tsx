"use client";

import * as React from "react";

import { Check, ChevronDown, Printer, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Pagination } from "@/shared/ui/pagination";

import { TABLE_STATUS_CONFIG } from "../../constants/table-statuses";
import { mockTableOrders } from "../../mocks/table-orders.mock";
import { OrderTableItem } from "../../types/table.types";

interface OrdersDataTableProps {
  data?: OrderTableItem[];
  onSaveRow?: (row: OrderTableItem) => void;
  onEditRow?: (row: OrderTableItem) => void;
  onDeleteRow?: (row: OrderTableItem) => void;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
}

type StatusKey = keyof typeof TABLE_STATUS_CONFIG;

export default function OrdersDataTable({
  data = mockTableOrders,
  onSaveRow,
  onEditRow,
  onDeleteRow,
  onPageChange,
  currentPage = 1,
  totalPages = 1,
}: OrdersDataTableProps) {
  const router = useRouter();
  const [zoom, setZoom] = React.useState<number>(100);
  const [columns, setColumns] = React.useState<DataTableColumn<OrderTableItem>[]>(
    [
      {
        key: "date",
        label: "Дата",
        sortable: true,
        width: "w-32",
        type: "date",
        visible: true,
      },
      {
        key: "orderNumber",
        label: "№ замовлення",
        sortable: false,
        width: "w-36",
        type: "text",
        visible: true,
      },
      {
        key: "counterparty",
        label: "Котрагент",
        sortable: true,
        width: "w-48",
        type: "text",
        visible: true,
      },
      {
        key: "responsible",
        label: "Відповідальний",
        sortable: false,
        width: "w-40",
        type: "text",
        visible: true,
      },
      {
        key: "calculationDate",
        label: "Дата прорахунку",
        sortable: false,
        width: "w-40",
        type: "date",
        visible: true,
      },
      {
        key: "endDate",
        label: "Дата закінчення",
        sortable: false,
        width: "w-40",
        type: "date",
        visible: true,
      },
      {
        key: "status",
        label: "Статус",
        sortable: false,
        width: "w-32",
        type: "select",
        visible: true,
        options: Object.entries(TABLE_STATUS_CONFIG).map(([key, conf]) => ({
          value: key,
          label: conf.label,
        })),
        render: value => {
          const conf = TABLE_STATUS_CONFIG[value as StatusKey];
          return (
            <Badge
              variant="secondary"
              className={`${conf.color} rounded-full px-3 py-1 text-xs font-medium`}>
              {conf.label}
            </Badge>
          );
        },
      },
    ]
  );

  const toggleColumnVisibility = (columnKey: string) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleSaveRow = (row: OrderTableItem) => {
    if (onSaveRow) {
      onSaveRow(row);
    }
  };

  const handleEditRow = (row: OrderTableItem) => {
    if (onEditRow) {
      onEditRow(row);
    }
  };

  const handleDeleteRow = (row: OrderTableItem) => {
    if (onDeleteRow) {
      onDeleteRow(row);
    }
  };

  const handleViewRow = (row: OrderTableItem) => {
    router.push(`/dashboard/order/${row.id}`);
  };

  const isEmpty = data.length === 0;
  const visibleColumns = columns.filter(col => col.visible);

  return (
    <div className="bg-white rounded-2xl p-6 mt-5">
      {/* Top Actions Bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          {/* Columns dropdown */}
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
                {zoom}%
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setZoom(50)}>
                50%
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setZoom(75)}>
                75%
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setZoom(100)}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setZoom(125)}>
                125%
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setZoom(150)}>
                150%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4">
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
      </div>

      {/* DataTable */}
      {isEmpty ? (
        <div className="flex items-center justify-center py-10 text-gray-500">
          Nothing found
        </div>
      ) : (
        <div className="w-full">
          <DataTable
            data={data}
            columns={visibleColumns}
            idField="id"
            enableEditOnDoubleClick={false}
            fontSize={
              zoom <= 60
                ? "xs"
                : zoom <= 85
                  ? "sm"
                  : zoom <= 110
                    ? "base"
                    : zoom <= 135
                      ? "lg"
                      : "xl"
            }
            onSaveRow={handleSaveRow}
            onPageChange={onPageChange}
            onViewRow={handleViewRow}
            onEditRow={handleEditRow}
            onDeleteRow={handleDeleteRow}
            className="cursor-pointer"
          />
        </div>
      )}

      {/* Pagination */}
      {!isEmpty && (
        <div className="flex justify-end mt-6 w-full">
          <div className="w-fit">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange || (() => {})}
            />
          </div>
        </div>
      )}
    </div>
  );
}
