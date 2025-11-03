import React from "react";

import { mockOrders } from "../mocks/orders.mock";
import type { Order } from "../types/order.types";
import OrdersFilter from "./orders-filter";
import OrdersList from "./orders-list";

export default function ListView() {
  const handleViewOrder = (order: Order) => {
    console.log("View order:", order);
    // TODO: Implement view order functionality
  };

  return (
    <div className=" flex flex-col gap-4">
      <OrdersFilter />
      <OrdersList orders={mockOrders} onViewOrder={handleViewOrder} />
    </div>
  );
}
