"use client";

import React, { useState } from "react";

import { useMetalBrands } from "@/hooks/use-metal-brands";
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

interface MaterialItemsFilterProps {
  onFilterChange?: (filters: {
    search?: string;
    typeId?: string;
    thickness?: number;
    sheetType?: string;
    sortBy?: string;
    sortOrder?: string;
  }) => void;
  initialFilters?: {
    search?: string;
    typeId?: string;
    thickness?: string;
    sheetType?: string;
    sortBy?: string;
    sortOrder?: string;
  };
}

export default function MaterialItemsFilter({
  onFilterChange,
  initialFilters = {},
}: MaterialItemsFilterProps) {
  const [searchValue, setSearchValue] = useState(initialFilters.search || "");
  const [typeId, setTypeId] = useState(initialFilters.typeId || "");
  const [thickness, setThickness] = useState(initialFilters.thickness || "");
  const [sheetType, setSheetType] = useState(initialFilters.sheetType || "");
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || "");
  const [sortOrder, setSortOrder] = useState(initialFilters.sortOrder || "");

  const { metalBrands, isLoading: isLoadingBrands } = useMetalBrands();

  const handleApply = () => {
    if (onFilterChange) {
      onFilterChange({
        search: searchValue || undefined,
        typeId: typeId || undefined,
        thickness: thickness ? parseFloat(thickness) : undefined,
        sheetType: sheetType || undefined,
        sortBy: sortBy || undefined,
        sortOrder: sortOrder || undefined,
      });
    }
  };

  const handleReset = () => {
    setSearchValue("");
    setTypeId("");
    setThickness("");
    setSheetType("");
    setSortBy("");
    setSortOrder("");
    if (onFilterChange) {
      onFilterChange({
        search: undefined,
        typeId: undefined,
        thickness: undefined,
        sheetType: undefined,
        sortBy: undefined,
        sortOrder: undefined,
      });
    }
  };

  return (
    <div className="bg-white rounded-[16px] p-6 mt-5 grid grid-cols-6 gap-4">
      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-6 col-span-6">
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

      {/* Metal Brand Filter */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-medium text-[#3A4754]">
          Марка металу
        </label>
        <Select value={typeId} onValueChange={setTypeId}>
          <SelectTrigger className="min-h-[48px] rounded-[48px] w-full">
            <SelectValue placeholder="Оберіть марку" />
          </SelectTrigger>
          <SelectContent>
            {isLoadingBrands ? (
              <div className="px-2 py-1.5 text-sm text-[#B6BDC3]">
                Завантаження...
              </div>
            ) : metalBrands.length === 0 ? (
              <div className="px-2 py-1.5 text-sm text-[#B6BDC3]">
                Немає марок
              </div>
            ) : (
              metalBrands.map(brand => (
                <SelectItem key={brand.id} value={brand.id}>
                  {brand.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Thickness Filter */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#3A4754]">
          Товщина (мм)
        </label>
        <Input
          type="number"
          step="0.1"
          placeholder="Введіть товщину"
          value={thickness}
          onChange={e => setThickness(e.target.value)}
          className="min-h-[48px] rounded-[48px] bg-white"
        />
      </div>

      {/* Sheet Type Filter */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#3A4754]">Тип листа</label>
        <Input
          placeholder="Введіть тип листа"
          value={sheetType}
          onChange={e => setSheetType(e.target.value)}
          className="min-h-[48px] rounded-[48px] bg-white"
        />
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
            <SelectItem value="thickness">Товщиною</SelectItem>
            <SelectItem value="createdAt">Датою створення</SelectItem>
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
