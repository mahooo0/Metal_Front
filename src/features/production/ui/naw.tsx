import React from "react";

import { useRouter } from "next/navigation";

import { cn } from "@/shared/lib";

export default function ProductionNaw({ activeTab }: { activeTab: string }) {
  const router = useRouter();
  const navItems = [
    {
      label: "Нові задачі",
      onClick: () => {
        router.push("/dashboard/production/laser");
      },
    },
    {
      label: "Задачі в роботі",
      onClick: () => {
        router.push("/dashboard/production/laser/tasks");
      },
    },
    {
      label: "Всі задачі",
      onClick: () => {
        router.push("/dashboard/production/laser/all-tasks");
      },
    },
  ];
  return (
    <div className="grid grid-cols-3 w-full bg-[#C8CDD2] rounded-[48px]  p-1 gap-2">
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
