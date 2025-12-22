"use client";

import React from "react";

import { useOrderRequestById } from "@/hooks/use-order-request-by-id";
import { useQueryState } from "nuqs";

import AccountMovement from "@/features/order/ui/account-movement";
import Conturaqent from "@/features/order/ui/conturaqent";
import HeaderNav from "@/features/order/ui/header-nav";
import MiscalculationInfo from "@/features/order/ui/miscalculation-info";
import OrderInfo from "@/features/order/ui/order-info";
import { ApplicationsSheet } from "@/features/order/ui/sheets/aplications";
import { ApplicationsAddSheet } from "@/features/order/ui/sheets/aplications-add";
import { CreateOrderSheet } from "@/features/order/ui/sheets/create-order";
import { OrdersSheet } from "@/features/order/ui/sheets/orders";
import { OrderDetailSheet } from "@/features/order/ui/sheets/orders-detail";

export default function OrderPageClient({ id }: { id: string }) {
  const [sheet] = useQueryState("sheet", {
    defaultValue: "",
  });

  const { orderRequest, isLoading, error } = useOrderRequestById(id);

  let activeTab: string = "Інформація"; // Значение по умолчанию

  if (sheet) {
    switch (sheet) {
      case "tasks":
        activeTab = "Задачі";
        break;
      case "applications":
        activeTab = "Заявки";
        break;
      default:
        activeTab = "Інформація";
        break;
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#6D7A87]">Завантаження...</p>
      </div>
    );
  }

  if (error || !orderRequest) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Помилка завантаження замовлення</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <HeaderNav orderId={id} activeTab={activeTab} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <OrderInfo orderRequest={orderRequest} />
        </div>
        <div className="col-span-4 flex flex-col gap-5">
          <Conturaqent counterparty={orderRequest.counterparty} />
          <AccountMovement />
          <MiscalculationInfo />
        </div>
      </div>
      <OrdersSheet />
      <OrderDetailSheet />
      <ApplicationsSheet />
      <ApplicationsAddSheet />
      <CreateOrderSheet />
    </div>
  );
}
