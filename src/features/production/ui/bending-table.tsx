"use client";

import React, { useState } from "react";

import {
  Check,
  ChevronDown,
  FileText,
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

import AddServiceDialog, { AddServiceDialogData } from "./add-service-dialog";
import EditDialog, { EditDialogData } from "./edit-dialog";
import InvoiceApplicationDialog, {
  InvoiceApplicationDialogData,
} from "./invoice-application-dialog";

// Types for bending table
export interface BendingItem {
  id: string;
  creationDate: string;
  processingStartDate: string;
  drawing: string;
  metalType: string;
  plannedBends: number;
  actualBends: number;
  startTime: string;
  endTime: string;
  technologistComment: string;
}

export interface BendingColumn {
  key: keyof BendingItem;
  label: string;
  visible: boolean;
  sortable?: boolean;
  width?: string;
  type?: "text" | "date" | "select" | "number";
  options?: { value: string; label: string }[];
  render?: (value: string | number, row: BendingItem) => React.ReactNode;
}

// Mock data for bending table
const mockBending: BendingItem[] = [
  {
    id: "1",
    creationDate: "12/06/2020",
    processingStartDate: "12/06/2020",
    drawing: "100087-000019-9",
    metalType: "н/ж: 504 28 [мат) 6,00 mm",
    plannedBends: 826,
    actualBends: 540,
    startTime: "09:13:55",
    endTime: "08:57:36",
    technologistComment: "Lorem ipsum dolor sit ame...",
  },
  {
    id: "2",
    creationDate: "28/10/2012",
    processingStartDate: "28/10/2012",
    drawing: "100087-000020-1",
    metalType: "н/ж: 504 28 [мат) 6,00 mm",
    plannedBends: 447,
    actualBends: 536,
    startTime: "09:07:31",
    endTime: "08:59:24",
    technologistComment: "Lorem ipsum dolor sit ame...",
  },
  {
    id: "3",
    creationDate: "16/08/2013",
    processingStartDate: "16/08/2013",
    drawing: "100087-000011-1",
    metalType: "н/ж: 504 28 [мат) 6,00 mm",
    plannedBends: 922,
    actualBends: 703,
    startTime: "09:55:55",
    endTime: "09:07:31",
    technologistComment: "Lorem ipsum dolor sit ame...",
  },
  {
    id: "4",
    creationDate: "05/12/2014",
    processingStartDate: "05/12/2014",
    drawing: "100087-000012-2",
    metalType: "н/ж: 504 28 [мат) 6,00 mm",
    plannedBends: 154,
    actualBends: 423,
    startTime: "08:45:12",
    endTime: "09:20:33",
    technologistComment: "Lorem ipsum dolor sit ame...",
  },
  {
    id: "5",
    creationDate: "22/07/2015",
    processingStartDate: "22/07/2015",
    drawing: "100087-000013-3",
    metalType: "н/ж: 504 28 [мат) 6,00 mm",
    plannedBends: 177,
    actualBends: 274,
    startTime: "09:30:45",
    endTime: "08:15:22",
    technologistComment: "Lorem ipsum dolor sit ame...",
  },
  {
    id: "6",
    creationDate: "14/06/2016",
    processingStartDate: "14/06/2016",
    drawing: "100087-000014-4",
    metalType: "н/ж: 504 28 [мат) 6,00 mm",
    plannedBends: 423,
    actualBends: 816,
    startTime: "08:22:18",
    endTime: "09:45:07",
    technologistComment: "Lorem ipsum dolor sit ame...",
  },
  {
    id: "7",
    creationDate: "30/01/2017",
    processingStartDate: "30/01/2017",
    drawing: "100087-000015-5",
    metalType: "н/ж: 504 28 [мат) 6,00 mm",
    plannedBends: 429,
    actualBends: 177,
    startTime: "09:05:33",
    endTime: "08:38:44",
    technologistComment: "Lorem ipsum dolor sit ame...",
  },
  {
    id: "8",
    creationDate: "18/04/2018",
    processingStartDate: "18/04/2018",
    drawing: "100087-000016-6",
    metalType: "н/ж: 504 28 [мат) 6,00 mm",
    plannedBends: 447,
    actualBends: 540,
    startTime: "08:50:27",
    endTime: "09:12:15",
    technologistComment: "Lorem ipsum dolor sit ame...",
  },
  {
    id: "9",
    creationDate: "09/08/2019",
    processingStartDate: "09/08/2019",
    drawing: "100087-000017-7",
    metalType: "н/ж: 504 28 [мат) 6,00 mm",
    plannedBends: 123,
    actualBends: 234,
    startTime: "09:15:42",
    endTime: "08:25:19",
    technologistComment: "Lorem ipsum dolor sit ame...",
  },
  {
    id: "10",
    creationDate: "25/11/2020",
    processingStartDate: "25/11/2020",
    drawing: "100087-000018-8",
    metalType: "н/ж: 504 28 [мат) 6,00 mm",
    plannedBends: 567,
    actualBends: 345,
    startTime: "08:40:56",
    endTime: "09:35:28",
    technologistComment: "Lorem ipsum dolor sit ame...",
  },
  {
    id: "11",
    creationDate: "12/02/2021",
    processingStartDate: "12/02/2021",
    drawing: "100087-000021-10",
    metalType: "н/ж: 504 28 [мат) 6,00 mm",
    plannedBends: 789,
    actualBends: 456,
    startTime: "09:25:14",
    endTime: "08:18:37",
    technologistComment: "Lorem ipsum dolor sit ame...",
  },
  {
    id: "12",
    creationDate: "03/05/2022",
    processingStartDate: "03/05/2022",
    drawing: "100087-000022-11",
    metalType: "н/ж: 504 28 [мат) 6,00 mm",
    plannedBends: 234,
    actualBends: 567,
    startTime: "08:33:29",
    endTime: "09:48:52",
    technologistComment: "Lorem ipsum dolor sit ame...",
  },
  {
    id: "13",
    creationDate: "17/09/2023",
    processingStartDate: "17/09/2023",
    drawing: "100087-000023-12",
    metalType: "н/ж: 504 28 [мат) 6,00 mm",
    plannedBends: 678,
    actualBends: 123,
    startTime: "09:42:08",
    endTime: "08:55:41",
    technologistComment: "Lorem ipsum dolor sit ame...",
  },
  {
    id: "14",
    creationDate: "08/12/2023",
    processingStartDate: "08/12/2023",
    drawing: "100087-000024-13",
    metalType: "н/ж: 504 28 [мат) 6,00 mm",
    plannedBends: 345,
    actualBends: 678,
    startTime: "08:28:16",
    endTime: "09:22:33",
    technologistComment: "Lorem ipsum dolor sit ame...",
  },
];

// Column definitions for bending table
const bendingColumns: BendingColumn[] = [
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
    key: "drawing",
    label: "Креслення",
    visible: true,
    sortable: true,
    width: "200px",
    type: "text",
    render: (value: string | number) => (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-gray-500" />
        <span className="text-sm">{value}</span>
      </div>
    ),
  },
  {
    key: "metalType",
    label: "Вид металу, товщ.",
    visible: true,
    sortable: false,
    width: "250px",
    type: "text",
  },
  {
    key: "plannedBends",
    label: "Кількість загинів, шт.",
    visible: true,
    sortable: true,
    width: "160px",
    type: "number",
  },
  {
    key: "actualBends",
    label: "Кількість загинів факт, шт.",
    visible: true,
    sortable: true,
    width: "180px",
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
    label: "Час закінчення вик.",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "technologistComment",
    label: "Коментар технолога",
    visible: true,
    sortable: false,
    width: "200px",
    type: "text",
  },
];

export default function BendingTable() {
  const [columns, setColumns] = useState<BendingColumn[]>(bendingColumns);
  const [data] = useState<BendingItem[]>(mockBending);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BendingItem | null>(null);
  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false);
  const [isInvoiceApplicationDialogOpen, setIsInvoiceApplicationDialogOpen] =
    useState(false);

  // Calculate total pages based on data length
  const totalPages = Math.ceil(data.length / pageSize);

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  const toggleColumnVisibility = (columnKey: keyof BendingItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleColumns: DataTableColumn<BendingItem>[] = columns
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

  const handleSaveRow = (_row: BendingItem) => {
    // TODO: Implement save row functionality
  };

  const handleEditRow = (row: BendingItem) => {
    setEditingItem(row);
    setIsEditDialogOpen(true);
  };

  const handleDeleteRow = (_row: BendingItem) => {
    // TODO: Implement delete row functionality
  };

  const handleSaveEdit = (_editData: EditDialogData) => {
    // TODO: Implement save edit functionality
  };

  const handleDeleteEdit = () => {
    if (editingItem) {
      // TODO: Implement delete functionality
    }
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingItem(null);
  };

  const handleAddService = () => {
    setIsAddServiceDialogOpen(true);
  };

  const handleSaveService = (_serviceData: AddServiceDialogData) => {
    // TODO: Implement save service functionality
  };

  const handleDeleteService = () => {
    // TODO: Implement delete service functionality
  };

  const handleCloseAddServiceDialog = () => {
    setIsAddServiceDialogOpen(false);
  };

  const handleInvoiceApplication = () => {
    setIsInvoiceApplicationDialogOpen(true);
  };

  const handleSaveInvoiceApplication = (
    _invoiceData: InvoiceApplicationDialogData
  ) => {
    // TODO: Implement save invoice application functionality
  };

  const handleDeleteInvoiceApplication = () => {
    // TODO: Implement delete invoice application functionality
  };

  const handleCloseInvoiceApplicationDialog = () => {
    setIsInvoiceApplicationDialogOpen(false);
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
          <Button
            variant="blue"
            size="lg"
            className="h-[42px]"
            onClick={handleAddService}>
            <SquarePlus className="h-4 w-4" />
            Додати послугу
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-[42px]"
            onClick={handleInvoiceApplication}>
            Заявка на рахунок
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

      {/* Edit Dialog */}
      <EditDialog
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        onSave={handleSaveEdit}
        onDelete={handleDeleteEdit}
        title="Редагувати"
      />

      {/* Add Service Dialog */}
      <AddServiceDialog
        isOpen={isAddServiceDialogOpen}
        onClose={handleCloseAddServiceDialog}
        onSave={handleSaveService}
        onDelete={handleDeleteService}
        title="Додати послугу"
      />

      {/* Invoice Application Dialog */}
      <InvoiceApplicationDialog
        isOpen={isInvoiceApplicationDialogOpen}
        onClose={handleCloseInvoiceApplicationDialog}
        onSave={handleSaveInvoiceApplication}
        onDelete={handleDeleteInvoiceApplication}
        title="Заявка на рахунок"
      />
    </div>
  );
}
