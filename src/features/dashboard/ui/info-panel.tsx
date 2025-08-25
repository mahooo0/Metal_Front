"use client";

import React from "react";

interface InfoPanelProps {
  currentBreakPoints: string;
  currentCols: string | number;
}

const InfoPanel: React.FC<InfoPanelProps> = ({
  currentBreakPoints,
  currentCols,
}) => {
  return (
    <div className="mb-4 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Grid Info</h3>
      <div className="space-y-1 text-sm">
        <p>
          <strong>Current Breakpoint:</strong> {currentBreakPoints || "Not set"}
        </p>
        <p>
          <strong>Current Columns:</strong> {currentCols || "Not set"}
        </p>
      </div>
    </div>
  );
};

export default InfoPanel;
