"use client";

import React from "react";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

// Default size for this widget
export const defaultSize = { w: 2, h: 3 };

// Mock data for income chart - 12 bars representing different periods
const incomeData = [
  { period: "1", income: 320 },
  { period: "2", income: 280 },
  { period: "3", income: 240 },
  { period: "4", income: 260 },
  { period: "5", income: 380 },
  { period: "6", income: 420 },
  { period: "7", income: 480 }, // Tallest bar
  { period: "8", income: 450 },
  { period: "9", income: 470 }, // Second tallest
  { period: "10", income: 390 },
  { period: "11", income: 340 },
  { period: "12", income: 310 },
];

export default function Widget14() {
  return (
    <div className="flex flex-col p-4 h-full w-full justify-between bg-white rounded-lg">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[#3A4754]">Income Amounts</h3>
      </div>

      {/* Chart */}
      <div className="flex-1 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={incomeData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 10,
            }}>
            <Bar
              dataKey="income"
              fill="#3CD3FC"
              radius={[2, 2, 0, 0]}
              barSize={7}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Statistics */}
      <div className=" ">
        <div className="grid grid-cols-3 gap-4">
          {/* Target */}
          <div className="flex flex-col items-center">
            <div className="text-sm text-[#3A4754] mb-1 font-normal text-nowrap">
              Target
            </div>
            <div className="flex items-center gap-1">
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-green-500"></div>
              <span className="text-sm font-bold text-green-500">841</span>
            </div>
          </div>

          {/* Last week */}
          <div className="flex flex-col items-center">
            <div className="text-sm text-[#3A4754] mb-1 font-normal text-nowrap">
              Last week
            </div>
            <div className="flex items-center gap-1">
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-orange-500"></div>
              <span className="text-sm font-bold text-orange-500">234</span>
            </div>
          </div>

          {/* Last month */}
          <div className="flex flex-col items-center">
            <div className="text-sm text-[#3A4754] mb-1 font-normal text-nowrap">
              Last month
            </div>
            <div className="flex items-center gap-1">
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-green-500"></div>
              <span className="text-sm font-bold text-green-500">3278</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
