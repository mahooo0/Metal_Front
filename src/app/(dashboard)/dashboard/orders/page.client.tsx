"use client";

import React from "react";

import { useQueryState } from "nuqs";

import { KanbanBoard, OrdersHeader, OrdersTable } from "@/features/orders";

export default function OrdersPageClient() {
  const [currentView, setCurrentView] = useQueryState("currentView", {
    defaultValue: "list",
  });

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  const handleFilter = () => {
    console.log("Filter clicked");
  };

  const handleAddOrder = () => {
    console.log("Add new order clicked");
  };

  return (
    <div className="w-full h-full">
      <OrdersHeader
        totalOrders={17}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onViewChange={setCurrentView}
        onAddOrder={handleAddOrder}
      />
      {currentView === "list" && <OrdersTable />}
      {currentView === "grid" && <KanbanBoard />}
    </div>
  );
}
