import React from "react";

import { cn } from "@/shared/lib/utils";

interface InfoBarProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  className?: string;
}

export function InfoBar({ icon, title, value, className }: InfoBarProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col gap-2 min-w-[200px]",
        className
      )}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
          {icon}
        </div>
        <span className="text-sm text-gray-600 font-medium">{title}</span>
      </div>
      <div className="text-xl font-semibold text-gray-800">{value}</div>
    </div>
  );
}
