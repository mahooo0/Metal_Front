"use client";

import React, { useState } from "react";

import { Filter, Search } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { DatePicker } from "@/shared/ui/date-picked";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import type {
  InventoryFilterData,
  InventoryFilterProps,
} from "../types/inventory-filter.types";

export default function InventoryFilter({
  onApply,
  onReset,
  initialData,
}: InventoryFilterProps) {
  const [search, setSearch] = useState(initialData?.search || "");
  const [period, setPeriod] = useState(initialData?.period || "");

  const handleApply = () => {
    onApply({
      search,
      period,
    });
  };

  const handleReset = () => {
    setSearch("");
    setPeriod("");
    onReset();
  };

  return (
    <div className="bg-white rounded-[16px] p-6 mt-5">
      {/* Search Bar and Filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#3A4754]" />
          <Input
            placeholder="Шукати"
            value={search}
            onChange={e => setSearch(e.target.value)}
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

      {/* Period Selection and Action Buttons */}
      <div className=" gap-4 grid grid-cols-3">
        {/* Period Selection */}
        <div className="flex flex-col">
          <Label className="text-sm font-medium text-[#3A4754] mb-1">
            Обрати період
          </Label>
          <DatePicker
            placeholder="input_label"
            value={period}
            onChange={setPeriod}
            className="bg-white border-[#C8CDD2] rounded-[48px] h-[42px] w-full"
          />
        </div>

        <Button
          variant="default"
          size="lg"
          onClick={handleApply}
          className="h-[42px] px-6 bg-[#3A4754] hover:bg-[#2A3A4A] text-white mt-6  ">
          Застосувати
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={handleReset}
          className="h-[42px] px-6 bg-white border border-[#C8CDD2] text-[#3A4754] hover:bg-gray-50 mt-6 ">
          Скинути
        </Button>
      </div>
    </div>
  );
}
