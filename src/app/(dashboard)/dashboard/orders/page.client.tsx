"use client";

import React from "react";

import { useQueryState } from "nuqs";

import { CreateOrderSheet } from "@/features/order/ui/sheets/create-order";
import { OrdersSheet } from "@/features/order/ui/sheets/orders";
import { KanbanBoard, OrdersHeader } from "@/features/orders";
import OrdersDataTable from "@/features/orders/ui/table/orders-data-table";

export default function OrdersPageClient() {
  const [currentView, setCurrentView] = useQueryState("currentView", {
    defaultValue: "list",
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages] = React.useState(5); // Mock value, replace with actual API call
  const [createOrder, setCreateOrder] = useQueryState("createOrder", {
    defaultValue: "false",
  });
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  const handleFilter = () => {
    console.log("Filter clicked");
  };

  const handleAddOrder = () => {
    setCreateOrder("true");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Here you can add API call to fetch data for the new page
    console.log("Page changed to:", page);
  };

  const handleSaveRow = (row: any) => {
    // Here you can add API call to save the updated row
    console.log("Row saved:", row);
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
      {currentView === "list" && (
        <OrdersDataTable
          onPageChange={handlePageChange}
          onSaveRow={handleSaveRow}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
      {currentView === "grid" && <KanbanBoard />}
    </div>
  );
}
