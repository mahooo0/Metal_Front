"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { cn } from "@/shared/lib";

export default function PricesNav({ activeTab }: { activeTab: string }) {
  const router = useRouter();

  const navItems = [
    {
      label: "Прайс гнуття",
      onClick: () => router.push("/dashboard/warehouse/prices"),
    },
    {
      label: "Прайс порізка",
      onClick: () => router.push("/dashboard/warehouse/prices/cutting"),
    },
  ];

  return (
    <div className="grid grid-cols-2 w-full bg-[#C8CDD2] rounded-[48px] p-1 gap-2">
      {navItems.map(item => (
        <button
          key={item.label}
          onClick={item.onClick}
          className={cn(
            "bg-white rounded-[48px] p-2 flex items-center justify-center text-xs font-medium text-center min-h-[42px] cursor-pointer",
            activeTab === item.label &&
              "border border-[#1D96F9] shadow-[0_0_0_3px_rgba(29,150,249,0.2)]"
          )}>
          <p>{item.label}</p>
        </button>
      ))}
    </div>
  );
}

