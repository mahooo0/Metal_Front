"use client";

import React, { useState } from "react";

import {
  Check,
  ChevronDown,
  FileText,
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

// Types for hydraulic table
export interface HydraulicItem {
  id: string;
  creationDate: string;
  processingStartDate: string;
  processingEndDate: string;
  layoutName: string;
  startTime: string;
  endTime: string;
  activePlannedTime: number;
  actualCuttingTime: number;
  cutQuality: number;
  technologistComment: string;
  files: string;
}

export interface HydraulicColumn {
  key: keyof HydraulicItem;
  label: string;
  visible: boolean;
  sortable?: boolean;
  width?: string;
  type?: "text" | "date" | "select" | "number";
  options?: { value: string; label: string }[];
  render?: (value: any, row: HydraulicItem) => React.ReactNode;
}

// Mock data for hydraulic table
const mockHydraulic: HydraulicItem[] = [
  {
    id: "1",
    creationDate: "12/06/2020",
    processingStartDate: "12/06/2020",
    processingEndDate: "12/06/2020",
    layoutName: "8_016_13333-01 продов...",
    startTime: "09:13:55",
    endTime: "08:57:36",
    activePlannedTime: 826,
    actualCuttingTime: 826,
    cutQuality: 540,
    technologistComment: "Lorem ipsum...",
    files: "Kyle",
  },
  {
    id: "2",
    creationDate: "28/10/2012",
    processingStartDate: "28/10/2012",
    processingEndDate: "28/10/2012",
    layoutName: "8_016_13334-02 продов...",
    startTime: "09:07:31",
    endTime: "08:59:24",
    activePlannedTime: 447,
    actualCuttingTime: 536,
    cutQuality: 536,
    technologistComment: "Lorem ipsum...",
    files: "Ann",
  },
  {
    id: "3",
    creationDate: "16/08/2013",
    processingStartDate: "16/08/2013",
    processingEndDate: "16/08/2013",
    layoutName: "8_016_13335-03 продов...",
    startTime: "08:57:36",
    endTime: "09:13:55",
    activePlannedTime: 922,
    actualCuttingTime: 703,
    cutQuality: 703,
    technologistComment: "Lorem ipsum...",
    files: "Max",
  },
  {
    id: "4",
    creationDate: "05/12/2014",
    processingStartDate: "05/12/2014",
    processingEndDate: "05/12/2014",
    layoutName: "8_016_13336-04 продов...",
    startTime: "08:45:12",
    endTime: "09:20:33",
    activePlannedTime: 154,
    actualCuttingTime: 423,
    cutQuality: 423,
    technologistComment: "Lorem ipsum...",
    files: "Kyle",
  },
  {
    id: "5",
    creationDate: "22/07/2015",
    processingStartDate: "22/07/2015",
    processingEndDate: "22/07/2015",
    layoutName: "8_016_13337-05 продов...",
    startTime: "09:30:45",
    endTime: "08:15:22",
    activePlannedTime: 177,
    actualCuttingTime: 274,
    cutQuality: 274,
    technologistComment: "Lorem ipsum...",
    files: "Ann",
  },
  {
    id: "6",
    creationDate: "14/06/2016",
    processingStartDate: "14/06/2016",
    processingEndDate: "14/06/2016",
    layoutName: "8_016_13338-06 продов...",
    startTime: "08:22:18",
    endTime: "09:45:07",
    activePlannedTime: 423,
    actualCuttingTime: 816,
    cutQuality: 816,
    technologistComment: "Lorem ipsum...",
    files: "Max",
  },
  {
    id: "7",
    creationDate: "30/01/2017",
    processingStartDate: "30/01/2017",
    processingEndDate: "30/01/2017",
    layoutName: "8_016_13339-07 продов...",
    startTime: "09:05:33",
    endTime: "08:38:44",
    activePlannedTime: 429,
    actualCuttingTime: 177,
    cutQuality: 177,
    technologistComment: "Lorem ipsum...",
    files: "Kyle",
  },
  {
    id: "8",
    creationDate: "18/04/2018",
    processingStartDate: "18/04/2018",
    processingEndDate: "18/04/2018",
    layoutName: "8_016_13340-08 продов...",
    startTime: "08:50:27",
    endTime: "09:12:15",
    activePlannedTime: 447,
    actualCuttingTime: 540,
    cutQuality: 540,
    technologistComment: "Lorem ipsum...",
    files: "Ann",
  },
  {
    id: "9",
    creationDate: "09/08/2019",
    processingStartDate: "09/08/2019",
    processingEndDate: "09/08/2019",
    layoutName: "8_016_13341-09 продов...",
    startTime: "09:15:42",
    endTime: "08:25:19",
    activePlannedTime: 123,
    actualCuttingTime: 234,
    cutQuality: 234,
    technologistComment: "Lorem ipsum...",
    files: "Max",
  },
  {
    id: "10",
    creationDate: "25/11/2020",
    processingStartDate: "25/11/2020",
    processingEndDate: "25/11/2020",
    layoutName: "8_016_13342-10 продов...",
    startTime: "08:40:56",
    endTime: "09:35:28",
    activePlannedTime: 567,
    actualCuttingTime: 345,
    cutQuality: 345,
    technologistComment: "Lorem ipsum...",
    files: "Kyle",
  },
  {
    id: "11",
    creationDate: "12/02/2021",
    processingStartDate: "12/02/2021",
    processingEndDate: "12/02/2021",
    layoutName: "8_016_13343-11 продов...",
    startTime: "09:25:14",
    endTime: "08:18:37",
    activePlannedTime: 789,
    actualCuttingTime: 456,
    cutQuality: 456,
    technologistComment: "Lorem ipsum...",
    files: "Ann",
  },
  {
    id: "12",
    creationDate: "03/05/2022",
    processingStartDate: "03/05/2022",
    processingEndDate: "03/05/2022",
    layoutName: "8_016_13344-12 продов...",
    startTime: "08:33:29",
    endTime: "09:48:52",
    activePlannedTime: 234,
    actualCuttingTime: 567,
    cutQuality: 567,
    technologistComment: "Lorem ipsum...",
    files: "Max",
  },
  {
    id: "13",
    creationDate: "17/09/2023",
    processingStartDate: "17/09/2023",
    processingEndDate: "17/09/2023",
    layoutName: "8_016_13345-13 продов...",
    startTime: "09:42:08",
    endTime: "08:55:41",
    activePlannedTime: 678,
    actualCuttingTime: 123,
    cutQuality: 123,
    technologistComment: "Lorem ipsum...",
    files: "Kyle",
  },
  {
    id: "14",
    creationDate: "08/12/2023",
    processingStartDate: "08/12/2023",
    processingEndDate: "08/12/2023",
    layoutName: "8_016_13346-14 продов...",
    startTime: "08:28:16",
    endTime: "09:22:33",
    activePlannedTime: 345,
    actualCuttingTime: 678,
    cutQuality: 678,
    technologistComment: "Lorem ipsum...",
    files: "Ann",
  },
  {
    id: "15",
    creationDate: "21/03/2024",
    processingStartDate: "21/03/2024",
    processingEndDate: "21/03/2024",
    layoutName: "8_016_13347-15 продов...",
    startTime: "09:18:47",
    endTime: "08:41:25",
    activePlannedTime: 456,
    actualCuttingTime: 234,
    cutQuality: 234,
    technologistComment: "Lorem ipsum...",
    files: "Max",
  },
];

// Column definitions for hydraulic table
const hydraulicColumns: HydraulicColumn[] = [
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
    key: "processingEndDate",
    label: "↑↓ Дата зав. обробки",
    visible: true,
    sortable: true,
    width: "160px",
    type: "date",
  },
  {
    key: "layoutName",
    label: "Найменування розкладки",
    visible: true,
    sortable: true,
    width: "200px",
    type: "text",
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
    label: "Час закінч. вик.",
    visible: true,
    sortable: true,
    width: "140px",
    type: "text",
  },
  {
    key: "activePlannedTime",
    label: "Активний плановий час",
    visible: true,
    sortable: true,
    width: "160px",
    type: "number",
  },
  {
    key: "actualCuttingTime",
    label: "Факт. час порізки, хв.",
    visible: true,
    sortable: true,
    width: "160px",
    type: "number",
  },
  {
    key: "cutQuality",
    label: "Якість різу",
    visible: true,
    sortable: true,
    width: "120px",
    type: "number",
  },
  {
    key: "technologistComment",
    label: "Коментар технолога",
    visible: true,
    sortable: false,
    width: "150px",
    type: "text",
  },
  {
    key: "files",
    label: "Файли",
    visible: true,
    sortable: false,
    width: "100px",
    type: "text",
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-gray-500" />
        <span className="text-sm">{value}</span>
      </div>
    ),
  },
];

export default function HydraulicTable() {
  const [columns, setColumns] = useState<HydraulicColumn[]>(hydraulicColumns);
  const [data] = useState<HydraulicItem[]>(mockHydraulic);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Calculate total pages based on data length
  const totalPages = Math.ceil(data.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof HydraulicItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<HydraulicItem>[] = columns
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      width: col.width,
      type: col.type,
      options: col.options,
      render: col.render,
    }));

  const handleSaveRow = (_row: HydraulicItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (_row: HydraulicItem) => {
    // This will trigger edit mode in DataTable
  };

  const handleDeleteRow = (_row: HydraulicItem) => {
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
