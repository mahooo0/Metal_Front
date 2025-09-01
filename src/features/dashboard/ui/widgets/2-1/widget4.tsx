import React from "react";

// Default size for this widget
export const defaultSize = { w: 2, h: 1 };

export default function Widget4() {
  return (
    <div className="flex items-center gap-4 px-6 py-4">
      {/* Icon Section */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-[#F0F0F0] rounded-full flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.91576 6.12229H2.18944C3.24311 6.12229 4.10521 6.98439 4.10521 8.03806V17.6169C4.10521 18.6705 3.24311 19.5326 2.18944 19.5326H1.91576C0.862094 19.5326 0 18.6705 0 17.6169V8.03806C0 6.98439 0.862094 6.12229 1.91576 6.12229ZM9.57882 0.375C10.6325 0.375 11.4946 1.23709 11.4946 2.29076V17.6169C11.4946 18.6705 10.6325 19.5326 9.57882 19.5326C8.52515 19.5326 7.66306 18.6705 7.66306 17.6169V2.29076C7.66306 1.23709 8.52515 0.375 9.57882 0.375ZM17.2419 11.3222C18.2955 11.3222 19.1576 12.1843 19.1576 13.238V17.6169C19.1576 18.6705 18.2955 19.5326 17.2419 19.5326C16.1882 19.5326 15.3261 18.6705 15.3261 17.6169V13.238C15.3261 12.1843 16.1882 11.3222 17.2419 11.3222Z"
              fill="#1D96F9"
            />
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1">
        <p className="text-sm text-[#929BA5] font-medium">All Spendings</p>
        <p className="text-2xl font-semibold text-[#3A4754]">$574.34</p>
      </div>
    </div>
  );
}
