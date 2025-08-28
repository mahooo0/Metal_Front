import React from "react";

// Default size for this widget
export const defaultSize = { w: 2, h: 1 };

export default function Widget1() {
  return (
    <div className="flex items-center gap-4 px-6 py-4">
      {/* Icon Section */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-[#3A4754] rounded-full flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white">
            <path
              d="M2 22H22"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.75 4V22H14.25V4C14.25 2.9 13.8 2 12.45 2H11.55C10.2 2 9.75 2.9 9.75 4Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 10V22H7V10C7 8.9 6.6 8 5.4 8H4.6C3.4 8 3 8.9 3 10Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 15V22H21V15C21 13.9 20.6 13 19.4 13H18.6C17.4 13 17 13.9 17 15Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1">
        <p className="text-sm text-[#929BA5] font-medium">All Spendings</p>
        <p className="text-2xl font-bold text-[#3A4754]">$574.34</p>
      </div>
    </div>
  );
}
