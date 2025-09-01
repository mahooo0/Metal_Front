"use client";

import { memo } from "react";
import { ORDER_STATUSES } from "../constants";
import type { BoardState } from "../types";

interface OrdersStatsProps {
  boardState: BoardState;
}

export default memo(function OrdersStats({ boardState }: OrdersStatsProps) {
  const getTotalOrders = () => {
    return Object.values(boardState.cardsByColumn).reduce(
      (total, cards) => total + cards.length,
      0
    );
  };

  const getOrdersByStatus = (status: string) => {
    return boardState.cardsByColumn[status]?.length || 0;
  };

  const totalOrders = getTotalOrders();

  return (
    <div className="flex items-center gap-6 text-sm text-gray-400">
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-300">Всі замовлення</span>
        <span className="bg-gray-600 text-white px-2 py-1 rounded-full text-xs">
          {totalOrders}
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
          <span>{getOrdersByStatus(ORDER_STATUSES.NEW)}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          <span>{getOrdersByStatus(ORDER_STATUSES.CALCULATION)}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
          <span>{getOrdersByStatus(ORDER_STATUSES.CLARIFY)}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
          <span>{getOrdersByStatus(ORDER_STATUSES.EXTRA)}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          <span>{getOrdersByStatus(ORDER_STATUSES.KP)}</span>
        </div>
      </div>
    </div>
  );
});
