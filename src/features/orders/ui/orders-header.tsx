"use client";

import { memo } from "react";

import { Grid3X3, List, Search, SquarePlus } from "lucide-react";
import { useQueryState } from "nuqs";

import { Button } from "@/shared/ui/button";

interface OrdersHeaderProps {
  totalOrders?: number;
  showStats?: boolean;
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  onViewChange?: (view: "list" | "grid") => void;
  onAddOrder?: () => void;
}

export default memo(function OrdersHeader({
  totalOrders = 54,
  onSearch,
  onFilter,
  onViewChange,
  onAddOrder,
}: OrdersHeaderProps) {
  const [searchQuery, setSearchQuery] = useQueryState("search", {
    defaultValue: "",
  });
  const [currentView, setCurrentView] = useQueryState("currentView", {
    defaultValue: "list",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery || "");
  };

  const handleViewChange = (view: "list" | "grid") => {
    setCurrentView(view);
    onViewChange?.(view);
  };

  return (
    <div className="mb-5 ">
      <div className="flex items-center justify-between">
        {/* Left side - Title with count */}
        <h1 className="text-[#3A4754] text-[32px] font-bold">
          Всі замовлення <span className="text-[#929BA5]">({totalOrders})</span>
        </h1>

        {/* Center - Search bar */}
        <div className="flex-1 max-w-md mx-8 flex items-center gap-2">
          <form onSubmit={handleSearch} className="relative w-[380px]">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Пошук"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full h-[49px] bg-white text-gray-900 placeholder-gray-400 rounded-[48px] pl-12 pr-4 py-[14px] border border-[#C8CDD2] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </form>
          <div className="flex items-center gap-2">
            {/* List view button */}
            <button
              onClick={() => handleViewChange("list")}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors border ${
                currentView === "list"
                  ? "bg-[#3A4754] text-white border-[#3A4754]"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
              title="Список">
              <List className="w-5 h-5" />
            </button>

            {/* Grid view button */}
            <button
              onClick={() => handleViewChange("grid")}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors border ${
                currentView === "grid"
                  ? "bg-[#3A4754] text-white border-[#3A4754]"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
              title="Сітка">
              <Grid3X3 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right side - Controls and Add button */}
        <div className="flex items-center gap-3">
          {/* View controls */}

          {/* Add new order button */}
          <Button
            onClick={onAddOrder}
            size="lg"
            className="w-[269px] h-[48px] bg-[#3A4754] hover:bg-[#2A3744] text-white px-6 py-3 rounded-[48px] flex items-center gap-2 transition-colors font-medium">
            <SquarePlus className="w-5 h-5" />
            <span>Додати нове замовлення</span>
          </Button>
        </div>
      </div>
    </div>
  );
});
