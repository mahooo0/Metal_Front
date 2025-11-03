"use client";

import React from "react";

import {
  EllipsisIcon,
  PlusSquareIcon,
  SeparatorHorizontal,
} from "lucide-react";

import {
  PriceCuttingDetailTable,
  PricesNav,
} from "@/features/warehouse/prices";

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
        <div className="grid grid-cols-2 gap-4 bg-white rounded-xl p-6">
          {/* Левая колонка - Цена за минуту */}
          <div className="bg-[#E3F2FD] rounded-xl p-6 space-y-4">
            <h3 className="text-[#3A4754] text-base font-semibold mb-4">
              Ціна за 1 хвилину, залежно від якості, грн з ПДВ
            </h3>
            <SeparatorHorizontal className="my-6 h-[1px] bg-white w-full" />
            <div className=" mt-4 flex flex-col gap-4 ">
              <div className="flex items-center justify-between">
                <span className="text-[#3A4754] text-sm">
                  Компенсація конусності
                </span>
                <span className="text-[#3A4754] text-sm font-medium">
                  1,2 коеф на час + 1,2 коеф. на ціну
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#3A4754] text-sm">
                  Використання 3D голови
                </span>
                <span className="text-[#3A4754] text-sm font-medium">
                  1,5 коеф на час + 1,5 коеф. на ціну
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#3A4754] text-sm">
                  Використання свердлильного шпинделю
                </span>
                <span className="text-[#3A4754] text-sm font-medium">
                  1,5 коеф на час + 1,5 коеф. на ціну
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[#3A4754] text-sm">Більше 3м</span>
                <span className="text-[#3A4754] text-sm font-medium">
                  1,5 - коеф. на різку плана
                </span>
              </div>
            </div>
          </div>
          <div className="bg-[#E3F2FD] rounded-xl p-6 space-y-4">
            <h3 className="text-[#3A4754] text-base font-semibold mb-4">
              Ціна за 1 хвилину, залежно від якості, грн з ПДВ
            </h3>
            <SeparatorHorizontal className="my-6 h-[1px] bg-white w-full" />
            <div className=" mt-4 flex flex-col gap-4 ">
              <div className="flex items-center justify-between">
                <span className="text-[#3A4754] text-sm">
                  Компенсація конусності
                </span>
                <span className="text-[#3A4754] text-sm font-medium">
                  1,2 коеф на час + 1,2 коеф. на ціну
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#3A4754] text-sm">
                  Використання 3D голови
                </span>
                <span className="text-[#3A4754] text-sm font-medium">
                  1,5 коеф на час + 1,5 коеф. на ціну
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#3A4754] text-sm">
                  Використання свердлильного шпинделю
                </span>
                <span className="text-[#3A4754] text-sm font-medium">
                  1,5 коеф на час + 1,5 коеф. на ціну
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[#3A4754] text-sm">Більше 3м</span>
                <span className="text-[#3A4754] text-sm font-medium">
                  1,5 - коеф. на різку плана
                </span>
              </div>
            </div>
          </div>
        </div>
        <PriceCuttingDetailTable />
      </section>
    </div>
  );
}
