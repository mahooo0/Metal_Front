import React from "react";

import { Calendar } from "lucide-react";

import NeqrVockax from "../../../public/neqr_s_ockami.png";
import OrderCard from "./order-card";

export default function TuskList() {
  // Mock data for demonstration
  const mockOrders = [
    {
      id: "1",
      orderName: "Назва замовлення",
      createdDate: "15/08/2017",
      endDate: "15/08/2017",
      users: [
        {
          id: "1",
          name: "John Doe",
          avatar: NeqrVockax.src,
        },
        {
          id: "2",
          name: "Jane Smith",
          avatar: NeqrVockax.src,
        },
        {
          id: "3",
          name: "Mike Johnson",
          initials: "MN",
        },
      ],
    },
  ];

  const handleAddClick = () => {
    // TODO: Implement add functionality
  };

  return (
    <div className="bg-white rounded-[16px] px-3 py-4">
      <div className="flex items-center gap-2 border-b border-[#DBDEE1] pb-4 w-full mb-4">
        <Calendar className="w-4 h-4" />
        <h2 className="text-[#3A4754] text-[16px] font-bold">Сьогодні</h2>
      </div>

      {/* Order cards */}
      <div className="space-y-3">
        {mockOrders.map(order => (
          <OrderCard
            key={order.id}
            orderName={order.orderName}
            createdDate={order.createdDate}
            endDate={order.endDate}
            users={order.users}
            onAddClick={handleAddClick}
          />
        ))}
      </div>
    </div>
  );
}
