"use client";

import React, { useState } from "react";

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
  StockFilterData,
  StockFilterProps,
} from "../types/stock-filter.types";

export default function StockFilter({
  onApply,
  onReset,
  initialData,
}: StockFilterProps) {
  const [search, setSearch] = useState(initialData?.search || "");
  const [material, setMaterial] = useState(initialData?.material || "");
  const [size, setSize] = useState(initialData?.size || "");

  const handleApply = () => {
    onApply({
      search,
      material,
      size,
    });
  };

  const handleReset = () => {
    setSearch("");
    setMaterial("");
    setSize("");
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

      {/* Filter Dropdowns and Action Buttons */}
      <div className="grid grid-cols-4 gap-4">
        {/* Material Dropdown */}
        <div className="flex-1">
          <Label className="text-sm font-medium text-[#3A4754] mb-1 block">
            Матеріал
          </Label>
          <Select value={material} onValueChange={setMaterial}>
            <SelectTrigger className="bg-white border-[#C8CDD2] rounded-[48px] !h-[48px] w-full">
              <SelectValue placeholder="input_label" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="steel">Сталь</SelectItem>
              <SelectItem value="aluminum">Алюміній</SelectItem>
              <SelectItem value="copper">Мідь</SelectItem>
              <SelectItem value="brass">Латунь</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Size Dropdown */}
        <div className="flex-1">
          <Label className="text-sm font-medium text-[#3A4754] mb-1 block">
            Розмір
          </Label>
          <Select value={size} onValueChange={setSize}>
            <SelectTrigger className="bg-white border-[#C8CDD2] rounded-[48px] !h-[48px] w-full">
              <SelectValue placeholder="input_label" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Малий</SelectItem>
              <SelectItem value="medium">Середній</SelectItem>
              <SelectItem value="large">Великий</SelectItem>
              <SelectItem value="custom">Індивідуальний</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <Button
          variant="default"
          size="lg"
          onClick={handleApply}
          className="!h-[48px] mt-6 px-6 bg-[#3A4754] hover:bg-[#2A3A4A] text-white">
          Застосувати
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={handleReset}
          className="!h-[48px] mt-6 px-6 bg-white border border-[#C8CDD2] text-[#3A4754] hover:bg-gray-50">
          Скинути
        </Button>
      </div>
    </div>
  );
}
