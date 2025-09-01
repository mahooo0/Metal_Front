"use client";

import React from "react";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

// Default size for this widget
export const defaultSize = { w: 4, h: 2 };

// Chart data with specified colors
const chartData = [
  { name: "segment1", value: 50, fill: "#1D96F9" }, // Bright blue - largest segment
  { name: "segment2", value: 25, fill: "#63DCFD" }, // Light blue/cyan
  { name: "segment3", value: 15, fill: "#6C5BF2" }, // Purple
  { name: "segment4", value: 10, fill: "#F3F3F3" }, // Light grey
];

// Data points for left section
const dataPoints = [
  { color: "#1D96F9", label: "Lorem ipsum", percentage: "59%" },
  { color: "#63DCFD", label: "Lorem ipsum", percentage: "59%" },
  { color: "#6C5BF2", label: "Lorem ipsum", percentage: "59%" },
  { color: "#F3F3F3", label: "Lorem ipsum", percentage: "59%" },
];

export default function Widget16() {
  return (
    <div className="flex flex-col p-4 h-full w-full   justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-[#3A4754]">Lorem ipsum</h3>
        <div className="flex items-center gap-1 text-sm">
          <TrendingUp className="w-4 h-4 text-[#64C4AA]" />
          <span className="text-[#64C4AA] text-sm font-medium">3,0%</span>
          <span className="text-[#929BA5] text-xs">vs last month</span>
        </div>
      </div>

      {/* Main Content */}
      <div className=" grid grid-cols-12 gap-8">
        {/* Left Section - Data Points */}
        <div className="flex-1 grid grid-cols-2 gap-4 max-w-[310px] text-nowrap col-span-8 ">
          {dataPoints.map((point, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ border: `1px solid ${point.color}` }}>
                    <div
                      className="w-3 h-3 rounded-full "
                      style={{ backgroundColor: point.color }}></div>
                  </div>
                  <div className="text-sm text-[#3A4754] font-normal ">
                    {point.label}
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[20px] font-bold text-[#3A4754]">
                    {point.percentage}
                  </span>
                  <span className="text-xs text-[#6D7A87] line-clamp-1">
                    {point.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section - Donut Chart */}
        <div className="flex-1 flex items-center justify-center col-span-4  ">
          <div
            className="relative rounded-full w-fit h-fit"
            style={{ boxShadow: "0px 0px 14.73px 0px #4DA4E999" }}>
            <ResponsiveContainer width={142} height={142}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={47}
                  outerRadius={67}
                  paddingAngle={2}
                  dataKey="value"
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-[#3A4754]">53</div>
              <div className="text-[10px] text-gray-400 text-center leading-tight">
                <div>Активні</div>
                <div>замовлення</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
