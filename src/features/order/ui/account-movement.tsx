"use client";

import { Ellipsis, TrendingUp } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

import { Button } from "@/shared/ui";

const chartData = [
  { day: "Пн", segment1: 25, segment2: 75 }, // Темно-синий снизу (75%), светло-синий сверху (25%)
  { day: "Вт", segment1: 40, segment2: 60 }, // Темно-синий снизу (60%), светло-синий сверху (40%)
  { day: "Ср", segment1: 75, segment2: 15 }, // Темно-синий снизу (15%), светло-синий сверху (75%)
  { day: "Чт", segment1: 10, segment2: 90 }, // Темно-синий снизу (90%), светло-синий сверху (10%)
  { day: "Пт", segment1: 55, segment2: 35 }, // Темно-синий снизу (35%), светло-синий сверху (55%)
  { day: "Сб", segment1: 45, segment2: 45 }, // Темно-синий снизу (45%), светло-синий сверху (45%)
  { day: "Нд", segment1: 40, segment2: 50 }, // Темно-синий снизу (50%), светло-синий сверху (40%)
];
export default function AccountMovement() {
  return (
    <div className="bg-white rounded-2xl py-5 px-6 h-full">
      {" "}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M29.3327 29.3333H2.66602C2.11935 29.3333 1.66602 28.88 1.66602 28.3333C1.66602 27.7867 2.11935 27.3333 2.66602 27.3333H29.3327C29.8793 27.3333 30.3327 27.7867 30.3327 28.3333C30.3327 28.88 29.8793 29.3333 29.3327 29.3333Z"
              fill="#3A4754"
            />
            <path
              d="M13 5.33334V29.3333H19V5.33334C19 3.86667 18.4 2.66667 16.6 2.66667H15.4C13.6 2.66667 13 3.86667 13 5.33334Z"
              fill="#3A4754"
            />
            <path
              d="M4 13.3333V29.3333H9.33333V13.3333C9.33333 11.8667 8.8 10.6667 7.2 10.6667H6.13333C4.53333 10.6667 4 11.8667 4 13.3333Z"
              fill="#3A4754"
            />
            <path
              d="M22.666 20V29.3333H27.9993V20C27.9993 18.5333 27.466 17.3333 25.866 17.3333H24.7993C23.1993 17.3333 22.666 18.5333 22.666 20Z"
              fill="#3A4754"
            />
          </svg>

          <p className="text-[20px] font-bold text-[#3A4754]">
            Рух по рахунках
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="bg-white w-[36px] h-[36px] rounded-full border border-[#B6BDC3] text-[#495969]">
          <Ellipsis size={20} />
        </Button>
      </div>
      <p className="text-base text-[#929BA5] mt-5">
        <span className="text-[#3A4754]">$7,560</span> списано та{" "}
        <span className="text-[#3A4754]">$5,420</span> зараховано за цей тиждень
      </p>
      <div className="flex gap-4 mb-3 mt-5">
        {/* KPI Card 1 */}
        <div className="flex-1  rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full border border-[#8AE4FD] flex items-center justify-center">
              <div className="w-[9px] h-[9px] rounded-full bg-[#8AE4FD]"></div>
            </div>
            <span className="text-sm text-[#3A4754]">Lorem ipsum</span>
          </div>
        </div>

        {/* KPI Card 2 */}
        <div className="flex-1  rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full border border-[#8AE4FD] flex items-center justify-center">
              <div className="w-[9px] h-[9px] rounded-full bg-[#8AE4FD]"></div>
            </div>
            <span className="text-sm text-[#3A4754]">Lorem ipsum</span>
          </div>
        </div>

        {/* KPI Card 3 */}
        <div className="flex-1 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full border border-[#8AE4FD] flex items-center justify-center">
              <div className="w-[9px] h-[9px] rounded-full bg-[#8AE4FD]"></div>
            </div>
            <span className="text-sm text-[#3A4754]">Lorem ipsum</span>
          </div>
        </div>
      </div>
      {/* Weekly Bar Chart */}
      <div className="flex-1 w-full mt-6">
        <div className="flex justify-between items-end h-fit px-4 ">
          {chartData.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Столбец */}
              <div className="w-12 h-[100px] bg-[#F6F6F6] rounded-lg p-1 gap-1 border border-gray-200 flex flex-col justify-end overflow-hidden">
                {/* Светло-синий сегмент сверху */}
                <div
                  className="w-full bg-[#8AE4FD] rounded-lg"
                  style={{ height: `${item.segment1}%` }}
                />
                {/* Темно-синий сегмент снизу */}
                <div
                  className="w-full bg-[#1D96F9] rounded-lg"
                  style={{ height: `${item.segment2}%` }}
                />
              </div>
              {/* Подпись дня */}
              <span className="text-sm font-medium text-[#3A4754] mt-2">
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
