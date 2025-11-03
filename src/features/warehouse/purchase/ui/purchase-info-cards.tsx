"use client";

import React from "react";

import { Building2, CheckCircle, DollarSign } from "lucide-react";

interface PurchaseInfoCardsProps {
  supplier?: string;
  totalAmount?: string;
  status?: string;
}

export default function PurchaseInfoCards({
  supplier = 'ТОВ "Сервіс+"',
  totalAmount = "$475 220 587",
  status = "На розгляді",
}: PurchaseInfoCardsProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "На розгляді":
        return "bg-[#D8F6FE] text-[#30B2D5]";
      case "У процесі":
        return "bg-[#D7F6EE] text-[#64C4AA]";
      case "Планування":
        return "bg-[#F8D1FC] text-[#CE70D8]";
      case "Прорахунок":
        return "bg-[#D3CEFB] text-[#6C5BF2]";
      case "Запуск":
        return "bg-[#BBDFFD] text-[#1D96F9]";
      default:
        return "bg-[#E5E5E5] text-[#6D7A87]";
    }
  };

  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      {/* Supplier Card */}
      <div className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#3A4754]" />
            <p className="text-[18px] font-semibold text-[#3A4754]">
              Постачальник
            </p>
          </div>
          <p className="text-[20px] text-[#3A4754]  font-bold">{supplier}</p>
        </div>
      </div>

      {/* Total Amount Card */}
      <div className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-[#3A4754]" />
            <p className="text-[18px] font-semibold text-[#3A4754]">
              Сума закупівлі
            </p>
          </div>
          <p className="text-[20px] text-[#3A4754]  font-bold">{totalAmount}</p>
        </div>
      </div>

      {/* Status Card */}
      <div className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-[#3A4754]" />
            <p className="text-[18px] font-semibold text-[#3A4754]">Status</p>
          </div>
          <div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-base font-medium ${getStatusStyles(status)}`}>
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
