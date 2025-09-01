import { useCallback, useState } from "react";

export const useOrdersHeader = (initialTotalOrders: number = 54) => {
  const [totalOrders, setTotalOrders] = useState(initialTotalOrders);
  const [currentView, setCurrentView] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    console.log("Search query:", query);
    // Здесь можно добавить логику поиска
  }, []);

  const handleFilter = useCallback(() => {
    console.log("Filter clicked");
    // Здесь можно добавить логику фильтрации
  }, []);

  const handleViewChange = useCallback((view: "list" | "grid") => {
    setCurrentView(view);
    console.log("View changed to:", view);
    // Здесь можно добавить логику изменения вида
  }, []);

  const handleAddOrder = useCallback(() => {
    console.log("Add new order clicked");
    // Здесь можно добавить логику создания нового заказа
  }, []);

  const updateTotalOrders = useCallback((count: number) => {
    setTotalOrders(count);
  }, []);

  return {
    totalOrders,
    currentView,
    searchQuery,
    handleSearch,
    handleFilter,
    handleViewChange,
    handleAddOrder,
    updateTotalOrders,
  };
};
