"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { Check, ChevronDown, Printer, Upload } from "lucide-react";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import { mockCounterpartyOrders } from "../mocks/counterparty-orders.mock";
import {
  CounterpartyOrder,
  CounterpartyOrdersTableProps,
} from "../types/counterparty.types";

interface ColumnConfig extends DataTableColumn<CounterpartyOrder> {
  visible: boolean;
}

const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case "Планування":
      return "bg-pink-100 text-pink-800";
    case "У процесі":
      return "bg-green-100 text-green-800";
    case "Прорахунок":
      return "bg-blue-100 text-blue-800";
    case "На розгляді":
      return "bg-blue-100 text-blue-800";
    case "Запуск":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function CounterpartyOrdersTable({
  data = mockCounterpartyOrders,
  onSaveRow,
  onPageChange,
  currentPage = 1,
  totalPages = 1,
}: CounterpartyOrdersTableProps) {
  const router = useRouter();
  const [columns, setColumns] = React.useState<ColumnConfig[]>([
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
      render: value => {
        return (
          <Badge
            className={`${getStatusBadgeStyle(value as string)} rounded-full px-3 py-1 text-xs font-medium`}>
            {value}
          </Badge>
        );
      },
    },
  ]);

  const toggleColumnVisibility = (columnKey: string) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleSaveRow = (row: CounterpartyOrder) => {
    if (onSaveRow) {
      onSaveRow(row);
    }
  };

  const handleEditRow = (row: CounterpartyOrder) => {
    console.log("Edit order:", row);
    // This will trigger edit mode in DataTable
  };

  const handleDeleteRow = (row: CounterpartyOrder) => {
    console.log("Delete order:", row);
    // Add confirmation dialog and delete logic here
  };

  const handleViewRow = (row: CounterpartyOrder) => {
    router.push(`/dashboard/order/${row.id}`);
  };
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] font-bold text-[#3A4754]">
          Замовлення контрагента
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="bg-white w-[36px] h-[36px] rounded-full border border-[#B6BDC3] text-[#495969]">
          <Check size={20} />
        </Button>
      </div>

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
      <DataTable
        data={data}
        columns={columns.filter(col => col.visible)}
        idField="id"
        onSaveRow={handleSaveRow}
        onPageChange={onPageChange}
        onViewRow={handleViewRow}
        onEditRow={handleEditRow}
        onDeleteRow={handleDeleteRow}
        onRowDoubleClick={row => {
          router.push(`/dashboard/order/${row.id}`);
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        className="cursor-pointer"
      />
    </div>
  );
}
