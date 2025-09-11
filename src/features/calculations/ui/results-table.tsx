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

export default function ResultsTable() {
  return (
    <div className="max-w-full bg-white rounded-[16px] mt-5 overflow-hidden shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-[#3A4754]">Результати</h2>
      </div>
      <div className="max-w-[91vw] overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-100 text-nowrap">
              <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                Вага з розкладки
              </TableHead>
              <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                Матеріал товщина
              </TableHead>
              <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                Всього, довжина різ
              </TableHead>
              <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                Всього, Т.В.
              </TableHead>
              <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                Всього довжина різ
              </TableHead>
              <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                Ціна різу (М) грн/мп
              </TableHead>
              <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                Ціна різу (Х) грн/мп
              </TableHead>
              <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                Сума порізки (М)
              </TableHead>
              <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                Сума порізки (Х)
              </TableHead>
              <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                Всього факт. вага де
              </TableHead>
              <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                Всього розр. вага до
              </TableHead>
              <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                Сума металу
              </TableHead>
              <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                Сума гнуття
              </TableHead>
              <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                Всього сума (М)
              </TableHead>
              <TableHead className="p-4 text-left font-medium text-[#3A4754] bg-[#EDEEF0] shadow-xs">
                Всього сума (Х)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-gray-100 hover:bg-gray-50">
              <TableCell className="px-6 bg-[#EBFBFF] py-4 text-sm shadow-xs">
                <span className="text-sm text-gray-900">653518</span>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm shadow-xs">
                <span className="text-sm text-gray-900">653518</span>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm shadow-xs">
                <span className="text-sm text-gray-900">653518</span>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm shadow-xs">
                <span className="text-sm text-gray-900">653518</span>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm shadow-xs">
                <span className="text-sm text-gray-900">653518</span>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm shadow-xs">
                <span className="text-sm text-gray-900">653518</span>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm shadow-xs">
                <span className="text-sm text-gray-900">653518</span>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm shadow-xs">
                <span className="text-sm text-gray-900">653518</span>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm shadow-xs">
                <span className="text-sm text-gray-900">653518</span>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm shadow-xs">
                <span className="text-sm text-gray-900">653518</span>
              </TableCell>
              <TableCell className="px-6 bg-[#EBFBFF] py-4 text-sm shadow-xs">
                <span className="text-sm text-gray-900">653518</span>
              </TableCell>
              <TableCell className="px-6 bg-[#EBFBFF] py-4 text-sm shadow-xs">
                <span className="text-sm text-gray-900">653518</span>
              </TableCell>
              <TableCell className="px-6 bg-[#EBFBFF] py-4 text-sm shadow-xs">
                <span className="text-sm text-gray-900">653518</span>
              </TableCell>
              <TableCell className="px-6 bg-[#EBFBFF] py-4 text-sm shadow-xs">
                <span className="text-sm text-gray-900">653518</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
