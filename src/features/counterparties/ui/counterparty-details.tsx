"use client";

import React from "react";

import {
  Building,
  Clock,
  CreditCard,
  Ellipsis,
  FileText,
  Hash,
  Receipt,
} from "lucide-react";

import { Button } from "@/shared/ui/button";

interface CounterpartyDetailsProps {
  counterparty?: {
    id: number;
    name: string;
    creationDate: string;
    legalAddress: string;
    actualAddress: string;
    bankDetails: string;
    edrpou: string;
    ipn: string;
    vatCertificate: string;
    changedBy?: string;
  };
}

export default function CounterpartyDetails({
  counterparty = {
    id: 45776890690,
    name: "ТОВ 'Базис'",
    creationDate: "15/08/2017",
    legalAddress: "65045, Україна, м Одеса, вул. Велика Арнаутська, 76, офіс 2",
    actualAddress:
      "65045, Україна, м Одеса, вул. Велика Арнаутська, 76, офіс 2",
    bankDetails:
      'IBAN: UA393287040000026002054312944 в АТ КБ "ПРИВАТБАНК" (МФО 328704)',
    edrpou: "38935167",
    ipn: "389351615535",
    vatCertificate: "200149913",
    changedBy: "Лист. 11",
  },
}: CounterpartyDetailsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] font-bold text-[#3A4754]">
          {counterparty.name}
        </h2>
        <div className="flex items-center gap-2">
          <p className="text-sm text-[#6D7A87]">id {counterparty.id}</p>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white w-[36px] h-[36px] rounded-full border border-[#B6BDC3] text-[#495969]">
            <Ellipsis size={20} />
          </Button>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4">
        {/* Creation Date */}
        <div className="flex items-center gap-3">
          <div className="flex flex-row items-center gap-2 min-w-[160px]">
            <Clock className="w-5 h-5 text-[#6D7A87]" />
            <div className="text-sm text-[#6D7A87]">Створено</div>
          </div>
          <div className="text-base font-medium text-[#3A4754]">
            {counterparty.creationDate}
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
            {counterparty.bankDetails}
          </div>
        </div>

        {/* EDRPOU */}
        <div className="flex items-center gap-3">
          <div className="flex flex-row items-center gap-2 min-w-[160px]">
            <Hash className="w-5 h-5 text-[#6D7A87]" />
            <div className="text-sm text-[#6D7A87]">ЄДРПОУ:</div>
          </div>
          <div className="text-base font-medium text-[#3A4754]">
            {counterparty.edrpou}
          </div>
        </div>

        {/* IPN */}
        <div className="flex items-center gap-3">
          <div className="flex flex-row items-center gap-2 min-w-[160px]">
            <FileText className="w-5 h-5 text-[#6D7A87]" />
            <div className="text-sm text-[#6D7A87]">ІПН:</div>
          </div>
          <div className="text-base font-medium text-[#3A4754]">
            {counterparty.ipn}
          </div>
        </div>

        {/* VAT Certificate */}
        <div className="flex items-center gap-3">
          <div className="flex flex-row items-center gap-2 min-w-[160px]">
            <Receipt className="w-5 h-5 text-[#6D7A87]" />
            <div className="text-sm text-[#6D7A87]">Св-во ПДВ:</div>
          </div>
          <div className="text-base font-medium text-[#3A4754]">
            {counterparty.vatCertificate}
          </div>
        </div>
      </div>
    </div>
  );
}
