"use client";

import React from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/shared/ui/button";

// Default size for this widget
export const defaultSize = { w: 2, h: 3 };

// Mock data for savings chart
const savingsData = [
  { month: "Jan", savings: 800 },
  { month: "Feb", savings: 950 },
  { month: "Mar", savings: 1250 },
  { month: "Apr", savings: 1100 },
  { month: "May", savings: 1400 },
];

export default function Widget12() {
  return (
    <div className="flex flex-col p-4 h-full w-full justify-between">
      {/* Header with total savings */}
      <div className="mb-6 text-center">
        <div className="text-3xl font-bold text-[#3A4754] mb-1">$1250</div>
        <div className="text-sm text-gray-500">Your total saving so far</div>
      </div>

      {/* Chart */}
      <div className="flex-1 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={savingsData}
            margin={{
              left: 5,
              right: 20,
              top: 10,
              bottom: 10,
            }}>
            <defs>
              <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="rgba(108, 91, 242, 0.8)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor="rgba(138, 228, 253, 0.1)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
              opacity={0.3}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickMargin={4}
              height={30}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickMargin={4}
              tickFormatter={(value: number) => `$${value / 1000}K`}
              domain={[0, 5000]}
              ticks={[1000, 3000, 5000]}
              width={30}
            />

            <Tooltip
              content={({ active, payload, label }: any) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-2 border border-gray-200 rounded shadow-lg">
                      <p className="text-sm font-medium text-[#3A4754]">
                        {label}: ${payload[0].value}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Area
              type="monotone"
              dataKey="savings"
              stroke="#6C5BE2"
              strokeWidth={2}
              fill="url(#savingsGradient)"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <Button className=" rounded-[48px] bg-[#1D242A] hover:bg-[#495969] text-white py-3 px-[75px]">
          Button
        </Button>
      </div>
    </div>
  );
}
