"use client";

import React, { useState } from "react";

import { Calendar, Filter, Search } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

export default function UsersFilter() {
  const [searchValue, setSearchValue] = useState("");
  const [periodValue, setPeriodValue] = useState("");

  return (
    <div className="bg-white rounded-[16px] p-4 mt-5">
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Пошук..."
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>

        {/* Filter Button */}
        <Button
          variant="outline"
          size="lg"
          className="h-[42px] px-4 border-[#C8CDD2] rounded-[48px]">
          <Filter className="h-4 w-4 mr-2" />
          Фільтр
        </Button>

        {/* Period Selection */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Період"
            value={periodValue}
            onChange={e => setPeriodValue(e.target.value)}
            className="pl-10 bg-white border-[#C8CDD2] rounded-[48px] h-[42px] w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="default"
            size="lg"
            className="h-[42px] px-6 rounded-[48px]">
            Застосувати
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-[42px] px-6 rounded-[48px] border-[#C8CDD2]">
            Скинути
          </Button>
        </div>
      </div>
    </div>
  );
}
