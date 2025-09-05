"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/button";

export default function HeaderNav({
  orderId,
  activeTab,
}: {
  orderId: string;
  activeTab: string;
}) {
  const router = useRouter();
  const navItems = [
    {
      label: "Інформація",
      onClick: () => {
        router.push(`/dashboard/order/${orderId}`);
      },
    },

    {
      label: "Задачі",
      onClick: () => {
        router.push(`/dashboard/order/${orderId}?sheet=tasks`);
      },
    },

    {
      label: "Заявки",
      onClick: () => {
        router.push(`/dashboard/order/${orderId}?sheet=applications`);
      },
    },
    {
      label: "Прорахунки",
      onClick: () => {
        router.push(`/dashboard/order/${orderId}/calculations`);
      },
    },
    {
      label: "Оплати",
      onClick: () => {
        router.push(`/dashboard/order/${orderId}/payments`);
      },
    },
    {
      label: "Реєстр планів",
      onClick: () => {
        router.push(`/dashboard/order/${orderId}/plan-register`);
      },
    },
    {
      label: "Матеріали",
      onClick: () => {
        router.push(`/dashboard/order/${orderId}/materials`);
      },
    },
    {
      label: "Виробництво",
      onClick: () => {
        router.push(`/dashboard/order/${orderId}/production`);
      },
    },
    {
      label: "Історія",
      onClick: () => {
        router.push(`/dashboard/order/${orderId}/history`);
      },
    },
  ];
  return (
    <div className="grid grid-cols-9 w-full bg-[#C8CDD2] rounded-[48px]  p-2 gap-2">
      {navItems.map(item => (
        <button
          onClick={item.onClick}
          key={item.label}
          className={cn(
            "bg-white rounded-[48px] p-2 flex items-center justify-center text-xs font-medium text-center min-h-[34px]",
            activeTab === item.label && "border border-[#1D96F9]"
          )}>
          <p>{item.label}</p>
        </button>
      ))}
    </div>
  );
}
