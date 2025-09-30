"use client";

import React, { useState } from "react";

import { ChevronDown, Filter, Search } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { DatePicker } from "@/shared/ui/date-picked";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

export default function CounterpartiesFilter() {
  const [searchValue, setSearchValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [sortValue, setSortValue] = useState("Назвою");

  const handleApply = () => {
    // TODO: Implement apply filter logic
    // Apply filters with searchValue, dateValue and sortValue
  };

  const handleReset = () => {
    setSearchValue("");
    setDateValue("");
    setSortValue("Назвою");
    // TODO: Implement reset filter logic
  };

  return (
    <div className="bg-white rounded-2xl p-6 space-y-6 mt-5 grid grid-cols-4 gap-4">
      {/* Search Bar */}
      <div className="flex items-center gap-4 col-span-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Шукати"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="pl-12 pr-4 bg-white"
          />
        </div>

        {/* Filter Button */}
        <Button
          variant="outline"
          size="icon"
          className="h-[48px] w-[48px] rounded-full bg-gray-600 hover:bg-gray-700 border-gray-600">
          <Filter className="h-5 w-5 text-white" />
        </Button>
      </div>

      {/* Filter Options */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Дата створення
        </label>
        <DatePicker
          placeholder="input_label"
          value={dateValue}
          onChange={setDateValue}
          className=" min-h-[48px] rounded-[48px]  bg-white px-4 py-3 placeholder:text-[#B6BDC3] placeholder:text-sm w-full"
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2 ">
          Сортувати за
        </label>
        <Select value={sortValue} onValueChange={setSortValue}>
          <SelectTrigger className=" min-h-[48px] rounded-[48px]  bg-white px-4 py-3 placeholder:text-[#B6BDC3] placeholder:text-sm w-full">
            <SelectValue placeholder="Назвою" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-gray-300">
            <SelectItem value="Назвою" className="rounded-lg">
              Назвою
            </SelectItem>
            <SelectItem value="Датою" className="rounded-lg">
              Датою
            </SelectItem>
            <SelectItem value="Статусом" className="rounded-lg">
              Статусом
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <Button
        onClick={handleApply}
        size="lg"
        className="h-[48px] px-6 bg-gray-600 hover:bg-gray-700 text-white mt-7">
        Застосувати
      </Button>
      <Button
        onClick={handleReset}
        variant="outline"
        size="lg"
        className="h-[48px] px-6 border-gray-300 text-gray-700 hover:bg-gray-50 mt-7">
        Скинути
      </Button>
    </div>
  );
}
