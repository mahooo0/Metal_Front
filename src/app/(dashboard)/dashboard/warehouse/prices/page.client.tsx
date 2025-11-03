"use client";

import React from "react";

import { EllipsisIcon, PlusSquareIcon } from "lucide-react";

import {
  PriceBendTable,
  PriceCoefficientsTable,
  PricesNav,
} from "@/features/warehouse/prices";

import { Button } from "@/shared/ui/button";

export default function PricesPageClient() {
  return (
    <div className="w-full">
      <PricesNav activeTab="Прайс гнуття" />
      <div className="flex items-center justify-between gap-4 mb-5 w-full mt-5">
        <div className="flex items-center gap-4">
          <h1 className="text-[#3A4754] text-[32px] font-[700]">
            Прайс на ЧПУ гибку листового металу{" "}
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
        <PriceCoefficientsTable />
        <PriceBendTable />
      </section>
    </div>
  );
}
