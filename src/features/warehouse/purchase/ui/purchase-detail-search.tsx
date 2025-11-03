"use client";

import React, { useState } from "react";

import { Filter, Search } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

interface PurchaseDetailSearchProps {
  onSearch?: (searchTerm: string) => void;
  onFilter?: () => void;
  placeholder?: string;
}

export default function PurchaseDetailSearch({
  onSearch,
  onFilter,
  placeholder = "Шукати",
}: PurchaseDetailSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleFilterClick = () => {
    onFilter?.();
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#3A4754]" />
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10 bg-white border-[#C8CDD2] rounded-[48px] h-[42px]"
        />
      </div>

      {/* Filter Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleFilterClick}
        className="h-[42px] w-[42px] rounded-full bg-white border border-[#C8CDD2] hover:bg-gray-50">
        <Filter className="h-4 w-4 text-[#3A4754]" />
      </Button>
    </div>
  );
}
