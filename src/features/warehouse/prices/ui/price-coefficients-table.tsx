"use client";

import React from "react";

import { ChevronDown, Pencil } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

export function PriceCoefficientsTable() {
  return (
    <div className="bg-white rounded-lg border border-[#E8EDF2] p-6">
      {/* Header with Select and Edit button */}
      <div className="flex justify-between gap-2 mb-4">
        <div className="rounded-2xl shadow-xl max-w-[1024px] overflow-hidden w-full">
          <Table>
            <TableHeader className="bg-[#EDEEF0]">
              <TableRow className="border-b border-[#E8EDF2] hover:bg-transparent">
                <TableHead className="text-left text-[#6D7A87] font-medium text-sm">
                  Кількість загинів, шт.
                </TableHead>
                <TableHead className="text-center text-[#6D7A87] font-medium text-sm">
                  1-10
                </TableHead>
                <TableHead className="text-center text-[#6D7A87] font-medium text-sm">
                  11-50
                </TableHead>
                <TableHead className="text-center text-[#6D7A87] font-medium text-sm">
                  51+
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-0 hover:bg-transparent">
                <TableCell className="text-[#3A4754] font-medium">
                  Коефіцієнт
                </TableCell>
                <TableCell className="text-center text-[#3A4754] font-medium">
                  2
                </TableCell>
                <TableCell className="text-center text-[#3A4754] font-medium">
                  1,5
                </TableCell>
                <TableCell className="text-center text-[#3A4754] font-medium">
                  1
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="flex gap-2">
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
            variant="ghost"
            size="icon"
            className="bg-white w-[36px] h-[36px] rounded-full border border-[#B6BDC3] text-[#495969]">
            <Pencil className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Дополнительные коэффициенты */}
      <div className="mt-6 space-y-3 grid grid-cols-3 gap-4">
        <div className="bg-[#E3F2FD] h-full rounded-xl p-4 flex items-center justify-between">
          <span className="text-[#3A4754] text-sm">
            Додатковий коефіцієнт на використання захисної плівки:
          </span>
          <span className="text-[#3A4754] text-lg font-semibold">1,3</span>
        </div>

        <div className="bg-[#E3F2FD] h-full rounded-xl p-4 flex items-center justify-between">
          <span className="text-[#3A4754] text-sm">
            Додатковий коефіцієнт складності (2 людини):
          </span>
          <span className="text-[#3A4754] text-lg font-semibold">1,5</span>
        </div>

        <div className="bg-[#E3F2FD] h-full rounded-xl p-4 flex items-center justify-between">
          <span className="text-[#3A4754] text-sm">
            Додатковий коефіцієнт складності (4 людини):
          </span>
          <span className="text-[#3A4754] text-lg font-semibold">3</span>
        </div>
      </div>
    </div>
  );
}
