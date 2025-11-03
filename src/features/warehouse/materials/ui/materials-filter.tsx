"use client";

import React, { useState } from "react";

import { Filter, Search } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
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

export default function MaterialsFilter({
  onApply,
  onReset,
  initialData,
}: MaterialsFilterProps) {
  const [search, setSearch] = useState(initialData?.search || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [type, setType] = useState(initialData?.type || "");
  const [thickness, setThickness] = useState(initialData?.thickness || "");
  const [minimumBalance, setMinimumBalance] = useState(
    initialData?.minimumBalance || ""
  );
  const [sheetType, setSheetType] = useState(initialData?.sheetType || "");
  const [showBalances, setShowBalances] = useState(
    initialData?.showBalances ?? true
  );

  const handleApply = () => {
    onApply({
      search,
      category,
      type,
      thickness,
      minimumBalance,
      sheetType,
      showBalances,
    });
  };

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setType("");
    setThickness("");
    setMinimumBalance("");
    setSheetType("");
    setShowBalances(true);
    onReset();
  };

  return (
    <div className="bg-white rounded-[16px] p-6 mt-5">
      {/* Search Bar */}
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

      {/* Filter Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* Category */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#3A4754]">
            Категорія
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
              <SelectValue placeholder="input_label" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="category1">Категорія 1</SelectItem>
              <SelectItem value="category2">Категорія 2</SelectItem>
              <SelectItem value="category3">Категорія 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Type */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#3A4754]">Тип</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
              <SelectValue placeholder="Назвою" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="type1">Тип 1</SelectItem>
              <SelectItem value="type2">Тип 2</SelectItem>
              <SelectItem value="type3">Тип 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Thickness */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#3A4754]">Товщина</Label>
          <Select value={thickness} onValueChange={setThickness}>
            <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
              <SelectValue placeholder="Назвою" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thickness1">Товщина 1</SelectItem>
              <SelectItem value="thickness2">Товщина 2</SelectItem>
              <SelectItem value="thickness3">Товщина 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Minimum Balance */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#3A4754]">
            Мінімальний залишок
          </Label>
          <Select value={minimumBalance} onValueChange={setMinimumBalance}>
            <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
              <SelectValue placeholder="Назвою" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="balance1">Залишок 1</SelectItem>
              <SelectItem value="balance2">Залишок 2</SelectItem>
              <SelectItem value="balance3">Залишок 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#3A4754]">
            Тип листу
          </Label>
          <Select value={sheetType} onValueChange={setSheetType}>
            <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
              <SelectValue placeholder="input_label" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sheet1">Лист 1</SelectItem>
              <SelectItem value="sheet2">Лист 2</SelectItem>
              <SelectItem value="sheet3">Лист 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 mt-5">
          <Label className="text-sm font-medium text-[#3A4754]">
            Показувати залишки
          </Label>
          <RadioGroup
            value={showBalances ? "yes" : "no"}
            onValueChange={value => setShowBalances(value === "yes")}
            className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="yes"
                id="yes"
                className="data-[state=checked]:bg-[#3A4754] data-[state=checked]:text-white"
              />
              <Label htmlFor="yes" className="text-sm text-[#3A4754]">
                Так
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="no"
                id="no"
                className="data-[state=checked]:bg-[#3A4754] data-[state=checked]:text-white"
              />
              <Label htmlFor="no" className="text-sm text-[#3A4754]">
                Hi
              </Label>
            </div>
          </RadioGroup>
        </div>
        <Button
          variant="outline"
          size="lg"
          onClick={handleReset}
          className="h-12 px-6 bg-white border border-[#C8CDD2] text-[#3A4754] hover:bg-gray-50 mt-6">
          Скинути
        </Button>
        <Button
          variant="default"
          size="lg"
          onClick={handleApply}
          className="h-12 px-6 bg-[#3A4754] hover:bg-[#2A3A4A] text-white mt-6">
          Застосувати
        </Button>
      </div>

      {/* Second Row */}
    </div>
  );
}
