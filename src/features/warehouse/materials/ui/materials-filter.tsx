"use client";

import React, { useEffect, useState } from "react";

import { Filter, Search } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import type {
  MaterialsFilterData,
  MaterialsFilterProps,
} from "../types/materials-filter.types";

const SEARCH_DEBOUNCE_MS = 500;

export default function MaterialsFilter({
  filterData,
  onFilterChange,
  onReset,
  isLoading,
}: MaterialsFilterProps) {
  const [searchValue, setSearchValue] = useState(filterData.search);

  // Sync local state when filterData.search changes externally (e.g., reset)
  useEffect(() => {
    setSearchValue(filterData.search);
  }, [filterData.search]);

  // Debounced search
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
      status: value as MaterialsFilterData["status"],
    });
  };

  const handleSortByChange = (value: string) => {
    onFilterChange({
      ...filterData,
      sortBy: value as MaterialsFilterData["sortBy"],
    });
  };

  const handleSortOrderChange = (value: string) => {
    onFilterChange({
      ...filterData,
      sortOrder: value as MaterialsFilterData["sortOrder"],
    });
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

        {/* Filter Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-[42px] w-[42px] rounded-full bg-[#3A4754] hover:bg-[#2A3A4A]">
          <Filter className="h-4 w-4 text-white" />
        </Button>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
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
            </SelectContent>
          </Select>
        </div>

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
              <SelectItem value="createdAt">Датою створення</SelectItem>
              <SelectItem value="updatedAt">Датою оновлення</SelectItem>
              <SelectItem value="quantity">Кількістю</SelectItem>
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

        {/* Action Buttons */}
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
