import React, { useState } from "react";

import { Calendar, Filter, Search } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { DatePicker } from "@/shared/ui/date-picked";
import { Input } from "@/shared/ui/input";

export default function OrdersFilter() {
  const [searchValue, setSearchValue] = useState("");
  const [dateRange, setDateRange] = useState("");

  const handleApply = () => {
    // TODO: Implement filter logic
    console.log("Apply filters:", { searchValue, dateRange });
  };

  const handleReset = () => {
    setSearchValue("");
    setDateRange("");
    // TODO: Reset filters
  };

  return (
    <div className="bg-white rounded-[16px] p-6 h-full grid grid-cols-4 gap-4">
      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-6 col-span-4 ">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#3A4754]" />
          <Input
            placeholder="Шукати"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
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

      <div className="flex-1 col-span-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Обрати період{" "}
        </label>
        <DatePicker
          placeholder="input_label"
          value={dateRange}
          onChange={setDateRange}
          className=" min-h-[48px] rounded-[48px]  bg-white px-4 py-3 placeholder:text-[#B6BDC3] placeholder:text-sm w-full"
        />
      </div>

        <Button variant="balck" size="lg" className=" mt-7">
          Застосувати
        </Button>
        <Button variant="BlackTransparent" size="lg" className=" mt-7">
          {" "}
          Скинути
        </Button>
    </div>
  );
}
