import React, { useState } from "react";

import { MoreHorizontal } from "lucide-react";

// Default size for this widget
export const defaultSize = { w: 2, h: 2 };

export default function Widget7() {
  return (
    <div className="flex flex-col p-4 h-full w-full justify-between">
      {/* Header Section */}
      <div className="flex items-center justify-between w-full">
        <h3 className="text-[20px] font-bold text-[#3A4754]">Lorem ipsum</h3>
        <button className="w-8 h-8 rounded-full border border-[#B6BDC3] flex items-center justify-center transition-colors cursor-pointer text-[#495969] hover:text-white hover:bg-[#1D96F9]">
          <MoreHorizontal className="w-4 h-4 " />
        </button>
      </div>

      {/* Content Section */}
      <div className=" h-fit">
        <p className="text-sm text-[#3A4754] mb-2">Lorem ipsum</p>
        <p className="text-[28px] font-bold text-[#3A4754] mb-4 ">26 000€</p>

        <div className="mb-4">
          <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#8B5CF6] w-[20%]"></div>
            <div className="h-full bg-[#60A5FA] w-[30%]"></div>
            <div className="h-full bg-[#3B82F6] w-[50%]"></div>
          </div>
        </div>

        <div className="flex  justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 shrink-0 rounded-full border border-[#4AABFA] flex items-center justify-center">
              <div className="w-[9px] h-[9px] rounded-full bg-[#4AABFA]"></div>
            </div>
            <p className="text-[#495969] text-[12px] line-clamp-1">
              Lorem ipsum
            </p>
          </div>{" "}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 shrink-0 rounded-full border border-[#6C5BF2] flex items-center justify-center">
              <div className="w-[9px] h-[9px] rounded-full bg-[#6C5BF2]"></div>
            </div>
            <p className="text-[#495969] text-[12px] line-clamp-1">
              Lorem ipsum
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 shrink-0 rounded-full border border-[#3CD3FC] flex items-center justify-center">
              <div className="w-[9px] h-[9px] rounded-full bg-[#3CD3FC]"></div>
            </div>
            <p className="text-[#495969] text-[12px] line-clamp-1">
              Lorem ipsum
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
