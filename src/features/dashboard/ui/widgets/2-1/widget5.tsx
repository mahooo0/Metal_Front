import React from "react";

// Default size for this widget
export const defaultSize = { w: 2, h: 1 };

export default function Widget5() {
  return (
    <div className="flex items-center px-6 py-4">
      {/* Icon Section */}
      <div className="flex-shrink-0 mr-4">
        <div className="w-10 h-10 bg-[#1D96F9] rounded-full flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.5 2.25C9.39 2.25 10.94 3.74 11.04 5.61L11.04 5.79C11.03 7.7 9.54 9.25 7.64 9.32H7.58C7.52 9.32 7.46 9.32 7.4 9.32C5.45 9.25 3.96 7.7 3.96 5.79C3.96 3.84 5.55 2.25 7.5 2.25Z"
              stroke="white"
              strokeWidth="0.83"
            />
            <path
              d="M7.51 11.21C8.98 11.21 10.42 11.58 11.5 12.3C12.47 12.94 12.94 13.78 12.95 14.63C12.95 15.44 12.53 16.22 11.68 16.85L11.5 16.98C10.42 17.7 8.97 18.08 7.5 18.08C6.03 18.08 4.58 17.7 3.5 16.98L3.5 16.98L3.32 16.85C2.47 16.23 2.05 15.45 2.05 14.65C2.05 13.8 2.53 12.96 3.51 12.3C4.59 11.58 6.04 11.21 7.51 11.21Z"
              stroke="white"
              strokeWidth="0.83"
            />
            <path
              d="M13.46 3.97C14.87 3.85 16.12 4.9 16.24 6.32C16.36 7.71 15.37 8.92 14.02 9.09H14.01C13.99 9.09 13.9 9.09 13.81 9.11C13.29 9.13 12.8 9 12.4 8.77C13.12 7.94 13.52 6.83 13.42 5.63V5.63L13.39 5.35C13.32 4.89 13.17 4.46 12.97 4.06C13.13 4.02 13.29 3.99 13.46 3.97V3.97Z"
              stroke="white"
              strokeWidth="0.83"
            />
            <path
              d="M13.04 11.01C14.47 10.92 15.98 11.32 16.98 12.12L16.98 12.12C17.67 12.68 17.97 13.33 17.91 13.95L17.91 13.95C17.86 14.59 17.45 15.18 16.68 15.61L16.68 15.61C16.16 15.89 15.54 16.07 14.89 16.16C15.16 15.72 15.33 15.24 15.38 14.73V14.72C15.48 13.52 14.9 12.4 13.84 11.55L13.83 11.55C13.58 11.35 13.32 11.17 13.04 11.01Z"
              stroke="white"
              strokeWidth="0.83"
            />
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 min-w-[120px]">
        <p className="text-sm text-[#929BA5] font-medium">All Spendings</p>
        <p className="text-2xl font-semibold text-[#3A4754]">$574.34</p>
      </div>

      {/* Chart Section */}
      <div className="flex-shrink-0">
        <svg
          width="62"
          height="32"
          viewBox="0 0 62 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.5 29.6184C1.5 29.6184 7.64585 31.4092 13.7916 29.6184C28.1144 25.4448 23.5 -1.08569 34.5 5.9143C47.6784 14.3006 58.1562 13.8531 60 1.91431"
            stroke="url(#paint0_linear_100_13774)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_100_13774"
              x1="-35.5"
              y1="37.9143"
              x2="48.0597"
              y2="-12.9517"
              gradientUnits="userSpaceOnUse">
              <stop stopColor="#1D96F9" />
              <stop offset="1" stopColor="#8AE4FD" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
