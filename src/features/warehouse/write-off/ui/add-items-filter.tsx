import React from "react";

import { Search, X } from "lucide-react";

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

import type { AddItemsFilterProps } from "../types/add-items-filter.types";

// Material type options - should match backend MaterialType enum
const MATERIAL_TYPE_OPTIONS = [
  { value: "", label: "Всі типи" },
  { value: "SHEET", label: "Лист" },
  { value: "PIPE", label: "Труба" },
  { value: "PROFILE", label: "Профіль" },
  { value: "CIRCLE", label: "Круг" },
  { value: "SQUARE", label: "Квадрат" },
  { value: "STRIP", label: "Смуга" },
  { value: "CORNER", label: "Кутник" },
  { value: "CHANNEL", label: "Швелер" },
  { value: "BEAM", label: "Балка" },
];

export default function AddItemsFilter({
  filterData,
  onSearchChange,
  onMaterialTypeChange,
  onReset,
}: AddItemsFilterProps) {
  const hasFilters = filterData.search || filterData.materialType;

  return (
    <div className="bg-white rounded-[16px] p-6 mt-5">
      <h2 className="text-[#3A4754] text-lg font-semibold mb-6">
        Товари на складі
      </h2>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#3A4754]" />
          <Input
            placeholder="Пошук за назвою товару"
            value={filterData.search}
            onChange={e => onSearchChange(e.target.value)}
            className="pl-10 bg-white border-[#C8CDD2] rounded-[48px] !h-[48px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <Label className="text-sm font-medium text-[#3A4754] mb-1 block">
            Тип матеріалу
          </Label>
          <Select
            value={filterData.materialType || "all"}
            onValueChange={value =>
              onMaterialTypeChange(value === "all" ? "" : value)
            }>
            <SelectTrigger className="bg-white border-[#C8CDD2] rounded-[48px] !h-[48px] w-full">
              <SelectValue placeholder="Оберіть тип" />
            </SelectTrigger>
            <SelectContent>
              {MATERIAL_TYPE_OPTIONS.map(option => (
                <SelectItem
                  key={option.value || "all"}
                  value={option.value || "all"}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasFilters && (
          <Button
            variant="outline"
            size="lg"
            onClick={onReset}
            className="!h-[48px] mt-6 px-6 bg-white border border-[#C8CDD2] text-[#3A4754] hover:bg-gray-50 gap-2">
            <X className="h-4 w-4" />
            Скинути
          </Button>
        )}
      </div>
    </div>
  );
}

