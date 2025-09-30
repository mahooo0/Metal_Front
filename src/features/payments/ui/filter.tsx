"use client";

import React, { useState } from "react";

import { Calendar, Filter, Search } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

export default function PeymentsFilter() {
  const [searchValue, setSearchValue] = useState("");
  const [periodValue, setPeriodValue] = useState("");

  const handleApply = () => {
    // TODO: Implement apply filter logic
    // Apply filters with searchValue and periodValue
  };

  const handleReset = () => {
    setSearchValue("");
    setPeriodValue("");
    // TODO: Implement reset filter logic
  };

  return (
    <div className="bg-white rounded-2xl p-6 space-y-6 mt-5">
      {/* Search Bar */}
      <div className="flex items-center gap-4">
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

      {/* Period Selection */}
      <div className=" items-end gap-4 grid grid-cols-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Обрати період
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="input_label"
              value={periodValue}
              onChange={e => setPeriodValue(e.target.value)}
              className="pl-12 pr-4 bg-white"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <Button
          onClick={handleApply}
          size="lg"
          className="h-[48px] px-6 bg-gray-600 hover:bg-gray-700 text-white ">
          Застосувати
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          size="lg"
          className="h-[48px] px-6 border-gray-300 text-gray-700 hover:bg-gray-50 ">
          Скинути
        </Button>
      </div>
    </div>
  );
}
