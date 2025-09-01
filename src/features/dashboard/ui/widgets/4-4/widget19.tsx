"use client";

import React from "react";

import { MoreHorizontal } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

// Default size for this widget
export const defaultSize = { w: 4, h: 4 };

// Mock data for calculations
const calculations = [
  {
    id: 1,
    date: "10.10.2025",
    calculationNo: "1865682",
    counterparty: 'ТОВ "Базис"',
    amount: "129,000",
  },
  {
    id: 2,
    date: "10.10.2025",
    calculationNo: "1865682",
    counterparty: 'ТОВ "Базис"',
    amount: "129,000",
  },
  {
    id: 3,
    date: "10.10.2025",
    calculationNo: "1865682",
    counterparty: 'ТОВ "Базис"',
    amount: "129,000",
  },
  {
    id: 4,
    date: "10.10.2025",
    calculationNo: "1865682",
    counterparty: 'ТОВ "Базис"',
    amount: "129,000",
  },
  {
    id: 5,
    date: "10.10.2025",
    calculationNo: "1865682",
    counterparty: 'ТОВ "Базис"',
    amount: "129,000",
  },
  {
    id: 6,
    date: "10.10.2025",
    calculationNo: "1865682",
    counterparty: 'ТОВ "Базис"',
    amount: "129,000",
  },
  {
    id: 7,
    date: "10.10.2025",
    calculationNo: "1865682",
    counterparty: 'ТОВ "Базис"',
    amount: "129,000",
  },
  {
    id: 8,
    date: "10.10.2025",
    calculationNo: "1865682",
    counterparty: 'ТОВ "Базис"',
    amount: "129,000",
  },
  {
    id: 9,
    date: "10.10.2025",
    calculationNo: "1865682",
    counterparty: 'ТОВ "Базис"',
    amount: "129,000",
  },
  {
    id: 10,
    date: "10.10.2025",
    calculationNo: "1865682",
    counterparty: 'ТОВ "Базис"',
    amount: "129,000",
  },
  {
    id: 11,
    date: "10.10.2025",
    calculationNo: "1865682",
    counterparty: 'ТОВ "Базис"',
    amount: "129,000",
  },
  {
    id: 12,
    date: "10.10.2025",
    calculationNo: "1865682",
    counterparty: 'ТОВ "Базис"',
    amount: "120.000",
  },
];

export default function Widget19() {
  return (
    <div className="flex flex-col p-4 h-full w-full bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#3A4754]">Прорахунки</h3>
        <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
          <MoreHorizontal className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-sm font-medium text-gray-500 py-3">
                ДАТА
              </TableHead>
              <TableHead className="text-sm font-medium text-gray-500 py-3">
                № ПРОРАХУНКУ
              </TableHead>
              <TableHead className="text-sm font-medium text-gray-500 py-3">
                КОНТРАГЕНТ
              </TableHead>
              <TableHead className="text-sm font-medium text-gray-500 py-3">
                СУМА
              </TableHead>
              <TableHead className="text-sm font-medium text-gray-500 py-3 w-10">
                {/* Action column */}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calculations.map(calculation => (
              <TableRow
                key={calculation.id}
                className="border-b border-gray-100">
                <TableCell className="text-sm text-[#3A4754] py-3">
                  {calculation.date}
                </TableCell>
                <TableCell className="text-sm text-[#3A4754] py-3">
                  {calculation.calculationNo}
                </TableCell>
                <TableCell className="text-sm text-[#3A4754] py-3">
                  {calculation.counterparty}
                </TableCell>
                <TableCell className="text-sm text-[#3A4754] py-3">
                  {calculation.amount}
                </TableCell>
                <TableCell className="py-3">
                  <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
