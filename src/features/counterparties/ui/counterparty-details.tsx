"use client";

import React from "react";

import {
  Building,
  Clock,
  CreditCard,
  Ellipsis,
  FileText,
  Hash,
  MessageSquare,
  Receipt,
} from "lucide-react";

import { CounterpartyItem } from "@/features/counterparties/types/counterparty.types";

import { Button } from "@/shared/ui/button";

interface CounterpartyDetailsProps {
  counterparty?: CounterpartyItem;
  onEdit?: () => void;
}

export default function CounterpartyDetails({
  counterparty,
  onEdit,
}: CounterpartyDetailsProps) {
  if (!counterparty) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <p className="text-gray-500">Контрагент не знайдено</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] font-bold text-[#3A4754]">
          {counterparty.name}
        </h2>
        <div className="flex items-center gap-2">
          <p className="text-sm text-[#6D7A87] font-mono">
            {counterparty.id.substring(0, 8)}...
          </p>
          {onEdit && (
          <Button
            variant="ghost"
            size="icon"
              onClick={onEdit}
              className="bg-white w-[36px] h-[36px] rounded-full border border-[#B6BDC3] text-[#495969] hover:bg-gray-50">
            <Ellipsis size={20} />
          </Button>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4">
        {/* Comment */}
        {counterparty.comment && (
          <div className="flex items-start gap-3">
            <div className="flex flex-row items-center gap-2 min-w-[160px]">
              <MessageSquare className="w-5 h-5 text-[#6D7A87]" />
              <div className="text-sm text-[#6D7A87]">Коментар:</div>
            </div>
            <div className="text-base text-[#3A4754] leading-relaxed">
              {counterparty.comment}
            </div>
          </div>
        )}

        {/* Creation Date */}
        <div className="flex items-center gap-3">
          <div className="flex flex-row items-center gap-2 min-w-[160px]">
            <Clock className="w-5 h-5 text-[#6D7A87]" />
            <div className="text-sm text-[#6D7A87]">Створено</div>
          </div>
          <div className="text-base font-medium text-[#3A4754]">
            {formatDate(counterparty.createdAt)}
          </div>
        </div>

        {/* Legal Address */}
        <div className="flex items-start gap-3">
          <div className="flex flex-row items-center gap-2 min-w-[160px]">
            <Building className="w-5 h-5 text-[#6D7A87]" />
            <div className="text-sm text-[#6D7A87]">Юридична адреса</div>
          </div>
          <div className="text-base text-[#3A4754] leading-relaxed">
            {counterparty.legalAddress}
          </div>
        </div>

        {/* Actual Address */}
        <div className="flex items-start gap-3">
          <div className="flex flex-row items-center gap-2 min-w-[160px]">
            <Building className="w-5 h-5 text-[#6D7A87]" />
            <div className="text-sm text-[#6D7A87]">Фактична адреса:</div>
          </div>
          <div className="text-base text-[#3A4754] leading-relaxed">
            {counterparty.actualAddress}
          </div>
        </div>

        {/* Bank Details */}
        <div className="flex items-start gap-3">
          <div className="flex flex-row items-center gap-2 min-w-[160px]">
            <CreditCard className="w-5 h-5 text-[#6D7A87]" />
            <div className="text-sm text-[#6D7A87]">Банківські реквізити:</div>
          </div>
          <div className="text-base text-[#3A4754] leading-relaxed">
            {counterparty.bankDetails || (
              <span className="text-gray-400">Не вказано</span>
            )}
          </div>
        </div>

        {/* EDRPOU */}
        <div className="flex items-center gap-3">
          <div className="flex flex-row items-center gap-2 min-w-[160px]">
            <Hash className="w-5 h-5 text-[#6D7A87]" />
            <div className="text-sm text-[#6D7A87]">ЄДРПОУ:</div>
          </div>
          <div className="text-base font-medium text-[#3A4754]">
            {counterparty.edrpou || (
              <span className="text-gray-400">Не вказано</span>
            )}
          </div>
        </div>

        {/* IPN */}
        <div className="flex items-center gap-3">
          <div className="flex flex-row items-center gap-2 min-w-[160px]">
            <FileText className="w-5 h-5 text-[#6D7A87]" />
            <div className="text-sm text-[#6D7A87]">ІПН:</div>
          </div>
          <div className="text-base font-medium text-[#3A4754]">
            {counterparty.ipn || (
              <span className="text-gray-400">Не вказано</span>
            )}
          </div>
        </div>

        {/* VAT Certificate */}
        <div className="flex items-center gap-3">
          <div className="flex flex-row items-center gap-2 min-w-[160px]">
            <Receipt className="w-5 h-5 text-[#6D7A87]" />
            <div className="text-sm text-[#6D7A87]">Св-во ПДВ:</div>
          </div>
          <div className="text-base font-medium text-[#3A4754]">
            {counterparty.vatCertificate || (
              <span className="text-gray-400">Не вказано</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
