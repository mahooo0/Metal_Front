"use client";

import React, { useState } from "react";

import { ChevronDown, Plus } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";

import { mockProductionData } from "../mocks/production.mock";
import { ProductionColumn, ProductionItem } from "../types/production.types";

// Column definitions for new tasks table
const newTasksColumns: ProductionColumn[] = [
  {
    key: "creationDate",
    label: "Дата створення",
    visible: true,
    sortable: true,
    width: "120px",
    type: "date",
  },
  {
    key: "processingStartDate",
    label: "Дата поч. обробки",
    visible: true,
    sortable: true,
    width: "140px",
    type: "date",
  },
  {
    key: "orderNumber",
    label: "Номер замовлення",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "customer",
    label: "Замовник",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "customerOrderNumber",
    label: "Найменування уп",
    visible: true,
    sortable: true,
    width: "150px",
    type: "text",
  },
  {
    key: "activePlannedTime",
    label: "Активний пл. час, хв.",
    visible: true,
    sortable: true,
    width: "140px",
    type: "text",
  },
  {
    key: "activeActualTime",
    label: "Активний факт. час хв.",
    visible: true,
    sortable: true,
    width: "160px",
    type: "text",
  },
  {
    key: "startTime",
    label: "Час початку вик.",
    visible: true,
    sortable: true,
    width: "130px",
    type: "text",
  },
  {
    key: "endTime",
    label: "Час зак.вик.",
    visible: true,
    sortable: true,
    width: "120px",
    type: "text",
  },
  {
    key: "comment",
    label: "Коментар",
    visible: true,
    sortable: false,
    width: "150px",
    type: "text",
  },
];

export default function NewTasksAccordionTable() {
  const [columns, setColumns] = useState<ProductionColumn[]>(newTasksColumns);
  const [data] = useState<ProductionItem[]>(mockProductionData.slice(0, 7)); // Only first 7 items for new tasks

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
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="new-tasks" className="border-none">
          {/* Header with controls */}
          <AccordionTrigger
            showIcon={false}
            className="flex group items-center justify-between p-4 border-b gap-2 hover:no-underline">
            <h2 className="text-lg font-semibold text-[#3A4754]">
              Нові задачі
            </h2>
            <div className="flex items-center gap-2">
              <p>згорнути</p>
              <Button
                variant="balck"
                size="icon"
                className="w-9 h-9 rounded-full group-data-[state=open]:rotate-180">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </AccordionTrigger>

          <AccordionContent className="p-0">
            {/* Table */}
            <div className="max-w-[92vw] overflow-x-auto">
              <DataTable
                data={data}
                columns={visibleColumns}
                idField="id"
                onSaveRow={handleSaveRow}
                onEditRow={handleEditRow}
                onDeleteRow={handleDeleteRow}
                className="rounded-none"
                showActionsColumn={false}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
