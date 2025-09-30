"use client";

import React, { useState } from "react";

import {
  Check,
  ChevronDown,
  MoreVertical,
  Printer,
  SquarePlus,
  Upload,
} from "lucide-react";

import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Pagination } from "@/shared/ui/pagination";

// Types for production table
export interface ProductionItem {
  id: string;
  creationDate: string;
  processingStartDate: string;
  unitName: string;
  activePlannedTime: number;
  activeActualTime: number;
  startTime: string;
  endTime: string;
  comment: string;
  hasBending: string;
}

export interface ProductionColumn {
  key: keyof ProductionItem;
  label: string;
  visible: boolean;
  sortable?: boolean;
  width?: string;
  type?: "text" | "date" | "select" | "number";
  options?: { value: string; label: string }[];
}

// Mock data for production
const mockProduction: ProductionItem[] = [
  {
    id: "1",
    creationDate: "12/06/2020",
    processingStartDate: "12/06/2020",
    unitName: "100087-000019-9",
    activePlannedTime: 826,
    activeActualTime: 540,
    startTime: "09:13:55",
    endTime: "08:57:36",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    hasBending: "Hi",
  },
  {
    id: "2",
    creationDate: "28/10/2012",
    processingStartDate: "28/10/2012",
    unitName: "100087-000020-1",
    activePlannedTime: 447,
    activeActualTime: 536,
    startTime: "09:07:31",
    endTime: "08:59:24",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    hasBending: "Так",
  },
  {
    id: "3",
    creationDate: "16/08/2013",
    processingStartDate: "16/08/2013",
    unitName: "100087-000011-1",
    activePlannedTime: 922,
    activeActualTime: 703,
    startTime: "08:57:36",
    endTime: "09:13:55",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    hasBending: "Hi",
  },
  {
    id: "4",
    creationDate: "05/12/2014",
    processingStartDate: "05/12/2014",
    unitName: "100087-000012-2",
    activePlannedTime: 154,
    activeActualTime: 423,
    startTime: "08:45:12",
    endTime: "09:20:33",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    hasBending: "Так",
  },
  {
    id: "5",
    creationDate: "22/07/2015",
    processingStartDate: "22/07/2015",
    unitName: "100087-000013-3",
    activePlannedTime: 177,
    activeActualTime: 274,
    startTime: "09:30:45",
    endTime: "08:15:22",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    hasBending: "Hi",
  },
  {
    id: "6",
    creationDate: "14/06/2016",
    processingStartDate: "14/06/2016",
    unitName: "100087-000014-4",
    activePlannedTime: 423,
    activeActualTime: 816,
    startTime: "08:22:18",
    endTime: "09:45:07",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    hasBending: "Так",
  },
  {
    id: "7",
    creationDate: "30/01/2017",
    processingStartDate: "30/01/2017",
    unitName: "100087-000015-5",
    activePlannedTime: 429,
    activeActualTime: 177,
    startTime: "09:05:33",
    endTime: "08:38:44",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    hasBending: "Hi",
  },
  {
    id: "8",
    creationDate: "18/04/2018",
    processingStartDate: "18/04/2018",
    unitName: "100087-000016-6",
    activePlannedTime: 447,
    activeActualTime: 540,
    startTime: "08:50:27",
    endTime: "09:12:15",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    hasBending: "Так",
  },
  {
    id: "9",
    creationDate: "09/08/2019",
    processingStartDate: "09/08/2019",
    unitName: "100087-000017-7",
    activePlannedTime: 123,
    activeActualTime: 234,
    startTime: "09:15:42",
    endTime: "08:25:19",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    hasBending: "Hi",
  },
  {
    id: "10",
    creationDate: "25/11/2020",
    processingStartDate: "25/11/2020",
    unitName: "100087-000018-8",
    activePlannedTime: 567,
    activeActualTime: 345,
    startTime: "08:40:56",
    endTime: "09:35:28",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    hasBending: "Так",
  },
  {
    id: "11",
    creationDate: "12/02/2021",
    processingStartDate: "12/02/2021",
    unitName: "100087-000021-10",
    activePlannedTime: 789,
    activeActualTime: 456,
    startTime: "09:25:14",
    endTime: "08:18:37",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    hasBending: "Hi",
  },
  {
    id: "12",
    creationDate: "03/05/2022",
    processingStartDate: "03/05/2022",
    unitName: "100087-000022-11",
    activePlannedTime: 234,
    activeActualTime: 567,
    startTime: "08:33:29",
    endTime: "09:48:52",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    hasBending: "Так",
  },
  {
    id: "13",
    creationDate: "17/09/2023",
    processingStartDate: "17/09/2023",
    unitName: "100087-000023-12",
    activePlannedTime: 678,
    activeActualTime: 123,
    startTime: "09:42:08",
    endTime: "08:55:41",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    hasBending: "Hi",
  },
  {
    id: "14",
    creationDate: "08/12/2023",
    processingStartDate: "08/12/2023",
    unitName: "100087-000024-13",
    activePlannedTime: 345,
    activeActualTime: 678,
    startTime: "08:28:16",
    endTime: "09:22:33",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    hasBending: "Так",
  },
  {
    id: "15",
    creationDate: "21/03/2024",
    processingStartDate: "21/03/2024",
    unitName: "100087-000025-14",
    activePlannedTime: 456,
    activeActualTime: 234,
    startTime: "09:18:47",
    endTime: "08:41:25",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    hasBending: "Hi",
  },
];

// Column definitions for production
const productionColumns: ProductionColumn[] = [
  {
    key: "creationDate",
    label: "↑↓ Дата створення",
    visible: true,
    sortable: true,
    width: "150px",
    type: "date",
  },
  {
    key: "processingStartDate",
    label: "↑↓ Дата початку обробки",
    visible: true,
    sortable: true,
    width: "180px",
    type: "date",
  },
  {
    key: "unitName",
    label: "Найменування уп",
    visible: true,
    sortable: true,
    width: "200px",
    type: "text",
  },
  {
    key: "activePlannedTime",
    label: "Ативний пл. час, хв.",
    visible: true,
    sortable: true,
    width: "150px",
    type: "number",
  },
  {
    key: "activeActualTime",
    label: "Активний факт. час хв.",
    visible: true,
    sortable: true,
    width: "160px",
    type: "number",
  },
  {
    key: "startTime",
    label: "Час початку вик.",
    visible: true,
    sortable: true,
    width: "140px",
    type: "text",
  },
  {
    key: "endTime",
    label: "Час зак.вик.",
    visible: true,
    sortable: true,
    width: "130px",
    type: "text",
  },
  {
    key: "comment",
    label: "Коментар",
    visible: true,
    sortable: false,
    width: "300px",
    type: "text",
  },
  {
    key: "hasBending",
    label: "Наявність гнуття",
    visible: true,
    sortable: true,
    width: "140px",
    type: "select",
    options: [
      { value: "Hi", label: "Hi" },
      { value: "Так", label: "Так" },
    ],
  },
];

export default function ProductionTable() {
  const [columns, setColumns] = useState<ProductionColumn[]>(productionColumns);
  const [data] = useState<ProductionItem[]>(mockProduction);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Calculate total pages based on data length
  const totalPages = Math.ceil(data.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof ProductionItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<ProductionItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
      options: col.options,
    }));

  const handleSaveRow = (_row: ProductionItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (_row: ProductionItem) => {
    // This will trigger edit mode in DataTable
  };

  const handleDeleteRow = (_row: ProductionItem) => {
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
            Додати задачу
          </Button>
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
