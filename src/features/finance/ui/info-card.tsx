import React from "react";

import { cn } from "@/shared/lib/utils";

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  className?: string;
}

export default function InfoCard({
  icon,
  title,
  value,
  className,
}: InfoCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-[16px] px-5 py-4 flex  gap-3 shadow-sm flex-col",
        className
      )}>
      {/* Icon */}
      <div className="flex items-center gap-2">
        <div className="w-[32px] h-[32px] bg-[#3A4754] rounded-lg flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <span className="text-[#3A4754] text-[18px] ">{title}</span>
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <span className="text-[#3A4754] text-[20px] font-bold">{value}</span>
      </div>
    </div>
  );
}
