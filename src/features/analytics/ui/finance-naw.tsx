import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { cn } from "@/shared/lib";

export default function FinanceNaw({ activeTab }: { activeTab: string }) {
  const router = useRouter();
  const navItems = [
    {
      label: "Всі замовлення",
      onClick: () => {
        router.push("/dashboard/analytics");
      },
    },
    {
      label: "Лазер",
      onClick: () => {
        router.push("/dashboard/analytics/laser");
      },
    },
    {
      label: "Гідра",
      onClick: () => {
        router.push("/dashboard/analytics/hydraulic");
      },
    },
    {
      label: "Гнуття",
      onClick: () => {
        router.push("/dashboard/analytics/bending");
      },
    },
  ];
  return (
    <div className="grid grid-cols-4 w-full bg-[#C8CDD2] rounded-[48px]  p-1 gap-2">
      {navItems.map(item => (
        <button
          onClick={item.onClick}
          key={item.label}
          className={cn(
            "bg-white rounded-[48px] p-2 flex items-center justify-center text-xs font-medium text-center min-h-[34px] cursor-pointer",
            activeTab === item.label && "border border-[#1D96F9]"
          )}>
          <p>{item.label}</p>
        </button>
      ))}
    </div>
  );
}
