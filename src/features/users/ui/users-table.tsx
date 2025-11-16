"use client";

import * as React from "react";

import { Check, ChevronDown, Printer, Upload } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { DataTable } from "@/shared/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Pagination } from "@/shared/ui/pagination";

import { useUsersTable } from "../hooks/use-users-table";
import { mockUsers } from "../mocks/users.mock";
import { UsersTableProps } from "../types/user.types";

// columns type and logic are encapsulated in useUsersTable

export default function UsersTable({
  data = mockUsers,
  onSaveRow,
  onPageChange,
  currentPage = 1,
  totalPages: _totalPages = 1,
}: UsersTableProps) {
  const [zoom, setZoom] = React.useState<number>(100);

  const {
    columns,
    toggleColumnVisibility,
    currentPageData,
    calculatedTotalPages,
    handleSaveRow,
    handleEditRow,
    handleDeleteRow,
    handleViewRow,
    handlePageChange,
    isEmpty,
    currentPage: currentPageFromHook,
  } = useUsersTable({ data, onSaveRow, onPageChange, currentPage });

  return (
    <div className="bg-white rounded-2xl p-6 mt-5">
      {/* Top Actions Bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          {/* Columns dropdown */}
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
                {zoom}%
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setZoom(50)}>
                50%
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setZoom(75)}>
                75%
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setZoom(100)}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setZoom(125)}>
                125%
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setZoom(150)}>
                150%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4">
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
        </div>
      </div>

      {/* DataTable */}
      {isEmpty ? (
        <div className="flex items-center justify-center py-10 text-gray-500">
          Nothing found
        </div>
      ) : (
        <div className="w-full">
          <DataTable
            data={currentPageData}
            columns={columns.filter(col => col.visible)}
            idField="id"
            enableEditOnDoubleClick={false}
            fontSize={
              zoom <= 60
                ? "xs"
                : zoom <= 85
                  ? "sm"
                  : zoom <= 110
                    ? "base"
                    : zoom <= 135
                      ? "lg"
                      : "xl"
            }
            onSaveRow={handleSaveRow}
            onViewRow={handleViewRow}
            onEditRow={handleEditRow}
            onDeleteRow={handleDeleteRow}
            className="cursor-pointer"
          />
        </div>
      )}

      {/* Pagination */}
      {!isEmpty && (
        <div className="flex justify-end mt-6 w-full">
          <div className="w-fit">
            <Pagination
              currentPage={currentPageFromHook}
              totalPages={calculatedTotalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
