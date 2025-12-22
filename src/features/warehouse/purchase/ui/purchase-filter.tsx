"use client";

import React, { useEffect, useState } from "react";

import { useSuppliers } from "@/hooks/use-suppliers";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { CalendarIcon, Filter, Search } from "lucide-react";

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

import type {
  PurchaseFilterData,
  PurchaseFilterProps,
} from "../types/purchase-filter.types";

const SEARCH_DEBOUNCE_MS = 500;

export default function PurchaseFilter({
  filterData,
  onFilterChange,
  onReset,
  isLoading,
}: PurchaseFilterProps) {
  const [searchValue, setSearchValue] = useState(filterData.search);
  const [dateFromOpen, setDateFromOpen] = useState(false);
  const [dateToOpen, setDateToOpen] = useState(false);

  const { suppliers } = useSuppliers();

  useEffect(() => {
    setSearchValue(filterData.search);
  }, [filterData.search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== filterData.search) {
        onFilterChange({ ...filterData, search: searchValue });
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({
      ...filterData,
      status: value as PurchaseFilterData["status"],
    });
  };

  const handleSupplierChange = (value: string) => {
    onFilterChange({
      ...filterData,
      supplierId: value,
    });
  };

  const handleSortByChange = (value: string) => {
    onFilterChange({
      ...filterData,
      sortBy: value as PurchaseFilterData["sortBy"],
    });
  };

  const handleSortOrderChange = (value: string) => {
    onFilterChange({
      ...filterData,
      sortOrder: value as PurchaseFilterData["sortOrder"],
    });
  };

  const handleDateFromChange = (date: Date | undefined) => {
    onFilterChange({
      ...filterData,
      dateFrom: date ? date.toISOString() : "",
    });
    setDateFromOpen(false);
  };

  const handleDateToChange = (date: Date | undefined) => {
    onFilterChange({
      ...filterData,
      dateTo: date ? date.toISOString() : "",
    });
    setDateToOpen(false);
  };

  return (
    <div className="bg-white rounded-[16px] p-6 mt-5">
      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#3A4754]" />
          <Input
            placeholder="Шукати"
            value={searchValue}
            onChange={e => handleSearchChange(e.target.value)}
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

      {/* Filter Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* Date From */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#3A4754]">Дата від</Label>
          <Popover open={dateFromOpen} onOpenChange={setDateFromOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                disabled={isLoading}
                className={cn(
                  "min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 border border-[#C8CDD2] justify-start text-left font-normal",
                  !filterData.dateFrom && "text-[#B6BDC3]"
                )}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filterData.dateFrom
                  ? format(new Date(filterData.dateFrom), "dd.MM.yyyy", {
                      locale: uk,
                    })
                  : "Оберіть дату"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={
                  filterData.dateFrom
                    ? new Date(filterData.dateFrom)
                    : undefined
                }
                onSelect={handleDateFromChange}
                locale={uk}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Date To */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#3A4754]">Дата до</Label>
          <Popover open={dateToOpen} onOpenChange={setDateToOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                disabled={isLoading}
                className={cn(
                  "min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 border border-[#C8CDD2] justify-start text-left font-normal",
                  !filterData.dateTo && "text-[#B6BDC3]"
                )}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filterData.dateTo
                  ? format(new Date(filterData.dateTo), "dd.MM.yyyy", {
                      locale: uk,
                    })
                  : "Оберіть дату"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={
                  filterData.dateTo ? new Date(filterData.dateTo) : undefined
                }
                onSelect={handleDateToChange}
                locale={uk}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#3A4754]">Статус</Label>
          <Select
            value={filterData.status}
            onValueChange={handleStatusChange}
            disabled={isLoading}>
            <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
              <SelectValue placeholder="Всі статуси" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IN_PROCESS">У процесі</SelectItem>
              <SelectItem value="UNDER_REVIEW">На розгляді</SelectItem>
              <SelectItem value="PLANNING">Планування</SelectItem>
              <SelectItem value="CALCULATION">Прорахунок</SelectItem>
              <SelectItem value="LAUNCH">Запуск</SelectItem>
              <SelectItem value="RECEIVED">Отримано</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Supplier */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#3A4754]">
            Постачальник
          </Label>
          <Select
            value={filterData.supplierId}
            onValueChange={handleSupplierChange}
            disabled={isLoading}>
            <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
              <SelectValue placeholder="Всі постачальники" />
            </SelectTrigger>
            <SelectContent>
              {suppliers.map(supplier => (
                <SelectItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reset Button */}
      </div>

      {/* Sort Row */}
      <div className="grid grid-cols-4 gap-4">
        {/* Sort By */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#3A4754]">
            Сортувати за
          </Label>
          <Select
            value={filterData.sortBy}
            onValueChange={handleSortByChange}
            disabled={isLoading}>
            <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
              <SelectValue placeholder="Оберіть поле" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Датою</SelectItem>
              <SelectItem value="totalAmount">Сумою</SelectItem>
              <SelectItem value="status">Статусом</SelectItem>
              <SelectItem value="createdAt">Датою створення</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#3A4754]">Порядок</Label>
          <Select
            value={filterData.sortOrder}
            onValueChange={handleSortOrderChange}
            disabled={isLoading}>
            <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
              <SelectValue placeholder="Оберіть порядок" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">За зростанням</SelectItem>
              <SelectItem value="desc">За спаданням</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          size="lg"
          onClick={onReset}
          disabled={isLoading}
          className="h-12 px-6 mt-7 bg-white border border-[#C8CDD2] text-[#3A4754] hover:bg-gray-50">
          Скинути
        </Button>
      </div>
    </div>
  );
}
