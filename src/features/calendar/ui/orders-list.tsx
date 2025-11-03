import React from "react";

import { cn } from "@/shared/lib/utils";

import type { Order } from "../types/order.types";
import OrderCard from "./order-card";

interface OrdersListProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
  className?: string;
}

export default function OrdersList({
  orders,
  onViewOrder,
  className,
}: OrdersListProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {orders.map(order => (
        <OrderCard key={order.id} order={order} onViewOrder={onViewOrder} />
      ))}
    </div>
  );
}
