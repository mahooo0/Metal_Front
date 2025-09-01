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

// Mock data for current tasks
const tasks = [
  {
    id: 1,
    name: "Прорахунок",
    orderNo: "1865682",
    status: "У процесі",
    statusColor: "#64C4AA",
    date: "10.10.2025",
  },
  {
    id: 2,
    name: "Прорахунок",
    orderNo: "1865682",
    status: "На розгляді",
    statusColor: "#30B2D5",
    date: "10.10.2025",
  },
  {
    id: 3,
    name: "Прорахунок",
    orderNo: "1865682",
    status: "Планування",
    statusColor: "#CE70D8",
    date: "10.10.2025",
  },
  {
    id: 4,
    name: "Прорахунок",
    orderNo: "1865682",
    status: "Пауза",
    statusColor: "#FE8867",
    date: "10.10.2025",
  },
  {
    id: 5,
    name: "Прорахунок",
    orderNo: "1865682",
    status: "Завершено",
    statusColor: "#64C4AA",
    date: "10.10.2025",
  },
  {
    id: 6,
    name: "Прорахунок",
    orderNo: "1865682",
    status: "Скасовано",
    statusColor: "#64C4AA",
    date: "10.10.2025",
  },
  {
    id: 7,
    name: "Прорахунок",
    orderNo: "1865682",
    status: "Виконано",
    statusColor: "#30B2D5",
    date: "10.10.2025",
  },
  {
    id: 8,
    name: "Прорахунок",
    orderNo: "1865682",
    status: "В очікуванні",
    statusColor: "#CE70D8",
    date: "10.10.2025",
  },
];

export default function Widget18() {
  return (
    <div className="flex flex-col p-4 h-full w-full bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#3A4754]">Поточні задачі</h3>
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
                НАЗВА
              </TableHead>
              <TableHead className="text-sm font-medium text-gray-500 py-3">
                № ЗАКАЗУ
              </TableHead>
              <TableHead className="text-sm font-medium text-gray-500 py-3">
                СТАТУС
              </TableHead>
              <TableHead className="text-sm font-medium text-gray-500 py-3">
                ДАТА
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map(task => (
              <TableRow key={task.id} className="border-b border-gray-100">
                <TableCell className="text-sm text-[#3A4754] py-3">
                  {task.name}
                </TableCell>
                <TableCell className="text-sm text-[#3A4754] py-3">
                  {task.orderNo}
                </TableCell>
                <TableCell className="py-3">
                  <span
                    className="inline-flex px-3 py-1 text-xs font-medium rounded-full"
                    style={{
                      backgroundColor: `${task.statusColor}20`,
                      color: task.statusColor,
                    }}>
                    {task.status}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-[#3A4754] py-3">
                  {task.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
