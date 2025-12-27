"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";

import { EllipsisIcon, SquarePlus } from "lucide-react";

import { useInventories } from "@/hooks/use-inventories";

import { InventoryStatus } from "@/service/inventories.service";

import {
  AddInventoryDialog,
  InventoryFilter,
  type InventoryFilterData,
  InventoryStats,
  InventoryTable,
} from "@/features/warehouse/inventory";

import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

const SEARCH_DEBOUNCE_MS = 300;

export default function InventoryPageClient() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // URL state for filters
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [status, setStatus] = useQueryState("status", parseAsString.withDefault(""));

  // Local search state for debouncing
  const [searchValue, setSearchValue] = useState(search);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchValue || null);
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchValue, setSearch, setPage]);

  // Sync local search with URL
  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  // Fetch inventories
  const { inventories, meta, isLoading } = useInventories({
    page,
    limit: 20,
    search: search || undefined,
    status: status as InventoryStatus || undefined,
  });

  const handleApplyFilter = (filterData: InventoryFilterData) => {
    setSearchValue(filterData.search);
    // Note: period filter would need to be mapped to dateFrom/dateTo
  };

  const handleResetFilter = () => {
    setSearchValue("");
    setSearch(null);
    setStatus(null);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 w-full">
        <h1 className="text-[#3A4754] text-[32px] font-[700]">
          Інвентаризація{" "}
          <span className="text-[#B6BDC3]">({meta?.total || 0})</span>
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="balck"
            size="lg"
            onClick={() => setIsAddDialogOpen(true)}>
            <SquarePlus className="w-5 h-5" /> Додати інвентаризацію
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="bg-white w-[36px] h-[36px] rounded-full border border-[#B6BDC3] text-[#495969]">
                <EllipsisIcon className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/dashboard/warehouse/inventory/create">
                  Створення закупки
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <InventoryStats />

      <InventoryFilter
        onApply={handleApplyFilter}
        onReset={handleResetFilter}
      />

      <InventoryTable
        inventories={inventories}
        isLoading={isLoading}
        currentPage={page}
        totalPages={meta?.totalPages || 1}
        onPageChange={handlePageChange}
        total={meta?.total || 0}
      />

      <AddInventoryDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />
    </div>
  );
}
