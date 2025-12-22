"use client";

import React from "react";

import { PurchaseStatus } from "@/service/purchases.service";
import { Building2, CheckCircle, DollarSign, Send } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface PurchaseInfoCardsProps {
  supplier?: string;
  totalAmount?: number;
  status?: PurchaseStatus;
  purchaseId?: string;
  createdAt?: string;
  allItemsReady?: boolean;
  onStatusChange?: (status: PurchaseStatus) => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  isUpdatingStatus?: boolean;
}

const getStatusLabel = (status: PurchaseStatus) => {
  switch (status) {
    case "IN_PROCESS":
      return "У процесі";
    case "UNDER_REVIEW":
      return "На розгляді";
    case "PLANNING":
      return "Планування";
    case "CALCULATION":
      return "Прорахунок";
    case "LAUNCH":
      return "Запуск";
    case "RECEIVED":
      return "Отримано";
    default:
      return status;
  }
};

const getStatusStyles = (status: PurchaseStatus) => {
  switch (status) {
    case "IN_PROCESS":
      return "bg-[#D7F6EE] text-[#64C4AA]";
    case "UNDER_REVIEW":
      return "bg-[#D8F6FE] text-[#30B2D5]";
    case "PLANNING":
      return "bg-[#F8D1FC] text-[#CE70D8]";
    case "CALCULATION":
      return "bg-[#D3CEFB] text-[#6C5BF2]";
    case "LAUNCH":
      return "bg-[#BBDFFD] text-[#1D96F9]";
    case "RECEIVED":
      return "bg-[#D7F6EE] text-[#22C55E]";
    default:
      return "bg-[#E5E5E5] text-[#6D7A87]";
  }
};

export default function PurchaseInfoCards({
  supplier = "-",
  totalAmount = 0,
  status = "IN_PROCESS",
  allItemsReady = false,
  onStatusChange,
  onSubmit,
  isSubmitting = false,
  isUpdatingStatus = false,
}: PurchaseInfoCardsProps) {
  const isReceived = status === "RECEIVED";
  const canSubmit = allItemsReady && !isReceived;

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
          <p className="text-[20px] text-[#3A4754] font-bold">{supplier}</p>
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
          <p className="text-[20px] text-[#3A4754] font-bold">
            {totalAmount.toLocaleString("uk-UA")} грн
          </p>
        </div>
      </div>

      {/* Status Card */}
      <div className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-[#3A4754]" />
            <p className="text-[18px] font-semibold text-[#3A4754]">Статус</p>
          </div>
          <div className="flex items-center gap-3">
            {isReceived ? (
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-base font-medium ${getStatusStyles(status)}`}>
                {getStatusLabel(status)}
              </span>
            ) : (
              <Select
                value={status}
                onValueChange={value => onStatusChange?.(value as PurchaseStatus)}
                disabled={isUpdatingStatus}>
                <SelectTrigger className="w-fit h-auto border-0 bg-transparent p-0 focus:ring-0 shadow-none">
                  <SelectValue>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-base font-medium ${getStatusStyles(status)}`}>
                      {getStatusLabel(status)}
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IN_PROCESS">У процесі</SelectItem>
                  <SelectItem value="UNDER_REVIEW">На розгляді</SelectItem>
                  <SelectItem value="PLANNING">Планування</SelectItem>
                  <SelectItem value="CALCULATION">Прорахунок</SelectItem>
                  <SelectItem value="LAUNCH">Запуск</SelectItem>
                </SelectContent>
              </Select>
            )}

            {canSubmit && (
              <Button
                size="sm"
                onClick={onSubmit}
                disabled={isSubmitting}
                className="bg-[#22C55E] hover:bg-[#16A34A] text-white gap-2">
                <Send className="w-4 h-4" />
                {isSubmitting ? "Підтвердження..." : "Підтвердити"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
