import React from "react";

import { Activity, Users } from "lucide-react";

// Default size for this widget
export const defaultSize = { w: 3, h: 2 };

export default function Widget9() {
  return (
    <div className="flex flex-col p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#3A4754]">User Analytics</h3>
        <div className="w-8 h-8 bg-[#1D96F9] rounded-full flex items-center justify-center">
          <Users className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <p className="text-sm text-[#929BA5] mb-2">Active Users</p>
        <p className="text-2xl font-bold text-[#3A4754] mb-6">2,847</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-green-600" />
              <span className="text-xs text-[#929BA5]">Growth</span>
            </div>
            <p className="text-lg font-semibold text-[#3A4754]">+23.5%</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-[#929BA5]">New Users</span>
            </div>
            <p className="text-lg font-semibold text-[#3A4754]">156</p>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-[#929BA5] mb-1">
              <span>Engagement</span>
              <span>85%</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1D96F9] rounded-full"
                style={{ width: "85%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-[#929BA5] mb-1">
              <span>Retention</span>
              <span>72%</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: "72%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
