"use client";

import React from "react";

import { BarChart3, Grid3X3, PieChart, TrendingUp } from "lucide-react";

// Default size for this widget
export const defaultSize = { w: 2, h: 3 };

// Mock transaction data
const transactions = [
  {
    id: 1,
    icon: BarChart3,
    description: "Lorem ipsum",
    timestamp: "Today, 16:36",
    amount: "-$154.50",
  },
  {
    id: 2,
    icon: Grid3X3,
    description: "Lorem ipsum",
    timestamp: "Today, 16:36",
    amount: "-$154.50",
  },
  {
    id: 3,
    icon: PieChart,
    description: "Lorem ipsum",
    timestamp: "Today, 16:36",
    amount: "-$154.50",
  },
  {
    id: 4,
    icon: TrendingUp,
    description: "Lorem ipsum",
    timestamp: "Today, 16:36",
    amount: "-$154.50",
  },
];

export default function Widget15() {
  return (
    <div className="flex flex-col p-4 h-full w-full justify-between bg-white rounded-lg">
      {/* Credit Balance Section */}
      <div className="bg-[#1D96F9] rounded-lg p-4 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <div className="text-xs text-[#E9EDF7] ">Credit Balance</div>
            <div className="text-[32px] font-bold  text-white">$25,215</div>
          </div>
          <div className="flex items-center justify-center w-fit h-full my-auto">
            <svg
              width="61"
              height="20"
              viewBox="0 0 61 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 8.325C1.70238 11.925 4.5 18.625 11 18.125C17.5 17.625 18.2786 1.125 29.6571 1.125C41.0357 1.125 41.0357 20.1536 60 3.69643"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Recent Transactions Header */}
      <div className="mb-4">
        <h3 className="text-sm text-[#B6BDC3] font-medium">Recent</h3>
      </div>

      {/* Recent Transactions List */}
      <div className="flex-1 space-y-3">
        {transactions.map(transaction => {
          const IconComponent = transaction.icon;
          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between">
              {/* Icon */}
              <div className="w-10 h-10 bg-[#F6F6F6] rounded-full flex items-center justify-center mr-3">
                <IconComponent className="w-6 h-6 text-[#495969]" />
              </div>

              {/* Description and Timestamp */}
              <div className="flex-1">
                <div className="text-sm font-medium text-[#3A4754]">
                  {transaction.description}
                </div>
                <div className="text-xs text-[#6D7A87s]">
                  {transaction.timestamp}
                </div>
              </div>

              {/* Amount */}
              <div className="text-sm font-bold text-[#3A4754]">
                {transaction.amount}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
