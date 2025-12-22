"use client";

import React from "react";

import { RotateCcw, Search } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

export interface SuppliersFilterData {
  search: string;
  sortBy: string;
  sortOrder: "ASC" | "DESC" | "";
}

interface SuppliersFilterProps {
  filterData: SuppliersFilterData;
  onFilterChange: (data: SuppliersFilterData) => void;
  onReset: () => void;
}

export function SuppliersFilter({
  filterData,
  onFilterChange,
  onReset,
}: SuppliersFilterProps) {
  const handleSearchChange = (value: string) => {
    onFilterChange({ ...filterData, search: value });
  };

  const handleSortByChange = (value: string) => {
    onFilterChange({
      ...filterData,
      sortBy: value as SuppliersFilterData["sortBy"],
    });
  };

  const handleSortOrderChange = (value: string) => {
    onFilterChange({
      ...filterData,
      sortOrder: value as SuppliersFilterData["sortOrder"],
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="grid grid-cols-6 gap-4">
        {/* Search */}
        <div className="col-span-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#B6BDC3]" />
            <Input
              value={filterData.search}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="Пошук за назвою..."
              className="min-h-[48px] w-full rounded-[48px] bg-white pl-12 pr-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
            />
          </div>
        </div>

        {/* Sort By */}
        <div className="col-span-1">
          <Select value={filterData.sortBy} onValueChange={handleSortByChange}>
            <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 border border-[#C8CDD2]">
              <SelectValue placeholder="Сортувати за" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Назва</SelectItem>
              <SelectItem value="createdAt">Дата створення</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order */}
        <div className="col-span-1">
          <Select
            value={filterData.sortOrder}
            onValueChange={handleSortOrderChange}>
            <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 border border-[#C8CDD2]">
              <SelectValue placeholder="Напрямок" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ASC">За зростанням</SelectItem>
              <SelectItem value="DESC">За спаданням</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reset Button */}
        <div className="col-span-2 flex justify-end">
          <Button
            variant="outline"
            size="lg"
            onClick={onReset}
            className="min-h-[48px] rounded-[48px] gap-2">
            <RotateCcw className="h-4 w-4" />
            Скинути
          </Button>
        </div>
      </div>
    </div>
  );
}
