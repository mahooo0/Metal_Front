"use client";

import React from "react";

import { WriteOffStatus } from "@/service/write-offs.service";
import { format } from "date-fns";
import { CalendarIcon, Filter, Search, X } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import type { WriteOffFilterProps } from "../types/write-off-filter.types";

const STATUS_OPTIONS: { value: WriteOffStatus | ""; label: string }[] = [
  { value: "", label: "Всі статуси" },
  { value: "DRAFT", label: "Чернетка" },
  { value: "PENDING", label: "На розгляді" },
  { value: "COMPLETED", label: "Завершено" },
];

export default function WriteOffFilter({
  filterData,
  onSearchChange,
  onStatusChange,
  onDateFromChange,
  onDateToChange,
  onReset,
}: WriteOffFilterProps) {
  const dateFrom = filterData.dateFrom
    ? new Date(filterData.dateFrom)
    : undefined;
  const dateTo = filterData.dateTo ? new Date(filterData.dateTo) : undefined;

  const hasFilters =
    filterData.search ||
    filterData.status ||
    filterData.dateFrom ||
    filterData.dateTo;

  return (
    <div className="bg-white rounded-[16px] p-6 mt-5">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#3A4754]" />
          <Input
            placeholder="Шукати за номером"
            value={filterData.search}
            onChange={e => onSearchChange(e.target.value)}
            className="pl-10 bg-white border-[#C8CDD2] rounded-[48px] h-[42px]"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-[42px] w-[42px] rounded-full bg-[#3A4754] hover:bg-[#2A3A4A]">
          <Filter className="h-4 w-4 text-white" />
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 items-end">
        <div>
          <Label className="text-sm font-medium text-[#3A4754] mb-1 block">
            Статус
          </Label>
          <Select
            value={filterData.status}
            onValueChange={value =>
              onStatusChange(value as WriteOffStatus | "")
            }>
            <SelectTrigger className="!h-[48px] rounded-[48px] w-full border-[#C8CDD2]">
              <SelectValue placeholder="Оберіть статус" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map(option => (
                <SelectItem
                  key={option.value || "all"}
                  value={option.value || "all"}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-[#3A4754] mb-1 block">
            Дата від
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-[48px] w-full rounded-[48px] justify-start text-left font-normal border-[#C8CDD2]",
                  !dateFrom && "text-[#B6BDC3]"
                )}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFrom ? format(dateFrom, "dd.MM.yyyy") : "Оберіть дату"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateFrom}
                onSelect={date =>
                  onDateFromChange(date ? date.toISOString() : "")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label className="text-sm font-medium text-[#3A4754] mb-1 block">
            Дата до
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-[48px] w-full rounded-[48px] justify-start text-left font-normal border-[#C8CDD2]",
                  !dateTo && "text-[#B6BDC3]"
                )}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateTo ? format(dateTo, "dd.MM.yyyy") : "Оберіть дату"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateTo}
                onSelect={date =>
                  onDateToChange(date ? date.toISOString() : "")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {hasFilters && (
          <Button
            variant="outline"
            size="lg"
            onClick={onReset}
            className="h-[48px] px-6 bg-white border border-[#C8CDD2] text-[#3A4754] hover:bg-gray-50 gap-2">
            <X className="h-4 w-4" />
            Скинути
          </Button>
        )}
      </div>
    </div>
  );
}
