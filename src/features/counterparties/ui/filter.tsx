"use client";

import React, { useEffect, useState } from "react";

import { Filter, Search } from "lucide-react";
import { useQueryState } from "nuqs";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface CounterpartiesFilterProps {
  onFiltersChange?: (filters: {
    search?: string;
    edrpou?: string;
    ipn?: string;
    sortBy?: "name" | "createdAt";
    sortOrder?: "asc" | "desc";
  }) => void;
}

export default function CounterpartiesFilter({
  onFiltersChange,
}: CounterpartiesFilterProps) {
  const [searchParam, setSearchParam] = useQueryState("search");
  const [edrpouParam, setEdrpouParam] = useQueryState("edrpou");
  const [ipnParam, setIpnParam] = useQueryState("ipn");
  const [sortByParam, setSortByParam] = useQueryState("sortBy");
  const [sortOrderParam, setSortOrderParam] = useQueryState("sortOrder");

  const [searchValue, setSearchValue] = useState(searchParam || "");
  const [edrpouValue, setEdrpouValue] = useState(edrpouParam || "");
  const [ipnValue, setIpnValue] = useState(ipnParam || "");
  const [sortByValue, setSortByValue] = useState<"name" | "createdAt">(
    (sortByParam as "name" | "createdAt") || "createdAt"
  );
  const [sortOrderValue, setSortOrderValue] = useState<"asc" | "desc">(
    (sortOrderParam as "asc" | "desc") || "desc"
  );

  // Sync state with URL params on mount
  useEffect(() => {
    if (searchParam) setSearchValue(searchParam);
    if (edrpouParam) setEdrpouValue(edrpouParam);
    if (ipnParam) setIpnValue(ipnParam);
    if (sortByParam) setSortByValue(sortByParam as "name" | "createdAt");
    if (sortOrderParam) setSortOrderValue(sortOrderParam as "asc" | "desc");
  }, [searchParam, edrpouParam, ipnParam, sortByParam, sortOrderParam]);

  const handleApply = () => {
    const filters = {
      search: searchValue || undefined,
      edrpou: edrpouValue || undefined,
      ipn: ipnValue || undefined,
      sortBy: sortByValue,
      sortOrder: sortOrderValue,
    };

    setSearchParam(searchValue || null);
    setEdrpouParam(edrpouValue || null);
    setIpnParam(ipnValue || null);
    setSortByParam(sortByValue || null);
    setSortOrderParam(sortOrderValue || null);

    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  };

  const handleReset = () => {
    setSearchValue("");
    setEdrpouValue("");
    setIpnValue("");
    setSortByValue("createdAt");
    setSortOrderValue("desc");

    setSearchParam(null);
    setEdrpouParam(null);
    setIpnParam(null);
    setSortByParam(null);
    setSortOrderParam(null);

    if (onFiltersChange) {
      onFiltersChange({
        sortBy: "createdAt",
        sortOrder: "desc",
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 space-y-6 mt-5">
      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="pl-12 pr-4 bg-white"
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleApply();
              }
            }}
          />
        </div>

        {/* Filter Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleApply}
          className="h-[48px] w-[48px] rounded-full bg-gray-600 hover:bg-gray-700 border-gray-600">
          <Filter className="h-5 w-5 text-white" />
        </Button>
      </div>

      {/* Filter Options */}
      <div className="grid grid-cols-6 gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            EDRPOU
          </label>
          <Input
            type="text"
            placeholder="Filter by EDRPOU code"
            value={edrpouValue}
            onChange={e => setEdrpouValue(e.target.value)}
            className="min-h-[48px] rounded-[48px] bg-white px-4 py-3"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            IPN
          </label>
          <Input
            type="text"
            placeholder="Filter by IPN code"
            value={ipnValue}
            onChange={e => setIpnValue(e.target.value)}
            className="min-h-[48px] rounded-[48px] bg-white px-4 py-3"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort by
          </label>
          <Select
            value={sortByValue}
            onValueChange={value =>
              setSortByValue(value as "name" | "createdAt")
            }>
            <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-300">
              <SelectItem value="name" className="rounded-lg">
                Name
              </SelectItem>
              <SelectItem value="createdAt" className="rounded-lg">
                Created At
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort order
          </label>
          <Select
            value={sortOrderValue}
            onValueChange={value => setSortOrderValue(value as "asc" | "desc")}>
            <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-300">
              <SelectItem value="asc" className="rounded-lg">
                Ascending
              </SelectItem>
              <SelectItem value="desc" className="rounded-lg">
                Descending
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleReset}
          variant="outline"
          size="lg"
          className="h-[48px] px-6 mt-7 border-gray-300 text-gray-700 hover:bg-gray-50">
          Скинути
        </Button>
        <Button
          onClick={handleApply}
          size="lg"
          className="h-[48px] px-6 mt-7 bg-gray-600 hover:bg-gray-700 text-white">
          Застосувати
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 mt-6"></div>
    </div>
  );
}
