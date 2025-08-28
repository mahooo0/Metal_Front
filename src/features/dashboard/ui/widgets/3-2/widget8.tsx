import React, { useState } from "react";

import { TrendingDown, TrendingUp } from "lucide-react";

// Default size for this widget
export const defaultSize = { w: 3, h: 2 };

export default function Widget8() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  return (
    <div className="flex flex-col p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#3A4754]">
          Revenue Overview
        </h3>
        <div className="flex items-center gap-1 text-green-600">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">+12.5%</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <p className="text-sm text-[#929BA5] mb-2">Total Revenue</p>
        <p className="text-2xl font-bold text-[#3A4754] mb-6">$45,230.00</p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-[#929BA5] mb-2">
            <span>Target</span>
            <span>75%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
              style={{ width: "75%" }}></div>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2">
          {[
            { id: "week", label: "Week" },
            { id: "month", label: "Month" },
            { id: "year", label: "Year" },
          ].map(period => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedPeriod === period.id
                  ? "bg-[#1D96F9] text-white"
                  : "bg-gray-100 text-[#929BA5] hover:bg-gray-200"
              }`}>
              {period.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
