"use client";

import React from "react";

import { Button } from "@/shared/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

export default function AdditionalServicesTable() {
  return (
    <div className="max-w-full bg-white rounded-[16px] mt-5 overflow-hidden shadow-md">
      <div className="flex  justify-between p-4 py-5 gap-[38px]">
        {/* Simple Table */}
        <div className="flex-1 rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-100">
                <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                  Ціну запросив
                </TableHead>
                <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                  Ціну видав
                </TableHead>
                <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                  Дата запросу
                </TableHead>
                <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                  Дата видачі
                </TableHead>
                <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                  Всього
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-gray-100 hover:bg-gray-50">
                <TableCell className="px-6 py-4 text-sm shadow-xs">
                  <span className="text-sm text-gray-900">Шевченко В.М.</span>
                </TableCell>
                <TableCell className="px-6 py-4 text-sm shadow-xs">
                  <span className="text-sm text-gray-900">Семененко Ф.А.</span>
                </TableCell>
                <TableCell className="px-6 py-4 text-sm shadow-xs">
                  <span className="text-sm text-gray-900">15/08/2017</span>
                </TableCell>
                <TableCell className="px-6 py-4 text-sm shadow-xs">
                  <span className="text-sm text-gray-900">16/08/2013</span>
                </TableCell>
                <TableCell className="px-6 bg-[#EBFBFF] py-4 text-sm shadow-xs">
                  <span className="text-sm text-gray-900">4 5678 8890</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Button on the right side */}
        <div className="ml-4">
          <Button variant="balck" size="lg" className="h-[42px] w-[290px]">
            Запросити дод. послуги
          </Button>
        </div>
      </div>
    </div>
  );
}
