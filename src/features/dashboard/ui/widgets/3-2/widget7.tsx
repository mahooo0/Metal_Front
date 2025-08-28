import React, { useState } from "react";

import { MoreHorizontal } from "lucide-react";

// Default size for this widget
export const defaultSize = { w: 3, h: 2 };

export default function Widget7() {
  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <div className="flex flex-col p-6 h-full">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#3A4754]">Lorem ipsum</h3>
        <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
          <MoreHorizontal className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-1">
        <p className="text-sm text-[#929BA5] mb-2">Lorem ipsum</p>
        <p className="text-2xl font-bold text-[#3A4754] mb-6">26 000€</p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#8B5CF6] flex-1"></div>
            <div className="h-full bg-[#60A5FA] flex-1"></div>
            <div className="h-full bg-[#3B82F6] flex-1"></div>
          </div>
        </div>

        {/* Radio Buttons */}
        <div className="flex gap-4">
          {[0, 1, 2].map(index => (
            <label
              key={index}
              className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="option"
                checked={selectedOption === index}
                onChange={() => setSelectedOption(index)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedOption === index
                    ? index === 0
                      ? "bg-[#8B5CF6] border-[#8B5CF6]"
                      : index === 1
                        ? "bg-[#60A5FA] border-[#60A5FA]"
                        : "bg-[#3B82F6] border-[#3B82F6]"
                    : "border-gray-300"
                }`}>
                {selectedOption === index && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className="text-sm text-[#3A4754]">Lorem ipsum</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
