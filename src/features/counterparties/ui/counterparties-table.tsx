"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { Check, ChevronDown, Printer, Upload } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import { mockCounterparties } from "../mocks/counterparties.mock";
import {
  CounterpartiesTableProps,
  CounterpartyItem,
} from "../types/counterparty.types";

interface ColumnConfig extends DataTableColumn<CounterpartyItem> {
  visible: boolean;
}

export default function CounterpartiesTable({
  data = mockCounterparties,
  onSaveRow,
  onPageChange,
  currentPage = 1,
  totalPages = 1,
}: CounterpartiesTableProps) {
  const router = useRouter();
  const [columns, setColumns] = React.useState<ColumnConfig[]>([
    {
      key: "creationDate",
      label: "Дата створення",
      sortable: true,
      width: "w-40",
      type: "date",
      visible: true,
    },
    {
      key: "name",
      label: "Назва",
      sortable: true,
      width: "w-48",
      type: "text",
      visible: true,
    },
    {
      key: "counterpartyId",
      label: "ID",
      sortable: false,
      width: "w-36",
      type: "text",
      visible: true,
    },
    {
      key: "comment",
      label: "Коментар",
      sortable: false,
      width: "w-64",
      type: "text",
      visible: true,
    },
  ]);

  const toggleColumnVisibility = (columnKey: string) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleSaveRow = (row: CounterpartyItem) => {
    if (onSaveRow) {
      onSaveRow(row);
    }
  };

  const handleEditRow = (row: CounterpartyItem) => {
    console.log("Edit counterparty:", row);
    // This will trigger edit mode in DataTable
  };

  const handleDeleteRow = (row: CounterpartyItem) => {
    console.log("Delete counterparty:", row);
    // Add confirmation dialog and delete logic here
  };

  const handleViewRow = (row: CounterpartyItem) => {
    router.push(`/dashboard/counterparties/${row.id}`);
  };

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
          router.push(`/dashboard/counterparties/${row.id}`);
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        className="cursor-pointer"
      />
    </div>
  );
}
