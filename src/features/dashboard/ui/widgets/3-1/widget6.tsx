import React from "react";

// Default size for this widget
export const defaultSize = { w: 2, h: 1 };

export default function Widget6() {
  return (
    <div className="bg-[#1D96F9] w-full h-full flex justify-center items-center">
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        {/* Content Section */}
        <div className="flex-1">
          <p className="text-sm text-white font-medium">All Spendings</p>
          <p className="text-2xl font-semibold text-white">$574.34</p>
        </div>

        {/* Chart Section */}
        <div className="flex-shrink-0">
          <svg
            width="92"
            height="44"
            viewBox="0 0 92 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.5 41.9143C2.5 41.9143 8.77975 -5.59106 24.5 16.4143C40.2203 38.4197 46.5 37.4089 52.5 20.4143C59.9168 -0.593197 87.258 17.4949 90 2.41431"
              stroke="url(#paint0_linear_100_13778)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_100_13778"
                x1="-1.00002"
                y1="46.9143"
                x2="71.0778"
                y2="-16.5001"
                gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
