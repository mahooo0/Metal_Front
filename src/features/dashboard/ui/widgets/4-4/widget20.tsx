"use client";

import React from "react";

// Default size for this widget
export const defaultSize = { w: 4, h: 4 };

// Color gradient for the matrix
const colors = [
  "#6C5BF2", // Deep purple
  "#897CF5", // Violet/magenta
  "#CE70D8", // Pink/light magenta
  "#1D96F9", // Medium blue
  "#3CD3FC", // Light blue
  "#8AE4FD", // Very light cyan
];

// Data matrix with percentages
const matrixData = [
  {
    month: "Jan",
    values: [100, 67.4, 56.8, 46.8, 35.6, 28.5, 19.5],
  },
  {
    month: "Feb",
    values: [100, 56.8, 46.8, 35.6, 28.5, 19.5],
  },
  {
    month: "Mar",
    values: [100, 46.8, 35.6, 28.5, 19.5],
  },
  {
    month: "Apr",
    values: [100, 35.6, 28.5, 19.5],
  },
  {
    month: "May",
    values: [100, 28.5, 19.5],
  },
  {
    month: "Jun",
    values: [100, 19.5],
  },
  {
    month: "Jul",
    values: [100],
  },
];

export default function Widget20() {
  const getColorForValue = (value: number) => {
    if (value === 100) return colors[0];
    if (value >= 67) return colors[1];
    if (value >= 56) return colors[2];
    if (value >= 46) return colors[3];
    if (value >= 35) return colors[4];
    return colors[5];
  };

  return (
    <div className="flex flex-col p-4 h-full w-full bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[#3A4754] mb-1">
          Lorem ipsum tincidunt
        </h3>
        <p className="text-sm text-gray-500">Jan 2025-Jul 2025</p>
      </div>

      {/* Matrix Grid */}
      <div className="flex-1 flex flex-col gap-2 mt-[36px]">
        {matrixData.map((row, rowIndex) => (
          <div key={row.month} className="flex items-center gap-2">
            {/* Month Label */}
            <div className="w-12 text-sm font-medium text-[#3A4754]">
              {row.month}
            </div>

            {/* Data Cells */}
            <div className="flex gap-1 flex-1 overflow-x-hidden">
              {row.values.map((value, cellIndex) => (
                <div
                  key={cellIndex}
                  className="flex-1 h-8 rounded-md flex items-center max-w-[72px] min-w-[72px] justify-center text-xs font-medium text-white"
                  style={{
                    backgroundColor: getColorForValue(value),
                  }}>
                  {value}%
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
