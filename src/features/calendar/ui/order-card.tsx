import React from "react";

import { Calendar, Clock, User, Users } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";

import type { OrderCardProps } from "../types/order.types";

export default function OrderCard({ order, onViewOrder }: OrderCardProps) {
  const visiblePerformers = order.performers.slice(0, 3);
  const remainingCount = order.performers.length - 3;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "На розгляді":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "В процесі":
        return "bg-green-100 text-green-800 border-green-200";
      case "Завершено":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "Скасовано":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAvatarColor = (index: number) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500",
    ];
    return colors[index % colors.length];
  };

  return (
    <div
      className={cn(
        "bg-white rounded-2xl p-4 shadow-sm  hover:shadow-md transition-shadow px-10",
        "border-l-8  border-purple-400"
      )}>
      <div className="flex items-center justify-between">
        {/* Left Section - Dates */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm text-[#6D7A87]">
            <div className="flex items-center gap-2  min-w-[110px]">
              <Clock className="w-4 h-4" />
              <span>Створено:</span>
            </div>
            <span className="text-[#3A4754]"> {order.createdDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#6D7A87]">
            <div className="flex items-center gap-2  min-w-[110px]">
              <Calendar className="w-4 h-4" />
              <span>Закінчення:</span>
            </div>
            <span className="text-[#3A4754]">{order.endDate}</span>
          </div>
        </div>

        {/* Middle Section - Customer and Order */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm text-[#6D7A87] justify-between">
            <div className="flex items-center gap-2  min-w-[110px]">
              <User className="w-4 h-4" />
              <span>Замовник:</span>
            </div>
            <span className="text-[#3A4754]">{order.customer}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#6D7A87] justify-between">
            <div className="flex items-center gap-2  min-w-[110px]">
              <Users className="w-4 h-4" />
              <span>№ замовлення:</span>
            </div>
            <span className="text-[#3A4754]">{order.orderNumber}</span>
          </div>
        </div>

        {/* Right Section - Performers and Status */}
        <div className="flex flex-col gap-3">
          <div className="text-sm text-gray-600">Виконавці:</div>
          <div className="flex items-center gap-1">
            {visiblePerformers.map((performer, index) => (
              <div
                key={performer.id}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium",
                  getAvatarColor(index)
                )}>
                {performer.initials}
              </div>
            ))}
            {remainingCount > 0 && (
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-medium">
                +{remainingCount}
              </div>
            )}
          </div>
        </div>

        {/* Far Right Section - Status and Action */}
        {/* <div className="flex flex-col gap-3 items-end">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-600">Статус:</span>
            <Badge className={cn("text-xs", getStatusBadgeClass(order.status))}>
              {order.status}
            </Badge>
          </div>
          <Button
            variant="blue"
            size="sm"
            onClick={() => onViewOrder(order)}
            className="text-sm px-4 py-2">
            Переглянути замовлення
          </Button>
        </div> */}
      </div>
    </div>
  );
}
