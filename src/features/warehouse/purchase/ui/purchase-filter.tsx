"use client";

import React, { useState } from "react";

import { Filter, Search } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { DatePicker } from "@/shared/ui/date-picked";
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
  PurchaseFilterData,
  PurchaseFilterProps,
} from "../types/purchase-filter.types";

export default function PurchaseFilter({
  onApply,
  onReset,
  initialData,
}: PurchaseFilterProps) {
  const [search, setSearch] = useState(initialData?.search || "");
  const [period, setPeriod] = useState(initialData?.period || "");
  const [product, setProduct] = useState(initialData?.product || "");
  const [status, setStatus] = useState(initialData?.status || "");
  const [supplier, setSupplier] = useState(initialData?.supplier || "");

  const handleApply = () => {
    onApply({
      search,
      period,
      product,
      status,
      supplier,
    });
  };

  const handleReset = () => {
    setSearch("");
    setPeriod("");
    setProduct("");
    setStatus("");
    setSupplier("");
    onReset();
  };

  return (
    <div className="bg-white rounded-[16px] p-6 mt-5">
      {/* Search Bar and Period */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="flex items-center gap-4 col-span-4 pt-6">
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

        {/* Period Selection */}
        <div className="flex flex-col col-span-1 w-full">
          <Label className="text-sm font-medium text-[#3A4754] mb-2">
            Обрати період
          </Label>
          <DatePicker
            placeholder="input_label"
            value={period}
            onChange={setPeriod}
            className="bg-white border-[#C8CDD2] rounded-[48px] h-[42px] w-full"
          />
        </div>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {/* Product */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#3A4754]">Товар</Label>
          <Select value={product} onValueChange={setProduct}>
            <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
              <SelectValue placeholder="input_label" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="product1">Товар 1</SelectItem>
              <SelectItem value="product2">Товар 2</SelectItem>
              <SelectItem value="product3">Товар 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#3A4754]">Статус</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
              <SelectValue placeholder="Назвою" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="status1">Статус 1</SelectItem>
              <SelectItem value="status2">Статус 2</SelectItem>
              <SelectItem value="status3">Статус 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Supplier */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#3A4754]">
            Постачальник
          </Label>
          <Select value={supplier} onValueChange={setSupplier}>
            <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
              <SelectValue placeholder="Назвою" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="supplier1">Постачальник 1</SelectItem>
              <SelectItem value="supplier2">Постачальник 2</SelectItem>
              <SelectItem value="supplier3">Постачальник 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          size="lg"
          onClick={handleReset}
          className="h-12 px-6 bg-white border border-[#C8CDD2] text-[#3A4754] hover:bg-gray-50 col-span-1 mt-7">
          Скинути
        </Button>
        <Button
          variant="default"
          size="lg"
          onClick={handleApply}
          className="h-12 px-6 bg-[#3A4754] hover:bg-[#2A3A4A] text-white col-span-1 mt-7">
          Застосувати
        </Button>
      </div>

      {/* Action Buttons */}
    </div>
  );
}
