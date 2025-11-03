"use client";

import React from "react";

import { EllipsisIcon, PlusSquareIcon } from "lucide-react";

import { PriceCuttingTable, PricesNav } from "@/features/warehouse/prices";

import { Button } from "@/shared/ui/button";

export default function PricesCuttingPageClient() {
  return (
    <div className="w-full">
      <PricesNav activeTab="Прайс порізка" />
      <div className="flex items-center justify-between gap-4 mb-5 w-full mt-5">
        <div className="flex items-center gap-4">
          <h1 className="text-[#3A4754] text-[32px] font-[700]">
            Прайс-лист на лазерне різання листового металу{" "}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-[#6D7A87]">Створено Лист. 11</p>
          <Button variant={"balck"} size={"lg"}>
            <PlusSquareIcon className="w-5 h-5" />
            Створити новий
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white w-[36px] h-[36px] rounded-full border border-[#B6BDC3] text-[#495969]">
            <EllipsisIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <section className="w-full space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#E3F2FD] h-full rounded-xl p-4 flex items-center justify-between">
            <span className="text-[#3A4754] text-sm">
              Порізка зі захистною плівкою:{" "}
            </span>
            <span className="text-[#3A4754] text-lg font-semibold">1,3</span>
          </div>
        </div>
        <PriceCuttingTable />
      </section>
    </div>
  );
}
