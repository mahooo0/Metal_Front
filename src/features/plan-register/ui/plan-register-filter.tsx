"use client";

import React, { useEffect, useState } from "react";

import { format } from "date-fns";
import { Filter, Search } from "lucide-react";

import { DateRangePicker } from "@/features/orders/ui/date-range-picker";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface PlanRegisterFilterProps {
  onFilterChange?: (filters: {
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    counterpartyId?: string;
    createdById?: string;
    metalBrandId?: string;
    sortBy?: string;
    sortDirection?: string;
  }) => void;
  initialFilters?: {
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    counterpartyId?: string;
    createdById?: string;
    metalBrandId?: string;
    sortBy?: string;
    sortDirection?: string;
  };
}

export default function PlanRegisterFilter({
  onFilterChange,
  initialFilters = {},
}: PlanRegisterFilterProps) {
  const [searchValue, setSearchValue] = useState(initialFilters.search || "");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>(() => {
    if (initialFilters.dateFrom || initialFilters.dateTo) {
      return {
        from: initialFilters.dateFrom
          ? new Date(initialFilters.dateFrom)
          : undefined,
        to: initialFilters.dateTo ? new Date(initialFilters.dateTo) : undefined,
      };
    }
    return {};
  });
  const [counterpartyId, setCounterpartyId] = useState(
    initialFilters.counterpartyId || ""
  );
  const [createdById, setCreatedById] = useState(
    initialFilters.createdById || ""
  );
  const [metalBrandId, setMetalBrandId] = useState(
    initialFilters.metalBrandId || ""
  );
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || "");
  const [sortDirection, setSortDirection] = useState(
    initialFilters.sortDirection || ""
  );

  const handleApply = () => {
    if (onFilterChange) {
      onFilterChange({
        search: searchValue || undefined,
        dateFrom: dateRange.from
          ? format(dateRange.from, "yyyy-MM-dd")
          : undefined,
        dateTo: dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
        counterpartyId: counterpartyId || undefined,
        createdById: createdById || undefined,
        metalBrandId: metalBrandId || undefined,
        sortBy: sortBy || undefined,
        sortDirection: sortDirection || undefined,
      });
    }
  };

  const handleReset = () => {
    setSearchValue("");
    setDateRange({});
    setCounterpartyId("");
    setCreatedById("");
    setMetalBrandId("");
    setSortBy("");
    setSortDirection("");
    if (onFilterChange) {
      onFilterChange({
        search: undefined,
        dateFrom: undefined,
        dateTo: undefined,
        counterpartyId: undefined,
        createdById: undefined,
        metalBrandId: undefined,
        sortBy: undefined,
        sortDirection: undefined,
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
            placeholder="Шукати (№ плану, № замовлення, замовник)"
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

      {/* Filter and Sort Options */}
      {/* Date Range */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Дата реєстрації
        </label>
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
          placeholder="Оберіть період"
          className="min-h-[48px]"
        />
      </div>

      {/* Counterparty */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#3A4754]">Контрагент</label>
        <Input
          placeholder="ID контрагента"
          value={counterpartyId}
          onChange={e => setCounterpartyId(e.target.value)}
          className="min-h-[48px] rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] placeholder:text-sm w-full"
        />
      </div>

      {/* Sort By */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#3A4754]">
          Сортувати за
        </label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="min-h-[48px] rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] placeholder:text-sm w-full">
            <SelectValue placeholder="Оберіть поле" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="registrationDate">Датою реєстрації</SelectItem>
            <SelectItem value="planNumber">№ плану</SelectItem>
            <SelectItem value="orderNumber">№ замовлення</SelectItem>
            <SelectItem value="customer">Замовником</SelectItem>
            <SelectItem value="createdAt">Датою створення</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort Direction */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#3A4754]">Напрямок</label>
        <Select value={sortDirection} onValueChange={setSortDirection}>
          <SelectTrigger className="min-h-[48px] rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] placeholder:text-sm w-full">
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
