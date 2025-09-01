import React from "react";

// Default size for this widget
export const defaultSize = { w: 2, h: 1 };

export default function Widget2() {
  return (
    <div className="flex items-center justify-between gap-8 px-6 py-4">
      {/* Content Section */}
      <div className="flex-1">
        <p className="text-sm text-[#929BA5] font-medium">All Spendings</p>
        <p className="text-2xl font-semibold text-[#3A4754]">$574.34</p>
      </div>

      {/* Chart Section */}
      <div className="flex-shrink-0">
        <svg
          width="86"
          height="47"
          viewBox="0 0 86 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          {/* Chart Bars */}
          <rect
            y="46.3711"
            width="45.5705"
            height="5.33287"
            rx="2.66644"
            transform="rotate(-90 0 46.3711)"
            fill="#F0F0F0"
          />
          <rect
            y="46.3711"
            width="37.508"
            height="5.33288"
            rx="2.66644"
            transform="rotate(-90 0 46.3711)"
            fill="#1D96F9"
          />
          <rect
            x="16.1335"
            y="46.3711"
            width="45.5705"
            height="5.33287"
            rx="2.66644"
            transform="rotate(-90 16.1335 46.3711)"
            fill="#F0F0F0"
          />
          <rect
            x="16.1335"
            y="46.3711"
            width="23.4863"
            height="5.33287"
            rx="2.66643"
            transform="rotate(-90 16.1335 46.3711)"
            fill="#1D96F9"
          />
          <rect
            x="32.2668"
            y="46.3711"
            width="45.5705"
            height="5.33286"
            rx="2.66643"
            transform="rotate(-90 32.2668 46.3711)"
            fill="#F0F0F0"
          />
          <rect
            x="32.2668"
            y="46.3711"
            width="31.5488"
            height="5.33287"
            rx="2.66643"
            transform="rotate(-90 32.2668 46.3711)"
            fill="#1D96F9"
          />
          <rect
            x="48.4004"
            y="46.3711"
            width="45.5705"
            height="5.33287"
            rx="2.66644"
            transform="rotate(-90 48.4004 46.3711)"
            fill="#F0F0F0"
          />
          <rect
            x="48.4004"
            y="46.3711"
            width="23.4863"
            height="5.33287"
            rx="2.66643"
            transform="rotate(-90 48.4004 46.3711)"
            fill="#1D96F9"
          />
          <rect
            x="64.5337"
            y="46.3711"
            width="45.5705"
            height="5.33281"
            rx="2.66641"
            transform="rotate(-90 64.5337 46.3711)"
            fill="#F0F0F0"
          />
          <rect
            x="64.5337"
            y="46.3711"
            width="41.364"
            height="5.33287"
            rx="2.66643"
            transform="rotate(-90 64.5337 46.3711)"
            fill="#1D96F9"
          />
          <rect
            x="80.6672"
            y="46.3711"
            width="45.5705"
            height="5.33286"
            rx="2.66643"
            transform="rotate(-90 80.6672 46.3711)"
            fill="#F0F0F0"
          />
          <rect
            x="80.6672"
            y="46.3711"
            width="10.8668"
            height="5.33286"
            rx="2.66643"
            transform="rotate(-90 80.6672 46.3711)"
            fill="#1D96F9"
          />
        </svg>
      </div>
    </div>
  );
}
