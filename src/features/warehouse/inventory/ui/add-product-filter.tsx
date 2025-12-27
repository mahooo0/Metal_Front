"use client";

import React from "react";

import { Search, X } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";

import type { AddProductFilterData, AddProductFilterProps } from "../types/add-product-filter.types";

export default function AddProductFilter({
  filterData,
  onSortChange,
  onSearchChange,
  onReset,
}: AddProductFilterProps) {
  const hasFilters = filterData.sortOrder !== "filled_first" || filterData.search;

  return (
    <div className="bg-white rounded-[16px] p-6 mt-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#3A4754] text-[24px] font-[600]">Фільтри</h2>
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-3 gap-4 items-end">
        {/* Sort Order */}
        <div>
          <Label className="text-sm font-medium text-[#3A4754] mb-3 block">
            Сортування
          </Label>
          <RadioGroup
            value={filterData.sortOrder}
            onValueChange={value => onSortChange(value as AddProductFilterData["sortOrder"])}
            className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="filled_first" id="filled_first" />
              <Label
                htmlFor="filled_first"
                className="text-sm text-[#3A4754] cursor-pointer">
                Спочатку заповнені
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="empty_first" id="empty_first" />
              <Label
                htmlFor="empty_first"
                className="text-sm text-[#3A4754] cursor-pointer">
                Спочатку незаповнені
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Search */}
        <div>
          <Label className="text-sm font-medium text-[#3A4754] mb-1 block">
            Пошук
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#3A4754]" />
            <Input
              placeholder="Назва товару"
              value={filterData.search}
              onChange={e => onSearchChange(e.target.value)}
              className="pl-10 bg-white border-[#C8CDD2] rounded-[48px] !h-[48px]"
            />
          </div>
        </div>

        {/* Reset Button */}
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
