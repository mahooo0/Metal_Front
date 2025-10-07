import React from "react";

import Image from "next/image";

import { Calendar, Clock, Plus } from "lucide-react";

import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/button";

interface OrderCardProps {
  orderName: string;
  createdDate: string;
  endDate: string;
  users: {
    id: string;
    name: string;
    avatar?: string;
    initials?: string;
  }[];
  onAddClick?: () => void;
}

export default function OrderCard({
  orderName,
  createdDate,
  endDate,
  users,
  onAddClick,
}: OrderCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-[16px] p-4 shadow-xl   relative",
        "border-r-4  border-purple-400"
      )}>
      {/* Header with title and add button */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-[#3A4754]">{orderName}</h3>
        <Button
          size="sm"
          variant="outline"
          className="w-5 h-5 p-0 rounded-md bg-[#3A4754] hover:bg-[#2A3744] border-[#3A4754]"
          onClick={onAddClick}>
          <Plus className="w-4 h-4 text-white" />
        </Button>
      </div>

      {/* Date information */}
      <div className="space-y-2 mb-4 w-fit">
        <div className="flex items-center gap-2 text-sm text-[#6D7A87] w-full justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Створено</span>
          </div>
          <span className="font-medium">{createdDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#6D7A87] w-full justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Закінчення</span>
          </div>

          <span className="font-medium">{endDate}</span>
        </div>
      </div>

      {/* User avatars */}
      <div className="flex items-center">
        {users.map((user, index) => (
          <div
            key={user.id}
            className={`relative ${index > 0 ? "-ml-2" : ""}`}
            style={{ zIndex: users.length + index }}>
            <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {user.initials ||
                      user.name
                        .split(" ")
                        .map(n => n[0])
                        .join("")}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
