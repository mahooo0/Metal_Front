"use client";

import React, { useState } from "react";

import { ChevronDown, Search } from "lucide-react";

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

import type { AddProductFilterProps } from "../types/add-product-filter.types.ts";

export default function AddProductFilter({
  onApply,
  onReset,
  initialData,
}: AddProductFilterProps) {
  const [showRemnants, setShowRemnants] = useState(
    initialData?.showRemnants || "all"
  );
  const [category, setCategory] = useState(initialData?.category || "");
  const [productType, setProductType] = useState(
    initialData?.productType || ""
  );
  const [search, setSearch] = useState(initialData?.search || "");

  const handleApply = () => {
    onApply({
      showRemnants,
      category,
      productType,
      search,
    });
  };

  const _handleReset = () => {
    setShowRemnants("all");
    setCategory("");
    setProductType("");
    setSearch("");
    onReset();
  };

  return (
    <div className="bg-white rounded-[16px] p-6 mt-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#3A4754] text-[24px] font-[600]">
          Додавання товару
        </h2>
        <Button
          variant="default"
          size="lg"
          className="bg-[#3A4754] hover:bg-[#2A3A4A] text-white rounded-full px-6">
          Додати всі товари
        </Button>
      </div>

      {/* Show Remnants Section */}

      {/* Filters Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="mb-6">
          <Label className="text-sm font-medium text-[#3A4754] mb-3 block">
            Показувати залишки
          </Label>
          <RadioGroup
            value={showRemnants}
            onValueChange={value =>
              setShowRemnants(value as "all" | "nonActual")
            }
            className="flex gap-4">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="all" id="all" />
              <Label
                htmlFor="all"
                className="text-sm text-[#3A4754] cursor-pointer">
                Всі
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="nonActual" id="nonActual" />
              <Label
                htmlFor="nonActual"
                className="text-sm text-[#3A4754] cursor-pointer">
                Товари з не актуальною кількістю
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Category Dropdown */}
        <div className="flex-1 ">
          <Label className="text-sm font-medium text-[#3A4754] mb-1 block">
            Категорія
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-white border-[#C8CDD2] rounded-[48px] !h-[48px] w-full">
              <SelectValue placeholder="input_label" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="metal">Метал</SelectItem>
              <SelectItem value="tools">Інструменти</SelectItem>
              <SelectItem value="equipment">Обладнання</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Type Dropdown */}
        <div className="flex-1">
          <Label className="text-sm font-medium text-[#3A4754] mb-1 block">
            Тип товару
          </Label>
          <Select value={productType} onValueChange={setProductType}>
            <SelectTrigger className="bg-white border-[#C8CDD2] rounded-[48px] !h-[48px] w-full">
              <SelectValue placeholder="input_label" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="raw">Сировина</SelectItem>
              <SelectItem value="finished">Готова продукція</SelectItem>
              <SelectItem value="semi-finished">Напівфабрикат</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search and Action Buttons */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#3A4754]" />
          <Input
            placeholder="Шукати"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 bg-white border-[#C8CDD2] rounded-[48px] !h-[48px]"
          />
        </div>

        <Button
          variant="default"
          size="lg"
          onClick={handleApply}
          className="bg-[#3A4754] hover:bg-[#2A3A4A] text-white rounded-full px-6 !h-[48px]">
          Додати товар з пошуку
        </Button>
      </div>
    </div>
  );
}
