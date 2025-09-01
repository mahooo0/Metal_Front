"use client";

import React from "react";

import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

import { TABLE_STATUS_CONFIG } from "../constants/table-statuses";
import { mockTableOrders } from "../mocks/table-orders.mock";
import { OrderTableColumn, OrderTableItem } from "../types/table.types";

interface OrdersTableProps {
  data?: OrderTableItem[];
}

const columns: OrderTableColumn[] = [
  { key: "date", label: "Дата", sortable: true, width: "w-32" },
  { key: "orderNumber", label: "№ замовлення", sortable: false, width: "w-36" },
  { key: "counterparty", label: "Котрагент", sortable: true, width: "w-48" },
  {
    key: "responsible",
    label: "Відповідальний",
    sortable: false,
    width: "w-40",
  },
  {
    key: "calculationDate",
    label: "Дата прорахунку",
    sortable: false,
    width: "w-40",
  },
  { key: "endDate", label: "Дата закінчення", sortable: false, width: "w-40" },
  { key: "status", label: "Статус", sortable: false, width: "w-32" },
];

export default function OrdersTable({
  data = mockTableOrders,
}: OrdersTableProps) {
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof OrderTableItem;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: keyof OrderTableItem) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const getSortIcon = (key: keyof OrderTableItem) => {
    if (sortConfig?.key !== key) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4 text-gray-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-gray-600" />
    );
  };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-100">
            {columns.map(column => (
              <TableHead
                key={column.key}
                className={`${column.width} px-6 py-4 text-left font-medium text-gray-900 bg-gray-50`}>
                <div className="flex items-center gap-2">
                  <span>{column.label}</span>
                  {column.sortable && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-gray-100"
                      onClick={() => handleSort(column.key)}>
                      {getSortIcon(column.key)}
                    </Button>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map(order => (
            <TableRow
              key={order.id}
              className="border-gray-100 hover:bg-gray-50">
              <TableCell className="px-6 py-4 text-sm text-gray-900">
                {order.date}
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-900 font-medium">
                {order.orderNumber}
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-900">
                {order.counterparty}
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-900">
                {order.responsible}
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-900">
                {order.calculationDate}
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-900">
                {order.endDate}
              </TableCell>
              <TableCell className="px-6 py-4">
                <Badge
                  variant="secondary"
                  className={`${TABLE_STATUS_CONFIG[order.status].color} rounded-full px-3 py-1 text-xs font-medium`}>
                  {TABLE_STATUS_CONFIG[order.status].label}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
