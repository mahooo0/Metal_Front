"use client";

import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

export default function ApplicationPostTable() {
  return (
    <div className="max-w-full bg-white rounded-[16px] mt-5 overflow-hidden shadow-md">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-[#3A4754] mb-4">
          Заявка на рахунок (послідовність)
        </h2>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-100">
              <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                Найменування матеріалу що був використаний
              </TableHead>
              <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                Розрахункова вага деталей, кг
              </TableHead>
              <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                Площа рорахункова, м.кв.
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-gray-100 hover:bg-gray-50">
              <TableCell className="px-6 py-4 text-sm shadow-xs">
                <span className="text-sm text-gray-900">
                  н/ж: 504 28 [мат) 6,00 mm
                </span>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm shadow-xs">
                <span className="text-sm text-gray-900">196 68934</span>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm shadow-xs">
                <span className="text-sm text-gray-900">6535188766</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
