import React from "react";

// Default size for this widget
export const defaultSize = { w: 2, h: 1 };

export default function Widget3() {
  return (
    <div className="flex flex-col px-6 py-4 w-full">
      {/* Header */}
      <p className="text-sm text-[#929BA5] font-medium">All Spendings</p>

      {/* Value */}
      <p className="text-2xl font-semibold text-[#3A4754] mb-4">$22,880.50</p>

      {/* Progress Bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1 bg-[#F0F0F0] rounded-full h-2">
          <div
            className="bg-[#1D96F9] h-2 rounded-full transition-all duration-300"
            style={{ width: "67%" }}
          />
        </div>
        <span className="text-sm font-medium text-[#6D7A87]">67%</span>
      </div>
    </div>
  );
}
