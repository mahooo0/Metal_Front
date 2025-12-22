"use client";

import React, { useState } from "react";

import { Filter, Search } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface MaterialCategoriesFilterProps {
  onFilterChange?: (filters: {
    search?: string;
    sortBy?: string;
    sortDirection?: string;
  }) => void;
  initialFilters?: {
    search?: string;
    sortBy?: string;
    sortDirection?: string;
  };
}

export default function MaterialCategoriesFilter({
  onFilterChange,
  initialFilters = {},
}: MaterialCategoriesFilterProps) {
  const [searchValue, setSearchValue] = useState(initialFilters.search || "");
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || "");
  const [sortDirection, setSortDirection] = useState(
    initialFilters.sortDirection || ""
  );

  const handleApply = () => {
    if (onFilterChange) {
      onFilterChange({
        search: searchValue || undefined,
        sortBy: sortBy || undefined,
        sortDirection: sortDirection || undefined,
      });
    }
  };

  const handleReset = () => {
    setSearchValue("");
    setSortBy("");
    setSortDirection("");
    if (onFilterChange) {
      onFilterChange({
        search: undefined,
        sortBy: undefined,
        sortDirection: undefined,
      });
    }
  };

  return (
    <div className="bg-white rounded-[16px] p-6 mt-5 grid grid-cols-4 gap-4">
      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-6 col-span-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#3A4754]" />
          <Input
            placeholder="Шукати за назвою"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="pl-10 bg-white border-[#C8CDD2] rounded-[48px] h-[42px]"
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleApply();
              }
            }}
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

      {/* Sort By */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-medium text-[#3A4754]">
          Сортувати за
        </label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="min-h-[48px] rounded-[48px] w-full">
            <SelectValue placeholder="Оберіть поле" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Назвою</SelectItem>
            <SelectItem value="createdAt">Датою створення</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort Direction */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-medium text-[#3A4754]">Напрямок</label>
        <Select value={sortDirection} onValueChange={setSortDirection}>
          <SelectTrigger className="min-h-[48px] rounded-[48px] w-full">
            <SelectValue placeholder="Оберіть напрямок" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">За зростанням</SelectItem>
            <SelectItem value="desc">За спаданням</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <Button variant="balck" size="lg" className="mt-7" onClick={handleApply}>
        Застосувати
      </Button>
      <Button
        variant="BlackTransparent"
        size="lg"
        className="mt-7"
        onClick={handleReset}>
        Скинути
      </Button>
    </div>
  );
}
