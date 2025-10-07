"use client";

import React, { useState } from "react";

import { Filter, Search } from "lucide-react";

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

export default function ApplicationsFilters() {
  const [searchValue, setSearchValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [customerValue, setCustomerValue] = useState("");
  const [sortValue, setSortValue] = useState("");

  return (
    <div className="bg-white rounded-[16px] p-6 mt-5 grid grid-cols-5 gap-4">
      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-6 col-span-3 mt-8">
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
      {/* Filter and Sort Options */}
      {/* Date Created */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Дата створення{" "}
        </label>
        <DatePicker
          placeholder="input_label"
          value={dateValue}
          onChange={setDateValue}
          className=" min-h-[48px] rounded-[48px]  bg-white px-4 py-3 placeholder:text-[#B6BDC3] placeholder:text-sm w-full"
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Початок виконання{" "}
        </label>
        <DatePicker
          placeholder="input_label"
          value={dateValue}
          onChange={setDateValue}
          className=" min-h-[48px] rounded-[48px]  bg-white px-4 py-3 placeholder:text-[#B6BDC3] placeholder:text-sm w-full"
        />
      </div>
      {/* Customer */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#3A4754]">Тип задачі</label>
        <Select value={customerValue} onValueChange={setCustomerValue}>
          <SelectTrigger className=" min-h-[48px] rounded-[48px]  bg-white px-4 py-3 placeholder:text-[#B6BDC3] placeholder:text-sm w-full">
            <SelectValue placeholder="Назвою" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Назвою</SelectItem>
            <SelectItem value="date">Датою</SelectItem>
            <SelectItem value="status">Статусом</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Sort By */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#3A4754]">Замовник </label>
        <Select value={sortValue} onValueChange={setSortValue}>
          <SelectTrigger className=" min-h-[48px] rounded-[48px]  bg-white px-4 py-3 placeholder:text-[#B6BDC3] placeholder:text-sm w-full">
            <SelectValue placeholder="Назвою" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Назвою</SelectItem>
            <SelectItem value="date">Датою</SelectItem>
            <SelectItem value="status">Статусом</SelectItem>
          </SelectContent>
        </Select>
      </div>{" "}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#3A4754]">Створив </label>
        <Select value={sortValue} onValueChange={setSortValue}>
          <SelectTrigger className=" min-h-[48px] rounded-[48px]  bg-white px-4 py-3 placeholder:text-[#B6BDC3] placeholder:text-sm w-full">
            <SelectValue placeholder="Назвою" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Назвою</SelectItem>
            <SelectItem value="date">Датою</SelectItem>
            <SelectItem value="status">Статусом</SelectItem>
          </SelectContent>
        </Select>
      </div>{" "}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#3A4754]">Кому </label>
        <Select value={sortValue} onValueChange={setSortValue}>
          <SelectTrigger className=" min-h-[48px] rounded-[48px]  bg-white px-4 py-3 placeholder:text-[#B6BDC3] placeholder:text-sm w-full">
            <SelectValue placeholder="Назвою" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Назвою</SelectItem>
            <SelectItem value="date">Датою</SelectItem>
            <SelectItem value="status">Статусом</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Action Buttons */}
      <div className="flex gap-2 ">
        <Button variant="balck" size="lg" className=" mt-7">
          Застосувати
        </Button>
        <Button variant="BlackTransparent" size="lg" className=" mt-7">
          {" "}
          Скинути
        </Button>
      </div>
    </div>
  );
}
