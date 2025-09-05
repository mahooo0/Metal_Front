"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { Badge } from "@/shared/ui/badge";
import { DataTable, DataTableColumn } from "@/shared/ui/data-table";

import { TABLE_STATUS_CONFIG } from "../../constants/table-statuses";
import { mockTableOrders } from "../../mocks/table-orders.mock";
import { OrderTableItem } from "../../types/table.types";

interface OrdersDataTableProps {
  data?: OrderTableItem[];
  onSaveRow?: (row: OrderTableItem) => void;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
}

type StatusKey = keyof typeof TABLE_STATUS_CONFIG;

export default function OrdersDataTable({
  data = mockTableOrders,
  onSaveRow,
  onPageChange,
  currentPage = 1,
  totalPages = 1,
}: OrdersDataTableProps) {
  const router = useRouter();

  const columns: DataTableColumn<OrderTableItem>[] = [
    {
      key: "date",
      label: "Дата",
      sortable: true,
      width: "w-32",
      type: "date",
    },
    {
      key: "orderNumber",
      label: "№ замовлення",
      sortable: false,
      width: "w-36",
      type: "text",
    },
    {
      key: "counterparty",
      label: "Котрагент",
      sortable: true,
      width: "w-48",
      type: "text",
    },
    {
      key: "responsible",
      label: "Відповідальний",
      sortable: false,
      width: "w-40",
      type: "text",
    },
    {
      key: "calculationDate",
      label: "Дата прорахунку",
      sortable: false,
      width: "w-40",
      type: "date",
    },
    {
      key: "endDate",
      label: "Дата закінчення",
      sortable: false,
      width: "w-40",
      type: "date",
    },
    {
      key: "status",
      label: "Статус",
      sortable: false,
      width: "w-32",
      type: "select",
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
  ];

  const handleSaveRow = (row: OrderTableItem) => {
    if (onSaveRow) {
      onSaveRow(row);
    }
  };

  const handleEditRow = (row: OrderTableItem) => {
    console.log("Edit row:", row);
    // This will trigger edit mode in DataTable
  };

  const handleDeleteRow = (row: OrderTableItem) => {
    console.log("Delete row:", row);
    // Add confirmation dialog and delete logic here
  };

  const handleViewRow = (row: OrderTableItem) => {
    router.push(`/dashboard/order/${row.id}`);
  };

  return (
    <DataTable
      data={data}
      columns={columns}
      idField="id"
      onSaveRow={handleSaveRow}
      onPageChange={onPageChange}
      onViewRow={handleViewRow}
      onEditRow={handleEditRow}
      onDeleteRow={handleDeleteRow}
      onRowDoubleClick={row => {
        // This will trigger edit mode
        console.log("Double clicked row:", row);
        // You can add custom logic here if needed
      }}
      currentPage={currentPage}
      totalPages={totalPages}
      className="cursor-pointer"
    />
  );
}
