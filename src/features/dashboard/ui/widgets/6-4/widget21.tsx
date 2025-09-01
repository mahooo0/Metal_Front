"use client";

import React from "react";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

// Default size for this widget
export const defaultSize = { w: 6, h: 4 };

// Chart data for stacked bar chart
const chartData = [
  { month: "Jan", segment1: 120, segment2: 80, segment3: 60 },
  { month: "Feb", segment1: 140, segment2: 90, segment3: 70 },
  { month: "Mar", segment1: 110, segment2: 100, segment3: 50 },
  { month: "Apr", segment1: 130, segment2: 85, segment3: 75 },
  { month: "May", segment1: 150, segment2: 95, segment3: 65 },
  { month: "Jun", segment1: 125, segment2: 110, segment3: 55 },
  { month: "Jul", segment1: 135, segment2: 75, segment3: 85 },
  { month: "Aug", segment1: 145, segment2: 105, segment3: 45 },
  { month: "Sep", segment1: 115, segment2: 115, segment3: 70 },
  { month: "Oct", segment1: 155, segment2: 70, segment3: 80 },
  { month: "Nov", segment1: 105, segment2: 125, segment3: 60 },
  { month: "Dec", segment1: 140, segment2: 90, segment3: 90 },
];

export default function Widget21() {
  return (
    <div className="flex flex-col p-6 h-full w-full bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#3A4754]">Lorem ipsum</h2>
      </div>

      {/* KPI Cards */}
      <div className="flex gap-4 mb-3">
        {/* KPI Card 1 */}
        <div className="flex-1  rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full border border-[#8AE4FD] flex items-center justify-center">
              <div className="w-[9px] h-[9px] rounded-full bg-[#8AE4FD]"></div>
            </div>
            <span className="text-sm text-[#3A4754]">Lorem ipsum</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#3A4754]">40</span>
            <div className="flex items-center gap-1 ">
              <TrendingUp className="w-4 h-4 text-[#64C4AA]" />
              <span className="text-[10px] text-[#929BA5]">
                <span className="text-[#64C4AA] text-xs">3,0%</span> vs last
                month
              </span>
            </div>
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
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#3A4754]">40</span>
            <div className="flex items-center gap-1 ">
              <TrendingUp className="w-4 h-4 text-[#64C4AA]" />
              <span className="text-[10px] text-[#929BA5]">
                <span className="text-[#64C4AA] text-xs">3,0%</span> vs last
                month
              </span>
            </div>
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
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#3A4754]">40</span>
            <div className="flex items-center gap-1 ">
              <TrendingUp className="w-4 h-4 text-[#64C4AA]" />
              <span className="text-[10px] text-[#929BA5]">
                <span className="text-[#64C4AA] text-xs">3,0%</span> vs last
                month
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stacked Bar Chart */}
      <div className="flex-1  w-full">
        <ResponsiveContainer width={"100%"} height={200}>
          <BarChart data={chartData} width={600} height={200}>
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              tick={{ fill: "#6B7280" }}
            />
            <Bar
              dataKey="segment1"
              stackId="a"
              fill="#6C5BF2"
              radius={[8, 8, 8, 8]}
            />
            <Bar
              dataKey="segment2"
              stackId="a"
              fill="#1D96F9"
              radius={[8, 8, 8, 8]}
            />
            <Bar
              dataKey="segment3"
              stackId="a"
              fill="#8AE4FD"
              radius={[8, 8, 8, 8]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center gap-8 mt-4">
        <div className="flex flex-row items-center gap-1">
          <span className="text-xs text-gray-500 text-nowrap">Лист 1</span>
        </div>
        <div className="w-full h-[1px] rounded-full bg-gray-300"></div>

        <div className="flex flex-row items-center gap-1">
          <span className="text-xs text-gray-500 text-nowrap">Лист 15</span>
        </div>
        <div className="w-full h-[1px] rounded-full bg-gray-300"></div>

        <div className="flex flex-row items-center gap-1">
          <span className="text-xs text-gray-500 text-nowrap">Лист 30</span>
        </div>
      </div>
    </div>
  );
}
