"use client";

import { memo } from "react";
import { ORDER_STATUSES, ORDER_STATUS_LABELS } from "../constants";

export default memo(function StatusIndicators() {
  const statuses = [
    { id: ORDER_STATUSES.NEW, color: "bg-blue-200", label: ORDER_STATUS_LABELS[ORDER_STATUSES.NEW] },
    { id: ORDER_STATUSES.CALCULATION, color: "bg-green-200", label: ORDER_STATUS_LABELS[ORDER_STATUSES.CALCULATION] },
    { id: ORDER_STATUSES.CLARIFY, color: "bg-pink-200", label: ORDER_STATUS_LABELS[ORDER_STATUSES.CLARIFY] },
    { id: ORDER_STATUSES.EXTRA, color: "bg-purple-200", label: ORDER_STATUS_LABELS[ORDER_STATUSES.EXTRA] },
    { id: ORDER_STATUSES.KP, color: "bg-blue-300", label: ORDER_STATUS_LABELS[ORDER_STATUSES.KP] },
  ];

  return (
    <div className="px-6 py-2 bg-gray-50 border-b border-gray-200">
      <div className="flex items-center gap-4">
        {statuses.map((status) => (
          <div key={status.id} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
            <span className="text-xs text-gray-600">{status.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
